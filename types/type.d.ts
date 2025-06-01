import { DateTime } from '@auth/core/providers/kakao';

export type Tag = {
	tag_id: number;
	name: string;
	cnt: number;
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

type AllPost = {
	post_id: number;
	title: string;
	text: string;
	time: string;
	modified_date: string;
	tag: {
		name: string;
	};
};