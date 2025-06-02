import { prisma } from '@/app/utils/prismaClients';

export async function GET() {
	const topLikes = await prisma.post_like.groupBy({
		by: ['post_id'],
		where: {
			is_like: true,
		},
		_count: {
			post_id: true,
		},
		orderBy: {
			_count: {
				post_id: 'desc',
			},
		},
		take: 3,
	});

	const postIds = topLikes.map((item) => item.post_id);

	const posts = await prisma.post.findMany({
		where: {
			post_id: { in: postIds },
		},
		select: {
			post_id: true,
			title: true,
			tag: {
				select: {
					name: true,
				},
			},
		},
	});
	const postsWithLikes = posts.map((post) => {
		const likeObj = topLikes.find((like) => like.post_id === post.post_id);
		return {
			...post,
			like_count: likeObj ? likeObj._count.post_id : 0,
		};
	});
	postsWithLikes.sort((a, b) => b.like_count - a.like_count);

	return Response.json(postsWithLikes);
}
