import React, { useContext } from "react";

import styles from "./Feed.module.scss";
import { api } from "grindylocks/utils/api";
import FeedPost from "../FeedPost";
import { AccountContext } from "grindylocks/lib/context/accountContext";
import { Text } from "grindylocks/styleComponents";

interface IProps {

}

export const Feed: React.FC<IProps> = (props) => {
    const { } = props;
    const account = useContext(AccountContext)

    if (!account) throw new Error("You must be authenticated to view your feed")

    const { data, isLoading } = api.posts.getAll.useQuery({ accountId: account?.id });
    if (isLoading) {
        return <div>Loading...</div>;
    }



    return (
        <div className={styles.Feed}>
            {data?.length === 0 ? <Text>Follow some skaters to see their posts in your feed.</Text> :
                data?.map((post) => (
                    <FeedPost id={post.id} />
                ))}

        </div>
    );
};

export default Feed;
