import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/utils/prismaClients';

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { email, password, nickname } = body;
		console.log(body);
		if (!email || !password || !nickname) {
			return NextResponse.json(
				{ message: 'Missing required fields.' },
				{ status: 400 },
			);
		}

		const existingUser = await prisma.user.findFirst({ where: { email } });

		if (existingUser) {
			return NextResponse.json(
				{ message: 'Email already in use.' },
				{ status: 409 },
			);
		}

		const newUser = await prisma.user.create({
			data: { email: email, pw: password, nickname: nickname, auth: 0 },
		});

		return NextResponse.json(
			{ message: 'User created.', user: newUser },
			{ status: 201 },
		);
	} catch (error) {
		console.error('Join error: ', error);

		const message =
			error instanceof Error ? error.message : 'Internal Server Error';

		return NextResponse.json({ message }, { status: 500 });
	}
}
