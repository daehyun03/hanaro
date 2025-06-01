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

	try {
		const posts = await prisma.$queryRawUnsafe(`
      SELECT p.post_id, p.title, p.time, t.name AS tagName
      FROM post p
      JOIN tag t ON p.tag_id = t.tag_id
      WHERE MATCH(p.title, p.text) AGAINST (${prisma.escape(q)} IN NATURAL LANGUAGE MODE)
      ORDER BY p.time DESC
    `);

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