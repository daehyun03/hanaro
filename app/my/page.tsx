'use client';

import MyInfo from '@/components/MyInfo';
import { useSession } from 'next-auth/react';
import Admin from '@/components/Admin';

export default function MyPage() {
	const { data: session } = useSession();
	if (session?.user?.role === 'admin'){
		return (
			<div className="mt-16">
				<h1 className="text-2xl font-bold py-4">Admin Dashboard</h1>
				<Admin />
			</div>
		)
	}
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<MyInfo />
			</div>
		</div>
	);
}
