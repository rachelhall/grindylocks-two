import React from "react";

import styles from "./SinglePost.module.scss";
import FeedPost from "../FeedPost";

interface IProps {
    id: string;
}

export const SinglePost: React.FC<IProps> = (props) => {
    const { id } = props;

    return (
        <FeedPost id={id} />
    )
};

export default SinglePost;
