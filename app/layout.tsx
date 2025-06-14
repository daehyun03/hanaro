import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';
import SyncSessionToZustand from '@/app/utils/SyncSessionZustand';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Hana Tech Blog',
	description:
		'A blog about technology, programming, and software development.',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang="ko">
			<body
				className={`${geistSans.variable} ${geistMono.variable} max-w-[1024px] mx-auto h-screen`}
			>
				<SessionProvider session={session}>
					<SyncSessionToZustand>
						<Header />
						{children}
					</SyncSessionToZustand>
				</SessionProvider>
			</body>
		</html>
	);
}
