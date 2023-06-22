import { api } from "grindylocks/utils/api";
import type { GetStaticProps, NextPage } from "next";

import { generateSSGHelper } from "grindylocks/server/helpers/ssgHelper";
import PostGrid from "grindylocks/components/PostGrid";
import styles from "./Profile.module.scss"
import { ProfileDetails } from "grindylocks/components/ProfileDetails";


const ProfilePage: NextPage<{ trpcState: any }> = (props) => {
    const username = props.trpcState.json.queries[0].state.data.username;

    const { data, isLoading } = api.business.getBusinessById.useQuery({ id })
    const { data: postData, isLoading: postIsLoading } = api.posts.getPostsByUserId.useQuery({ userId: data?.id ?? "" })
    const posts = postData?.map(post => post.post) ?? []

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>404</div>
    }
    return (
        <div className={styles.Profile}>
            <ProfileDetails account={data} posts={data.posts} sponsors={data.sponsors} />
            {postData && <PostGrid posts={data.posts} />}
        </div>

    )

}


export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateSSGHelper()

    const slug = context?.params?.slug;

    if (typeof slug !== "string") throw new Error("no slug")

    const username = slug?.replace("@", "")

    await ssg.profile.getUserByUsername.prefetch({ username: username })

    return {
        props: {
            trpcState: ssg.dehydrate(),
            username
        }
    }
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

export default ProfilePage; 