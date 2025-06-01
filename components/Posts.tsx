'use client'

import { useEffect, useState } from 'react';
import { ShowPost } from '@/types/type';
import PostCard from '@/components/PostCard';

type PostProps = {
	selected: string;
}

export default function Posts({selected}: PostProps) {
	const [posts, setPosts] = useState<ShowPost[]>([])
	const fetchPosts = async () => {
		const res = await fetch('/api/post');
		const posts = await res.json();
		setPosts(posts)
	};
	useEffect(() => {
		fetchPosts();
	}, [])
	if (!posts.length) {
		return <></>
	}
	return(
		<div className="flex flex-col gap-4">
			{posts.map((post) => {
				if (selected === 'Home') {
					return (
						<PostCard post={post} key={post.post_id} />
					)
				} else {
					if (selected === post.tag.name) {
						return (
							<PostCard post={post} key={post.post_id} />
						)
					}
				}
			})}
		</div>
	)
}