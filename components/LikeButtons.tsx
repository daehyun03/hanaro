'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function LikeButtons({ postId }: { postId: number }) {
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

		let newLikeState: boolean | null = isLike;

		if (likeState === isLike) {
			newLikeState = null;
			if (isLike) {
				setLikes(likes - 1);
			} else {
				setDislikes(dislikes - 1);
			}
		} else {
			if (isLike) {
				setLikes(likes + 1);
				if (likeState === false) setDislikes(dislikes - 1);
			} else {
				setDislikes(dislikes + 1);
				if (likeState === true) setLikes(likes - 1);
			}
		}

		setLikeState(newLikeState);

		const res = await fetch(`/api/like/${postId}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ postId, isLike: newLikeState }),
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
		<div className="flex items-center justify-center w-full mt-6">
			<div className="flex gap-2 mt-2">
				<button
					onClick={() => handleVote(true)}
					className={`px-3 py-1 border rounded ${likeState === true ? 'bg-blue-200' : ''}`}
				>
					👍 Like {likes}
				</button>
				<button
					onClick={() => handleVote(false)}
					className={`px-3 py-1 border rounded ${likeState === false ? 'bg-red-200' : ''}`}
				>
					👎 DisLike {dislikes}
				</button>
			</div>
		</div>
	);
}
