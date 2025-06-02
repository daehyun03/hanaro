'use client';

import { ShortPost } from '@/types/type';
import { useEffect, useState } from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function HotPost() {
	const [posts, setPosts] = useState<ShortPost[]>([]);
	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch('/api/post/hot');
			if (!res.ok) {
				throw new Error('Failed to fetch hot posts');
			}
			const data = await res.json();
			setPosts(data);
		};
		fetchPosts();
	}, []);
	return (
		<div>
			<div className="py-4">❤️ Top 3 Posts</div>
			{posts.map((post: ShortPost) => (
				<Link key={post.post_id} href={`/post/${post.post_id}`}>
					<Card className="mb-4 hover:shadow-lg transition-shadow duration-300">
						<CardHeader>
							<CardTitle>{post.title}</CardTitle>
							<CardDescription className="text-sm text-gray-500">
								{post.like_count} likes
							</CardDescription>
						</CardHeader>
						<CardFooter>
							<div className="text-xs px-3 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full border ">
								{post.tag.name}
							</div>
						</CardFooter>
					</Card>
				</Link>
			))}
		</div>
	);
}
