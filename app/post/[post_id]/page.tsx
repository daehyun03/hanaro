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
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Pen from '@/asset/pen';
import Del from '@/asset/del';
import LikeButtons from '@/components/LikeButtons';

export default function PostPage() {
	const params = useParams();
	const postId = params['post_id'];
	const [post, setPost] = useState<AllPost | null>(null);
	const { data: session } = useSession();

	useEffect(() => {
		if (!postId) return;

		const fetchPost = async () => {
			const res = await fetch(`/api/post/${postId}`);
			if (res.ok) {
				const data = await res.json();
				setPost(data);
			}
		};
		fetchPost();
	}, [postId]);
	const delPost = async () => {
		if (!postId) return;
		if (confirm('정말로 삭제 하시겠습니까?')) {
			const res = await fetch(`/api/admin/write?postId=${postId}`, {
				method: 'DELETE',
			});
			if (res.ok) {
				alert('게시글이 삭제되었습니다.');
				window.location.href = '/';
			}
		}
	};
	if (!post) return <div className="p-6 pt-20">Loading...</div>;
	return (
		<div className="pt-20 p-6 flex justify-between">
			<Card className="flex-1">
				<CardHeader>
					<div className="flex justify-between">
						<div className="text-2xl font-bold">{post.title}</div>
						{session?.user?.role === 'admin' ? (
							<div className="flex gap-2">
								<Link href={`/write?postId=${post.post_id}`}>
									<Pen />
								</Link>
								<div
									className="cursor-pointer"
									onClick={() => delPost()}
								>
									<Del />
								</div>
							</div>
						) : (
							<></>
						)}
					</div>
					<CardDescription>
						# {post.tag.name}
						<div className="text-right">작성일: {printDate(post.time)}</div>
						{post.modified_date !== post.time ? (
							<div className="text-right">수정일: {printDate(post.modified_date)}</div>
						) : (
							<></>
						)}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="whitespace-pre-wrap">{post.text}</p>
					<LikeButtons postId={Number(postId)} />
				</CardContent>
			</Card>
		</div>
	);
}
