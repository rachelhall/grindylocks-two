import { api } from "grindylocks/utils/api";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "grindylocks/components/layout";
import Image from 'next/image'
import { PostView } from "grindylocks/components/PostView";
import { generateSSGHelper } from "grindylocks/server/helpers/ssgHelper";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

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

    if (isLoading) {
        return <div>"Loading..."</div>
    }

    if (!data) {
        return <div>404</div>
    }
    return (
        <>
            <Head>
                <title>Post</title>
            </Head>
            <PageLayout>
                <div>

                </div>
                <div className="bg-slate-600 h-48 relative">
                    <Image src={data.profilePicture} alt={`${data.username}'s profile picture`} width={128} height={128} className="-mb-[64px] absolute bottom-0 left-0 ml-4 rounded-full border-4 border-blac" />
                    {data.username}</div>
                <ProfileFeed userId={data.id} />
            </PageLayout>
        </>
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