import React from "react";

import styles from "./FeedPost.module.scss";
import Image from 'next/image'
import { Post } from "@prisma/client";
import { Text } from "grindylocks/styleComponents"
import Link from "next/link";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import Avatar from "grindylocks/styleComponents/Avatar";

dayjs.extend(relativeTime)

interface IProps {
    post: Post;
    user: any;
}

export const FeedPost: React.FC<IProps> = (props) => {
    const { post, user } = props;
    if (!post.filePath) return;

    return (
        <div className={styles.FeedPost}>
            <div className={styles.header}>
                <Avatar src={user.profilePicture} username={user.username} size="x-small" />
                <div className={styles.name}>
                    <Link href={`profile/@${user.username}`}> <Text fontWeight="bold">{`@${user.username}`}</Text></Link>  •
                    <Link href={`post/${post.id}`}><Text>{dayjs(post.createdAt).fromNow()}</Text></Link>
                </div>

            </div>
            <div className={styles.imageContainer}>
                <Image src={post.filePath} fill alt="photo of the park" />
            </div>
            <div className={styles.content}>
                <Text fontWeight="bold">{user.username}</Text>
                <Text>{post.content}</Text>
            </div>
        </div>
    );
};

export default FeedPost;
