import { prisma } from '@/app/utils/prismaClients';

export async function POST(request: Request) {
	const body = await request.json();
	const { title, text, tag } = body;

	if (!title || !text || !tag) {
		return new Response(
			JSON.stringify({ error: '모든 필드를 입력해주세요.' }),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	}

	try {
		await prisma.post.create({
			data: {
				title,
				text,
				tag: {
					connect: { tag_id: tag }
				},
				time: new Date(),
				modified_date: new Date(),
			},
		});
		return new Response(
			JSON.stringify({ message: '글이 성공적으로 작성되었습니다.' }),
			{
				status: 201,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	} catch (error) {
		console.error('Error saving post:', error);
		return new Response(
			JSON.stringify({ error: '글 작성 중 오류가 발생했습니다.' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	}
}

export async function DELETE(request: Request) {
	const url = new URL(request.url);
	const postId = url.searchParams.get('postId');

	if (!postId) {
		return new Response(
			JSON.stringify({ error: '게시글 ID가 필요합니다.' }),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	}
	try {
		await prisma.post.delete({
			where: { post_id: parseInt(postId, 10) },
		});
		return new Response(
			JSON.stringify({ message: '게시글이 성공적으로 삭제되었습니다.' }),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	} catch (error) {
		console.error('Error deleting post:', error);
		return new Response(
			JSON.stringify({ error: '게시글 삭제 중 오류가 발생했습니다.' }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			},
		);
	}
}
