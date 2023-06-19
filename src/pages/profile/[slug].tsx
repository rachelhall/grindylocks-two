import { api } from "grindylocks/utils/api";
import type { GetStaticProps, NextPage } from "next";
import { PostView } from "grindylocks/components/PostView";
import { generateSSGHelper } from "grindylocks/server/helpers/ssgHelper";
import PostGrid from "grindylocks/components/PostGrid";
import styles from "./Profile.module.scss"
import { ProfileDetails } from "grindylocks/components/ProfileDetails";

const ProfileFeed = (props: { userId: string }) => {
    const { data, isLoading } = api.posts.getPostsByUserId.useQuery({ userId: props.userId })

    if (isLoading) return <div>Loading...</div>
    if (!data || data.length === 0) {
        return <div>No posts yet</div>
    }

    return (
        <div className="flex flex-col">
            {data.map(fullPost => {
                return (
                    <PostView {...fullPost} key={fullPost.post.id} />
                )
            })}
        </div>
    )
}

const ProfilePage: NextPage<{ trpcState: any }> = (props) => {
    const username = props.trpcState.json.queries[0].state.data.username;

    const { data, isLoading } = api.profile.getUserByUsername.useQuery({ username })
    const { data: postData, isLoading: postIsLoading } = api.posts.getPostsByUserId.useQuery({ userId: data?.id ?? "" })
    const posts = postData?.map(post => post.post) ?? []

    if (isLoading) {
        return <div>"Loading..."</div>
    }

    if (!data) {
        return <div>404</div>
    }
    return (
        <div className={styles.Profile}>
            <ProfileDetails profile={data} />
            {postData && <PostGrid posts={posts} />}
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