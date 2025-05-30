import NextAuth from "next-auth"
import GitHub from '@auth/core/providers/github';
import Credentials from '@auth/core/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [
		GitHub,
		Credentials({
			authorize: async credentials => {
				const { nickname, email, password } = credentials
				let user = { id: '', name: '', email: ''}

				// 사용자 이름이 있는 경우, 회원가입!
				if (nickname) {
					// <회원가입 로직 ...>
					return user
				}

				// <로그인 로직 ...>
				return user
			}
		}),
	],
	pages: {
		signIn: '/signin',
	},
	session: { strategy: 'jwt' },
	secret: process.env.AUTH_SECRET as string,
	callbacks: {
		session({ session, token }) {
			console.log(token);
			console.log(session);
			return session;
		},
		jwt: async ({session, token}) => {
			return token;
		},
		signIn: async () => {
			return true;
		},
		redirect: async ({url, baseUrl}) => {
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			if (url) {
				const {search, origin} = new URL(url);
				const callbackUrl = new URLSearchParams(search).get('callbackUrl');
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
		}
	},
});