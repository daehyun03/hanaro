'use client';

import Link from 'next/link';
import { signOutWithForm } from '@/serverActions/auth';
import Logo from '@/components/Logo';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Header() {
	const { data: session } = useSession();
	const pathname = usePathname();

	const hideTabRoutes = ['/signup', '/signin', '/search'];
	const shouldHide = hideTabRoutes.includes(pathname);

	if (shouldHide) return <></>;

	const onBackButtonClick = () => {
		window.history.back();
	};

	return (
		<header className="fixed top-0 h-16 py-4 px-4 z-0 w-full max-w-[1024px] border-b border-gray-200">
			<nav className="flex justify-between items-center">
				<button onClick={onBackButtonClick}>back</button>
				<Logo></Logo>
				<div className="flex flex-raw gap-2 items-center">
					{session?.user ? (
						<div className="flex flex-raw gap-4 items-center">
							<Link href="/my" className="underline">{session.user.name}</Link>
							<form action={signOutWithForm}>
								<button type="submit" className="underline">
									로그아웃
								</button>
							</form>
						</div>
					) : (
						<div className="flex flex-raw gap-4 items-center">
							<Link href="/signin" className="underline">
								로그인
							</Link>
							<Link href="/signup" className="underline">
								회원가입
							</Link>
						</div>
					)}
				</div>
			</nav>
		</header>
	);
}
