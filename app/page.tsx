'use client';

import Tags from '@/components/Tags';
import { useState } from 'react';
import Posts from '@/components/Posts';
import Link from 'next/link';

export default function Home() {
	const [checked, setChecked] = useState<string>('Home');
	return (
		<div className="pt-20 p-6 flex justify-between">
			<div className="flex-1 mr-8">
				<div className="flex items-center justify-between w-full">
					<div className="mb-4 text-3xl flex items-center justify-between font-bold">
						{checked}
					</div>
					<Link href="/search">search</Link>
				</div>
				<Posts selected={checked} />
			</div>
			<div className="w-30">
				<Tags checked={checked} setChecked={setChecked} />
			</div>
		</div>
	);
}
