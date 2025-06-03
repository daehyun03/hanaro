import { ShowPost } from '@/types/type';
import {
	Card,
	CardContent,
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
	const cutText = (text: string, length: number = 60) => {
		if (text.length <= length) {
			return text;
		}
		return text.slice(0, length) + '...';
	}
	return (
		<Link href={`/post/${post.post_id}`} className="flex">
			<Card className="w-full h-full hover:shadow-lg transition-shadow duration-200 flex-1">
				<CardHeader>
					<CardTitle className="truncate max-w-full">
						{post.title}
					</CardTitle>
					<CardDescription className="text-xs">
						{printDate(post.time)}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p>{cutText(post.text)}</p>
				</CardContent>
				<CardFooter>
					<div className="text-xs px-3 py-1 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full border ">
						{post.tag.name}
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
}
