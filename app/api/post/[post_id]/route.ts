import { prisma } from '@/app/utils/prismaClients';
import { NextRequest } from 'next/server';

type Context = {
	params: Promise<{ post_id: string }>;
};

export async function GET(req: NextRequest, { params }: Context) {
	const { post_id } = await params;

	const post = await prisma.post.findFirst({
		where: {
			post_id: parseInt(post_id),
		},
		include: {
			tag: true,
		},
	});

	if (!post) {
		return new Response(JSON.stringify({ error: 'Post not found' }), {
			status: 404,
		});
	}

	return Response.json(post);
}
