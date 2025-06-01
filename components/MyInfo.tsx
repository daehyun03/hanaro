'use client'

import { cn } from '@/lib/utils';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { signOutWithForm } from '@/serverActions/auth';
import { router } from 'next/client';

type FormState = {
	password: string;
	nickname: string;
	passwordConfirm: string;
};

export default function MyInfo({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const {data: session} = useSession();
	const [form, setForm] = useState<FormState>({
		password: '',
		nickname: '',
		passwordConfirm: '',
	});
	const handleUpdateNickname = async () => {
		const res = await fetch("/api/user/update-nickname", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ nickname: form.nickname }),
		});

		if (res.ok) {
			console.log(res.body);
			await signOutWithForm()
			.then(() => router.push('/'))
		}
	};
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Information</CardTitle>
					<CardDescription>Change your Information</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="mb-6">
						<div className="grid gap-6">
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										required
										readOnly
										value={session?.user?.email || ''}
									/>
								</div>
								<div className="grid gap-3">
									<div className="flex items-center">
										<Label htmlFor="password">
											Password
										</Label>
									</div>
									<Input
										id="password"
										type="password"
										required
										onChange={(e) =>
											setForm({
												...form,
												password: e.target.value,
											})
										}
										onInput={(e) =>
											setForm({
												...form,
												password: e.currentTarget.value,
											})
										}
									/>
								</div>
								<div className="grid gap-3">
									<div className="flex items-center">
										<Label htmlFor="password">
											Password Confirm
										</Label>
									</div>
									<Input
										id="passwordConfirm"
										type="password"
										required
										onChange={(e) =>
											setForm({
												...form,
												passwordConfirm: e.target.value,
											})
										}
										onInput={(e) =>
											setForm({
												...form,
												passwordConfirm:
													e.currentTarget.value,
											})
										}
									/>
								</div>
								<Button type="submit" className="w-full">
									Change Password
								</Button>
							</div>
						</div>
					</form>
					<form onSubmit={handleUpdateNickname}>
						<div className="grid gap-3">
							<div className="flex items-center">
								<Label htmlFor="password">
									Nickname
								</Label>
							</div>
							<Input
								id="nickname"
								name="nickname"
								type="text"
								required
								onChange={(e) =>
									setForm({
										...form,
										nickname: e.target.value,
									})
								}
								onInput={(e) =>
									setForm({
										...form,
										nickname: e.currentTarget.value,
									})
								}
							/>
						</div>
						<Button type="submit" className="w-full mt-6">
							Change Nickname
						</Button>
					</form>
					<Button className="w-full mt-6">Withdraw</Button>
				</CardContent>
			</Card>
		</div>
	);
}
