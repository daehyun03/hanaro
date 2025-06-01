'use client';

import Logo from '@/components/Logo';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function SearchPage() {
	const [search, setSearch] = useState('');
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('검색어:', search);
	};
	const onBackButtonClick = () => {
		window.history.back();
	};
	return (
		<div className="max-w-[800px] mx-auto">
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
					Search
				</button>
			</form>
		</div>
	);
}
