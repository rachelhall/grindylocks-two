import React from "react";

import styles from "./PostGridItem.module.scss";
import Card from "grindylocks/styleComponents/Card";
import Image from "next/image"
import type { Post } from "@prisma/client";

interface IProps {
    post: Post
}

export const PostGridItem: React.FC<IProps> = (props) => {
    const { post } = props;

    if (!post.filePath) return;

    return (
        <Card>
            <Image src={post.filePath} height={300} width={300} alt="photo of the park" />
        </Card>
    );
};

export default PostGridItem;
