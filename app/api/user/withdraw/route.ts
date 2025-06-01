import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/app/utils/prismaClients';

export async function DELETE() {
	const session = await auth();
	if (!session?.user?.email) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		await prisma.user.delete({
			where: { email: session.user.email },
		});
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error deleting user:", error);
		return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
	}
}