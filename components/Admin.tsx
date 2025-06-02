'use client';

import { useEffect, useState } from 'react';
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table';
import { Tag, User } from '@/types/type';
import { Input } from '@/components/ui/input';
import SearchIcon from '@/asset/search';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Admin() {
	const [users, setUsers] = useState<User[]>([]);
	const [search, setSearch] = useState('');
	const [tags, setTags] = useState<Tag[]>([]);
	const [selectedTag, setSelectedTag] = useState<number>(0);

	const delTag = async () => {
		if (!selectedTag) return;
		const res = await fetch('/api/tags', {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ tagId: selectedTag }),
		});
		if (res.ok) {
			alert('태그가 삭제되었습니다.');
			window.location.reload();
		} else {
			alert('태그 삭제에 실패했습니다. 관련 게시글이 있는지 확인해주세요');
		}
	}
	useEffect(() => {
		const fetchUsers = async () => {
			const res = await fetch('/api/admin/user');
			if (!res.ok) {
				throw new Error('Failed to fetch users');
			}
			const user_data: User[] = await res.json();
			setUsers(user_data);
		};
		const fetchTags = async () => {
			const res = await fetch('/api/tags');
			const tag_data = await res.json();
			setTags(tag_data);
		};
		fetchUsers();
		fetchTags();
	}, []);
	return (
		<div>
			<div>
				<div className="font-bold text-xl mb-4">Search User</div>
				<div className="flex gap-2 items-center">
					<Input
						type="text"
						placeholder="이메일 또는 닉네임 검색"
						value={search}
						className="mr-4 flex-1"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button
						type="submit"
						className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
					>
						<SearchIcon />
					</button>
				</div>
				<Table className="mt-4">
					<TableCaption>사용자 목록</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>User Id</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>NickName</TableHead>
							<TableHead>Role</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users
							.filter(
								(user) =>
									user.email.includes(search) ||
									user.nickname.includes(search),
							)
							.map((user: User) => (
								<TableRow key={user.user_id}>
									<TableCell>{user.user_id}</TableCell>
									<TableCell>{user.email}</TableCell>
									<TableCell>{user.nickname}</TableCell>
									<TableCell>{user.role}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</div>
			<div className="mt-8">
				<div className="font-bold text-xl mb-4">Delete Tag</div>
				<RadioGroup
					className="flex"
					value={String(selectedTag)}
					onValueChange={(value) => setSelectedTag(Number(value))}
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
							<Label htmlFor={tag.name}>{tag.name}</Label>
						</div>
					))}
				</RadioGroup>
				<Button type="button" className="mt-4" onClick={delTag}>
					Delete Tag
				</Button>
			</div>
		</div>
	);
}
