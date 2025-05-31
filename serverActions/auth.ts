'use server';
import { auth, signIn, signOut } from '@/lib/auth';

export async function signInWithCredentials(formData: FormData) {
	await signIn('credentials', {
		email: formData.get('email') || '',
		password: formData.get('password') || '',
		redirect: false,
	});
}
export const signInWithGitHub = async () => {
	await signIn('github', { redirectTo: '/' });
};
export const signOutWithForm = async () => {
	await signOut();
};
export const getSession = async () => {
	return await auth();
};
