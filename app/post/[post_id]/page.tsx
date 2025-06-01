'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AllPost } from '@/types/type';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from '@/components/ui/card';
import { printDate } from '@/app/utils/printDate';

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
				console.log(data);
			}
		};

		fetchPost();
	}, [postId]);

	if (!post) return <div className="p-6 pt-20">Loading...</div>;
	return (
		<div className="pt-20 p-6 flex justify-between">
			<Card className="flex-1">
				<CardHeader>
					<div className="text-2xl font-bold">{post.title}</div>
					<CardDescription>
							# {post.tag.name}
						<div>작성일: {printDate(post.time)}</div>
						{printDate(post.modified_date) !==
						'1970년 01월 01일' ? (
							<div>수정일: {printDate(post.modified_date)}</div>
						) : (
							<></>
						)}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>{post.text}</p>
				</CardContent>
			</Card>
		</div>
	);
}
