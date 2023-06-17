import React from "react";

import styles from "./PostGrid.module.scss";
import type { Post } from "@prisma/client";
import PostGridItem from "../PostGridItem";

interface IProps {
    posts: Post[]
}

export const PostGrid: React.FC<IProps> = (props) => {
    const { posts } = props;

    return (
        <div className={styles.PostGrid}>
            {posts.map(post => (
                <PostGridItem post={post} key={post.id} />
            ))}
        </div>
    );
};

export default PostGrid;
