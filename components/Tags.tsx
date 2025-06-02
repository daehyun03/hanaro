'use client';

import { useEffect, useState } from 'react';
import { Tag } from '@/types/type';

type TagsProps = {
	checked: string;
	setChecked: React.Dispatch<React.SetStateAction<string>>;
};

export default function Tags({ checked, setChecked }: TagsProps) {
	const [tags, setTags] = useState<Tag[]>([]);
	const fetchTags = async () => {
		const res = await fetch('/api/tags');
		const tag_data = await res.json();
		setTags(tag_data);
	};
	useEffect(() => {
		fetchTags();
	}, []);
	return (
		<div>
			<div className="pb-4">Tag</div>
			<div className="flex flex-wrap gap-2">
				{tags.map((tag) => (
					<button
						key={(tag.tag_id)}
						className={`px-3 py-1 text-sm rounded-full border ${
							checked === tag.name
								? 'bg-black text-white border-black'
								: 'bg-gray-100 text-gray-800 hover:bg-gray-200'
						}`}
						onClick={() => {
							if (checked === tag.name) {
								setChecked('Home');
							} else {
								setChecked(tag.name);
							}
						}}
					>
						{tag.name}({tag._count.post})
					</button>
				))}
			</div>
		</div>
	);
}
