import { prisma } from '@/app/utils/prismaClients';


export async function GET() {
	try {
		const posts = await prisma.post.findMany({
			select: {
				post_id: true,
				title: true,
				time: true,
				text: true,
				tag: {
					select: {
						name: true,
					},
				},
			},
			orderBy: {
				time: 'desc',
			},
		});

		return Response.json(posts);
	} catch (error) {
		console.error('[POST_GET_ERROR]', error);
		return new Response(
			JSON.stringify({ error: 'Failed to fetch posts' }),
			{
				status: 500,
			},
		);
	}
}
