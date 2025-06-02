'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function LikeButtons({ postId }: { postId: number;}) {
	const { data: session } = useSession();
	const [likeState, setLikeState] = useState<null | boolean>(null);
	const [likes, setLikes] = useState<number>(0);
	const [dislikes, setDislikes] = useState<number>(0);

	const handleVote = async (isLike: boolean) => {
		if (!session?.user) {
			alert('로그인해주세요');
			window.location.href = '/signin';
			return;
		}

		if (likeState === null && session?.user) {
			if (isLike) {
				setLikes(likes + 1);
			} else {
				setDislikes(dislikes + 1);
			}
		} else if (session?.user) {
			if (likeState === isLike) {
				if (isLike) {
					setLikes(likes - 1);
				} else {
					setDislikes(dislikes - 1);
				}
			} else {
				if (isLike) {
					setLikes(likes + 1);
					setDislikes(dislikes - 1);
				} else {
					setLikes(likes - 1);
					setDislikes(dislikes + 1);
				}
			}
		}
		setLikeState(isLike);

		const res = await fetch(`/api/like/${postId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ postId, isLike }),
		});

		if (!res.ok) {
			alert('오류가 발생했습니다');
		}
	};
	useEffect(() => {
		const fetchLikeState = async () => {
			if (!postId) return;

			const res = await fetch(`/api/like/${postId}`);
			if (res.ok) {
				const data = await res.json();
				setLikeState(data.likeState);
				setLikes(data.likes);
				setDislikes(data.dislikes);
			} else {
				console.error('Failed to fetch like state');
			}
		};

		fetchLikeState();
	}, []);

	return (
		<div className="flex gap-2 mt-2">
			<button
				onClick={() => handleVote(true)}
				className={`px-3 py-1 border rounded ${likeState === true ? 'bg-blue-200 text-white' : ''}`}
			>
				👍 좋아요 {likes}
			</button>
			<button
				onClick={() => handleVote(false)}
				className={`px-3 py-1 border rounded ${likeState === false ? 'bg-red-200 text-white' : ''}`}
			>
				👎 싫어요 {dislikes}
			</button>
		</div>
	);
}
