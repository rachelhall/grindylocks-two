import { type RouterOutputs } from "grindylocks/utils/api";
import Image from "next/image"
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime)

type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export const PostView = (props: PostWithUser) => {
    const { post, user } = props;
    return (
        <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
            <Image
                src={user.profilePicture}
                width={32}
                height={32}
                alt="the user's avatar"
                className="flex h-16 w-16  rounded-full"
            />
            <div className="flex flex-col">
                <div className="flex text-slate-300">
                    <Link href={`profile/@${user.username}`}> <span>{`@${user.username}`}</span></Link>  •
                    <Link href={`post/${post.id}`}><span>{dayjs(post.createdAt).fromNow()}</span></Link>
                </div>
                <span>{post.content}</span>
                {post.filePath && <Image src={post.filePath} width={60} height={60} alt="post photo" />}
            </div>
        </div>
    );
};