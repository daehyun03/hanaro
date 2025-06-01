'use client';

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
	passwordConfirm: string;
};

export default function MyInfo({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const { data: session } = useSession();
	const [form, setForm] = useState<FormState>({
		password: '',
		passwordConfirm: '',
	});
	// const handleUpdateNickname = async () => {
	// 	const res = await fetch("/api/user/update-nickname", {
	// 		method: "POST",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 		body: JSON.stringify({ nickname: form.nickname }),
	// 	});
	//
	// 	if (res.ok) {
	// 		console.log(res.body);
	// 		await signOutWithForm()
	// 		.then(() => router.push('/'))
	// 	}
	// };
	const handleUpdatePassword = async () => {
		if (form.password !== form.passwordConfirm) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}
		if (form.password.length < 6) {
			alert('비밀번호는 6자 이상으로 작성해 주세요.');
			return;
		}
		const res = await fetch('/api/user/update-password', {
			method: 'PUT',
			body: JSON.stringify({ pw: form.password }),
		});
		if (res.ok) {
			alert('비밀번호 변경을 완료했습니다');
		} else {
			alert('비밀번호 변경에 실패했습니다. 다시 시도해주세요.');
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
									<Label htmlFor="password">Nickname</Label>
								</div>
								<Input
									id="nickname"
									name="nickname"
									type="text"
									readOnly
									value={session?.user?.name || ''}
									required
								/>
							</div>
							<form
								onSubmit={handleUpdatePassword}
								className="grid gap-3"
							>
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
							</form>
						</div>
					</div>

					<Button className="w-full mt-6">Withdraw</Button>
				</CardContent>
			</Card>
		</div>
	);
}

// <form onSubmit={handleUpdateNickname}>
// 	<div className="grid gap-3">
// 		<div className="flex items-center">
// 			<Label htmlFor="password">
// 				Nickname
// 			</Label>
// 		</div>
// 		<Input
// 			id="nickname"
// 			name="nickname"
// 			type="text"
// 			required
// 			onChange={(e) =>
// 				setForm({
// 					...form,
// 					nickname: e.target.value,
// 				})
// 			}
// 			onInput={(e) =>
// 				setForm({
// 					...form,
// 					nickname: e.currentTarget.value,
// 				})
// 			}
// 		/>
// 	</div>
// 	<Button type="submit" className="w-full mt-6">
// 		Change Nickname
// 	</Button>
// </form>
