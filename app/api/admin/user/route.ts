import { auth } from '@/lib/auth';
import { prisma } from '@/app/utils/prismaClients';

export async function GET () {
	const session = await auth();
	if (session?.user?.role !== 'admin') {
		return new Response('Unauthorized', { status: 401 });
	}
	const users = await prisma.user.findMany({
		select: {
			user_id: true,
			nickname: true,
			email: true,
			role: true,
		}
	})
	return new Response(JSON.stringify(users), {
		status: 200,
		headers: {
			'Content-Type': 'application/json',
		},
	});
}