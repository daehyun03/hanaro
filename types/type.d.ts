import { DateTime } from '@auth/core/providers/kakao';

export type Tag = {
	tag_id: number;
	name: string;
	_count: {post: number};
}

export type ShowPost = {
	post_id: number;
	title: string;
	time: DateTime;
	text: string;
	tag: {
		name: string;
	};
}

export type AllPost = {
	post_id: number;
	title: string;
	text: string;
	time: string;
	modified_date: string;
	tag: {
		name: string;
	};
};

export type User = {
	user_id: number;
	email: string;
	nickname: string;
	role: 'admin' | 'user';
};

export type ShortPost = {
	post_id: number;
	title: string;
	like_count: number;
	tag: {
		name: string;
	};
}