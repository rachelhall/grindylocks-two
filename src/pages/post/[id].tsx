import FeedPost from "grindylocks/components/FeedPost";
import { generateSSGHelper } from "grindylocks/server/helpers/ssgHelper";
import type { GetStaticProps, NextPage } from "next";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
    return (
        <FeedPost
            id={id}
            key={id}
        />
    )
};

export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateSSGHelper()

    const id = context?.params?.id;

    if (typeof id !== "string") throw new Error("no id")



    await ssg.posts.getById.prefetch({ id })

    return {
        props: {
            trpcState: ssg.dehydrate(),
            id
        }
    }
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

export default SinglePostPage; 