'use server'
import { auth, signIn, signOut } from '@/app/lib/auth'

export const signInWithCredentials = async (formData: FormData) => {
	await signIn('credentials', {
		nickname: formData.get('nickname') || '',
		email: formData.get('email') || '',
		password: formData.get('password') || '',
		redirectTo: '/signin'
	})
}
export const signInWithGitHub = async () => {
	await signIn('github', { /* 옵션 */ })
	// ...
}
export const signOutWithForm = async (formData: FormData) => {
	await signOut()
}
export const getSession = async () => {
	const session = await auth()
	return session
}