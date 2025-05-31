'use server';
import { auth, signIn, signOut } from '@/lib/auth';

export async function signInWithCredentials(formData: FormData) {
	try {
		await signIn('credentials', {
			email: formData.get('email') || '',
			password: formData.get('password') || '',
			redirectTo: '/',
		});
	} catch (error) {
		throw error;
	}
}
export const signInWithGitHub = async () => {
	await signIn('github', { redirectTo: '/' });
};
export const signOutWithForm = async () => {
	await signOut();
};
export const getSession = async () => {
	const session = await auth();
	return session;
};
