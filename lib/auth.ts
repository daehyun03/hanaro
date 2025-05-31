import NextAuth from 'next-auth';
import GitHub from '@auth/core/providers/github';
import Credentials from '@auth/core/providers/credentials';
import { prisma } from '@/app/utils/prismaClients';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		GitHub,
		Credentials({
			authorize: async (credentials) => {
				const { email, password } = credentials;
				if (!email || !password) {
					return null
				}

				const userInDB = await prisma.user.findFirst({
					where: {email: email as string},
				});
				if (!userInDB){
					return null
				}
				if (userInDB.pw !== password){
					return null
				}
				return {
					id: String(userInDB.user_id),
					email: email as string,
					name: userInDB.nickname,
					auth: userInDB.auth
				}
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
								nickname: profile.login as string ?? 'github_user',
								pw: '', // 소셜 로그인이라 pw는 공백으로 둠
								auth: 0,
							},
						});
					}
				}
			}
			return true;
		},
		jwt: async ({ token, user }) => {
			if (user) {
				token.user = user;
			}
			return token;
		},
		session({ session, token }) {
			console.log('session', session);
			console.log('token', token);
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
