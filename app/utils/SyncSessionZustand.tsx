'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSessionStore } from '@/app/store';

export default function SyncSessionToZustand({ children }: { children: React.ReactNode }) {
	const { data: session } = useSession();
	const setUser = useSessionStore((state) => state.setUser);
	const clearUser = useSessionStore((state) => state.clearUser);

	useEffect(() => {
		if (session?.user) {
			setUser({ name: session.user.name!, email: session.user.email! });
		} else {
			clearUser(); // 세션이 없으면 상태 초기화
		}
	}, [session]);

	return <>{children}</>;
}
