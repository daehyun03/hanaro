'use client';

import Tags from '@/components/Tags';
import { useState } from 'react';
import Posts from '@/components/Posts';
import Link from 'next/link';
import SearchIcon from '@/asset/search';
import { useSession } from 'next-auth/react';
import Pen from '@/asset/pen';
import HotPost from '@/components/HotPost';

export default function Home() {
	const {data: session} = useSession();
	const [checked, setChecked] = useState<string>('Home');
	return (
		<div className="pt-20 p-6 flex justify-between">
			<div className="flex-1 mr-8 border-r-2 border-gray-200 pr-4">
				<div className="flex items-center justify-between w-full">
					<div className="mb-4 text-3xl flex items-center justify-between font-bold">
						{checked}
					</div>
					<div className="flex flex-row items-center gap-4">
						{session?.user?.role === 'admin' ? <Link href="/write"><Pen></Pen></Link> : <></>}
						<Link href="/search"><SearchIcon/></Link>
					</div>
				</div>
				<Posts selected={checked} />
			</div>
			<div className="w-40">
				<Tags checked={checked} setChecked={setChecked} />
				<HotPost/>
			</div>
		</div>
	);
}
