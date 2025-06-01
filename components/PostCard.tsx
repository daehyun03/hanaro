import { ShowPost } from '@/types/type';
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { printDate } from '@/app/utils/printDate';
import Link from 'next/link';

type PostCardProps = {
	post: ShowPost;
};

export default function PostCard({ post }: PostCardProps) {
	return (
		<Link href={`/post/${post.post_id}`}>
			<Card>
				<CardHeader>
					<CardTitle className="truncate max-w-full">
						{post.title}
					</CardTitle>
					<CardDescription className="text-xs">
						{printDate(post.time)}
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<div className="text-xs px-3 py-1 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full border ">
						{post.tag.name}
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
}
