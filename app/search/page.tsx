'use client';

import Logo from '@/components/Logo';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { ShowPost } from '@/types/type';
import PostCard from '@/components/PostCard';
import SearchIcon from '@/asset/search';

export default function SearchPage() {
	const [search, setSearch] = useState('');
	const [posts, setPosts] = useState<ShowPost[]>([]);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const res = await fetch(`/api/search?q=${search}`);
		const posts = await res.json();
		setPosts(posts);
	};
	const onBackButtonClick = () => {
		window.history.back();
	};
	return (
		<div className="max-w-[800px] mx-auto p-4">
			<div className="flex justify-between items-center mb-6 mt-4">
				<div></div>
				<Logo></Logo>
				<button
					className="text-gray-400 text-2xl"
					onClick={onBackButtonClick}
				>
					×
				</button>
			</div>
			<form onSubmit={handleSubmit} className="flex gap-2 items-center">
				<Input
					type="text"
					placeholder="제목 + 내용 검색"
					value={search}
					className="mr-4 flex-1"
					onChange={(e) => setSearch(e.target.value)}
				/>
				<button
					type="submit"
					className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
				>
					<SearchIcon/>
				</button>
			</form>
			<div>
				{posts.length > 0 ? (
					<div className="mt-4 flex flex-col gap-4">
						{posts.map((post) => (
							<PostCard key={post.post_id} post={post}/>
						))}
					</div>
				) : (
					<p className="mt-4 text-gray-500">검색 결과가 없습니다.</p>
				)}
			</div>
		</div>
	);
}
