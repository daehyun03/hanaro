'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AllPost } from '@/types/type';

export default function PostPage() {
	const params = useParams();
	const postId = params['post_id'];
	const [post, setPost] = useState<AllPost | null>(null);

	useEffect(() => {
		if (!postId) return;

		const fetchPost = async () => {
			const res = await fetch(`/api/post/${postId}`);
			if (res.ok) {
				const data = await res.json();
				setPost(data);
				console.log(data)
			}
		};

		fetchPost();
	}, [postId]);

	if (!post) return <div className="p-6 pt-20">Loading...</div>;
	return (
		<div className="pt-20 p-6 flex justify-between">
			<h1 className="text-3xl font-bold mb-4">{post.title}</h1>
			<p className="text-sm text-gray-500 mb-2">Tag: {post.tag.name}</p>
			<p className="text-sm text-gray-400 mb-6">작성일: {post.time}</p>
			<div className="text-lg whitespace-pre-wrap">{post.text}</div>
		</div>
	);
}
