'use client'

import Image from 'next/image';
import hanaLogo from '@/asset/img-hana-symbol.png';
import Link from 'next/link';

export default function Logo() {
	return(
		<Link href="/" className="flex">
			<Image height="32" alt="" src={hanaLogo} />
			<div className="font-bold pl-1 text-lg">Hana tech</div>
		</Link>
	)
}