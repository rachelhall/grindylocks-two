import React, { useContext } from "react";

import styles from "./PostGridItem.module.scss";
import Card from "grindylocks/styleComponents/Card";
import Image from "next/image"
import type { Post } from "@prisma/client";
import { ModalContext } from "grindylocks/lib/context/ModalContext";
import SinglePost from "../SinglePost";

interface IProps {
    post: Post
}

export const PostGridItem: React.FC<IProps> = (props) => {
    const { post } = props;

    const { handleModal } = useContext(ModalContext);

    const handleOpenPost = () => {
        handleModal(<SinglePost id={post.id} />)
    }

    if (!post.filePath) return;

    return (
        <Card onClick={handleOpenPost}>
            <Image src={post.filePath} height={300} width={300} alt="photo of the park" />
        </Card>
    );
};

export default PostGridItem;
