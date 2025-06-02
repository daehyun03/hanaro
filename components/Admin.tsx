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
import { User } from '@/types/type';
import { Input } from '@/components/ui/input';
import SearchIcon from '@/asset/search';

export default function Admin() {
	const [users, setUsers] = useState<User[]>([]);
	const [search, setSearch] = useState('');
	useEffect(() => {
		const fetchUsers = async () => {
			const res = await fetch('/api/admin/user');
			if (!res.ok) {
				throw new Error('Failed to fetch users');
			}
			const user_data: User[] = await res.json();
			setUsers(user_data);
		};
		fetchUsers();
	}, []);
	return (
		<div>
			<div>
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
									user.nickname.includes(search)
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
		</div>
	);
}
