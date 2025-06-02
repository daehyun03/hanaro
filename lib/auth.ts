import NextAuth from 'next-auth';
import GitHub from '@auth/core/providers/github';
import Credentials from '@auth/core/providers/credentials';
import { prisma } from '@/app/utils/prismaClients';

declare module 'next-auth' {
	interface User {
		role: string;
	}
	interface Session {
		role: string;
	}
}
declare module '@auth/core/jwt' {
	interface JWT {
		role: string;
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		GitHub({
			profile(profile) {
				return {
					id: String(profile.id),
					email: profile.email ?? '',
					name: profile.login ?? '',
					image: profile.avatar_url ?? '',
					role: 'user',
				};
			},
		}),
		Credentials({
			authorize: async (credentials) => {
				const { email, password } = credentials;
				if (!email || !password) {
					return null;
				}

				const userInDB = await prisma.user.findFirst({
					where: { email: email as string },
				});
				if (!userInDB) {
					return null;
				}
				if (userInDB.pw !== password) {
					return null;
				}
				return {
					id: String(userInDB.user_id),
					email: email as string,
					emailVerified: null,
					name: userInDB.nickname,
					role: userInDB.role,
				};
			},
		}),
	],
	pages: {
		signIn: '/signin',
	},
	session: { strategy: 'jwt' },
	secret: process.env.AUTH_SECRET as string,
	callbacks: {
		signIn: async ({ account, profile }) => {
			if (account?.provider === 'github') {
				if (profile?.id) {
					const email = profile.email!;
					const existingUser = await prisma.user.findFirst({
						where: { email },
					});
					if (!existingUser) {
						await prisma.user.create({
							data: {
								email,
								nickname:
									(profile.login as string) ?? 'github_user',
								pw: '', // 소셜 로그인이라 pw는 공백으로 둠
								role: 'user',
							},
						});
					}
				}
			}
			return true;
		},
		jwt: async ({ token, user }) => {
			if (user) {
				token.role = user.role;
			}
			return token;
		},
		session({ session, token }) {
			session.user.role = token.role;
			return session;
		},
		redirect: async ({ url, baseUrl }) => {
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			if (url) {
				const { search, origin } = new URL(url);
				const callbackUrl = new URLSearchParams(search).get(
					'callbackUrl',
				);
				if (callbackUrl) {
					return callbackUrl.startsWith('/')
						? `${baseUrl}${callbackUrl}`
						: callbackUrl;
				}
				if (origin === baseUrl) {
					return url;
				}
			}
			return baseUrl;
		},
	},
});
