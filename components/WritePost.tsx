'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Tag } from '@/types/type';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';

export default function () {
	const [tags, setTags] = useState<Tag[]>([]);
	const [selectedTag, setSelectedTag] = useState<number>(0);
	const [title, setTitle] = useState<string>('');
	const [text, setText] = useState<string>('');
	const [newTag, setNewTag] = useState<string>('');
	const { data: session } = useSession();
	const searchParams = useSearchParams();
	const postId = searchParams.get('postId');
	const fetchTags = async () => {
		const res = await fetch('/api/tags');
		const tag_data = await res.json();
		setTags(tag_data);
	};
	const addTag = async () => {
		if (!newTag.trim()) {
			alert('태그 이름을 입력해주세요.');
			return;
		}
		const res = await fetch('/api/tags', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ name: newTag }),
		});
		if (res.ok) {
			alert('태그가 추가되었습니다.');
			setNewTag('');
			window.location.reload();
		} else {
			alert('태그 추가에 실패했습니다.');
		}
	};
	const onsubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!selectedTag) {
			alert('태그를 선택해주세요.');
			return;
		}

		const payload = {
			title,
			text,
			tag: selectedTag,
		};
		try {
			let res: Response;
			if (postId) {
				res = await fetch(`/api/admin/write?postId=${postId}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload),
				});
			} else {
				res = await fetch('/api/admin/write', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload),
				});
			}

			if (!res.ok) {
				alert('글 등록에 실패했습니다.');
			} else {
				if (postId) {
					alert('글이 수정되었습니다.');
				} else {
					alert('글이 작성되었습니다.');
				}
				window.location.href = '/';
			}
		} catch (error) {
			console.error(error);
			alert('에러 발생');
		}
	};
	useEffect(() => {
		fetchTags();
		if (postId) {
			const fetchPost = async () => {
				const res = await fetch(`/api/post/${postId}`);
				if (res.ok) {
					const data = await res.json();
					setSelectedTag(data.tag.tag_id);
					setTitle(data.title);
					setText(data.text);
				}
			};
			fetchPost();
		}
	}, [postId]);
	if (session?.user?.role !== 'admin') {
		alert('관리자만 글을 작성할 수 있습니다.');
		window.location.href = '/';
	}
	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle className="text-xl">Write Post</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={onsubmit}>
						<div>
							<div className="grid gap-4">
								<div className="grid gap-2">
									<label
										htmlFor="title"
										className="text-sm font-medium"
									>
										Title
									</label>
									<input
										id="title"
										type="text"
										name="title"
										value={title}
										required
										onChange={(e) =>
											setTitle(e.target.value)
										}
										className="border rounded p-2"
									/>
								</div>
								<div className="grid gap-4">
									<Label className="text-sm font-medium">
										Tag
									</Label>
									<RadioGroup
										className="flex"
										value={String(selectedTag)}
										onValueChange={(value) =>
											setSelectedTag(Number(value))
										}
									>
										{tags.map((tag) => (
											<div
												key={tag.tag_id}
												className="flex items-center space-x-2"
											>
												<RadioGroupItem
													value={String(tag.tag_id)}
													id={String(tag.tag_id)}
												/>
												<Label htmlFor={tag.name}>
													{tag.name}
												</Label>
											</div>
										))}
									</RadioGroup>
								</div>
								<div className="grid gap-2">
									<Label className="text-sm font-medium">
										Add Tag
									</Label>
									<div className="flex items-center space-x-2">
										<input
											className="border rounded p-2"
											onChange={(e) =>
												setNewTag(e.target.value)
											}
										/>
										<Button type="button" onClick={addTag}>
											Add Tag
										</Button>
									</div>
								</div>
								<div className="grid gap-2">
									<label
										htmlFor="text"
										className="text-sm font-medium"
									>
										Content
									</label>
									<textarea
										id="text"
										name="text"
										rows={5}
										required
										value={text}
										className="border rounded p-2"
										onChange={(e) =>
											setText(e.target.value)
										}
									></textarea>
								</div>
							</div>
							<Button type="submit" className="mt-4">
								글 쓰기
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
