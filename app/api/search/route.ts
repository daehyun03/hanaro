import { prisma } from '@/app/utils/prismaClients';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const q = searchParams.get('q');

	if (!q || q.trim() === '') {
		return new Response(JSON.stringify({ error: '검색어가 없습니다.' }), {
			status: 400,
		});
	}
	console.log(q)
	try {
		const posts = await prisma.post.findMany({
			where: {
				OR: [{ title: { search: String(q) } }, { text: { search: String(q) } }],
			},
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

		return new Response(JSON.stringify(posts), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('[FULLTEXT_SEARCH_ERROR]', error);
		return new Response(JSON.stringify({ error: '검색 중 오류 발생' }), {
			status: 500,
		});
	}
}
