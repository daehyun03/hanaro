import { prisma } from '@/app/utils/prismaClients';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function GET() {
	const tags = await prisma.tag.findMany({
		select: {
			tag_id: true,
			name: true,
			_count: {
				select: {
					post: true,
				},
			},
		},
		orderBy: {
			name: 'asc',
		},
	});
	return NextResponse.json(tags);
}

export async function POST(req: NextRequest) {
	const session = await auth();
	if (session?.user?.role !== 'admin') {
		return new Response('Unauthorized', { status: 401 });
	}
	try {
		const body = await req.json();
		const { name } = body;

		const existing = await prisma.tag.findFirst({ where: { name } });
		if (existing) {
			return NextResponse.json({ error: '이미 존재하는 태그입니다.' }, { status: 409 });
		}
		const newTag = await prisma.tag.create({
			data: { name },
		});

		return NextResponse.json({ success: true, tag: newTag }, { status: 201 });
	} catch (error) {
		console.error('[TAG_CREATE_ERROR]', error);
		return NextResponse.json({ error: '서버 오류로 태그 추가에 실패했습니다.' }, { status: 500 });
	}
}