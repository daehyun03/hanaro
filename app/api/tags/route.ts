import { prisma } from '@/app/utils/prismaClients';
import { NextResponse } from 'next/server';

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