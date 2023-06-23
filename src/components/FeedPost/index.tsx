import React from "react";

import styles from "./FeedPost.module.scss";
import Image from 'next/image'
import { Account, Park, Post } from "@prisma/client";
import { Text } from "grindylocks/styleComponents"
import Link from "next/link";
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime"
import Avatar from "grindylocks/styleComponents/Avatar";

dayjs.extend(relativeTime)

interface IProps {
    account: Account | null;
    content: string;
    createdAt: Date;
    filePath: string | null;
    id: string;
    park: Park;
    userId: string;
    businessId?: string
}

export const FeedPost: React.FC<IProps> = (props) => {
    console.log(props)
    const { account, content, createdAt, filePath, id, park } = props;


    if (!filePath || !account) return;

    return (
        <div className={styles.FeedPost}>
            <div className={styles.header}>
                <Avatar src={account.profilePicture ?? ""} username={account.username ?? ""} size="x-small" />
                <div className={styles.details}>
                    <div className={styles.name}>
                        <Link href={`profile/@${account.username}`}><Text className={styles.username} fontWeight="bold">{`${account.username}`}</Text></Link>
                        <Link href={`post/${id}`}><Text>{`| ${dayjs(createdAt).fromNow()}`}</Text></Link>
                    </div>
                    <Link href={`park/${park.id}`}><Text>{park.name}</Text></Link>
                </div>

            </div>
            <div className={styles.imageContainer}>
                <Image src={filePath} fill alt="photo of the park" />
            </div>
            <div className={styles.content}>
                <Text fontWeight="bold">{account.username ?? ""}</Text>
                <Text>{content}</Text>
            </div>
        </div>
    );
};

export default FeedPost;
