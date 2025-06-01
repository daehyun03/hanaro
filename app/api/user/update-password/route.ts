import { auth } from "@/lib/auth";
import { prisma } from "@/app/utils/prismaClients";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
	const session = await auth();
	if (!session?.user?.email) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	const { pw } = await req.json();
	await prisma.user.update({
		where: { email: session.user.email },
		data: { pw: pw },
	});

	return NextResponse.json({ success: true });
}
