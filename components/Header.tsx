import Link from 'next/link'
import { getSession, signOutWithForm } from '@/serverActions/auth';

export default async function Header() {
	const session = await getSession();
	return (
		<header>
			{session?.user && <div>{session.user.name}</div>}
			<nav style={{ display: 'flex', gap: '10px' }}>
				<Link href="/">메인</Link>
				{session?.user ? (
					<>
						<form action={signOutWithForm}>
							<button type="submit">로그아웃</button>
						</form>
					</>
				) : (
					<>
						<Link href="/signin">로그인</Link>
						<Link href="/signup">회원가입</Link>
					</>
				)}
			</nav>
		</header>
	)
}