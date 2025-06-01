'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormState = {
	email: string;
	password: string;
	nickname: string;
	passwordConfirm: string;
};

export function SignupForm({
	className,
	...props
}: React.ComponentProps<'div'>) {
	const router = useRouter();
	const [form, setForm] = useState<FormState>({
		email: '',
		password: '',
		nickname: '',
		passwordConfirm: '',
	});
	const onSubmit = async () => {
		if (form.password !== form.passwordConfirm) {
			alert('비밀번호가 일치하지 않습니다.');
			return;
		}

		if (form.nickname.length < 2) {
			alert('닉네임은 두 글자 이상으로 작성해 주세요.');
			return;
		}

		if (form.password.length < 6) {
			alert('비밀번호는 6자 이상으로 작성해 주세요.');
			return;
		}

		try {
			const res = await fetch('/api/user/signup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: form.email,
					password: form.password,
					nickname: form.nickname,
				}),
			});

			let data;
			try {
				data = await res.json();
			} catch {
				data = { message: '서버 응답이 올바르지 않습니다.' };
			}

			if (!res.ok) {
				alert(`회원가입 실패: ${data.message}`);
			} else {
				alert('회원가입 성공! 로그인 화면으로 이동합니다.');
				router.push('/login');
			}
		} catch (error) {
			console.error('회원가입 요청 실패:', error);
			alert('요청 중 오류가 발생했습니다.');
		}
	};
	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome</CardTitle>
					<CardDescription>Create new account</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={onSubmit}>
						<div className="grid gap-6">
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										required
										onChange={(e) =>
											setForm({
												...form,
												email: e.target.value,
											})
										}
										onInput={(e) =>
											setForm({
												...form,
												email: e.currentTarget.value,
											})
										}
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
								<div className="grid gap-3">
									<div className="flex items-center">
										<Label htmlFor="password">
											Nickname
										</Label>
									</div>
									<Input
										id="nickname"
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
								<Button type="submit" className="w-full">
									Sign Up
								</Button>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
