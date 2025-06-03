import { prisma } from '@/app/utils/prismaClients';
import { auth } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

type Context = {
	params: Promise<{ post_id: string }>;
};

export async function GET(req: NextRequest, { params }: Context) {
	const { post_id } = await params;
	const session = await auth();
	try {
		let myLikes = null;
		if (session?.user?.name) {
			myLikes = await prisma.post_like.findFirst({
				where: {
					post_id: parseInt(post_id),
					user: {
						nickname: session.user.name,
					},
				},
				select: {
					post_id: true,
					is_like: true,
				},
			});
		}
		const likes = await prisma.post_like.count({
			where: { post_id: parseInt(post_id), is_like: true },
		});

		const dislikes = await prisma.post_like.count({
			where: { post_id: parseInt(post_id), is_like: false },
		});
		return NextResponse.json({
			likeState: myLikes ? myLikes.is_like : null,
			likes,
			dislikes,
		});
	} catch (e) {
		return NextResponse.json(
			{ error: 'Failed to fetch likes' },
			{ status: 500 },
		);
	}
}

export async function POST(req: Request) {
	const session = await auth();
	if (!session?.user?.name) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userId = await prisma.user.findFirst({
		where: { nickname: session.user.name },
		select: { user_id: true },
	});
	if (!userId) {
		return NextResponse.json({ error: 'User not found' }, { status: 404 });
	}

	const { postId, isLike } = await req.json();

	try {
		const existing = await prisma.post_like.findFirst({
			where: {
				AND: [{ user_id: userId.user_id }, { post_id: postId }],
			},
			select: {
				like_id: true,
			},
		});

		if (existing) {
			if (isLike === null) {
				await prisma.post_like.delete({
					where: {
						like_id: existing.like_id,
					},
				});
			} else {
				await prisma.post_like.update({
					where: {
						like_id: existing.like_id,
					},
					data: { is_like: Boolean(isLike) },
				});
			}
		} else {
			if (isLike !== null) {
				await prisma.post_like.create({
					data: {
						post_id: postId,
						user_id: userId.user_id,
						is_like: Boolean(isLike),
					},
				});
			}
		}

		return NextResponse.json({ success: true });
	} catch (e) {
		return NextResponse.json(
			{ error: 'Failed to update like' },
			{ status: 500 }
		);
	}
}
