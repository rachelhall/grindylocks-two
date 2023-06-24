import React from "react";

import styles from "./Feed.module.scss";
import { api } from "grindylocks/utils/api";
import FeedPost from "../FeedPost";

interface IProps {

}

export const Feed: React.FC<IProps> = (props) => {
    const { } = props;

    const { data, isLoading } = api.posts.getAll.useQuery();
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.Feed}>
            {data?.map((post) => (
                <FeedPost account={post.account} key={post.id} content={post.content} createdAt={post.createdAt} filePath={post.filePath} id={""} park={post.park} userId={""} />
            ))}
        </div>
    );
};

export default Feed;
