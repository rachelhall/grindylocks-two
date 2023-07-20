import { generateSSGHelper } from "grindylocks/server/helpers/ssgHelper";
import { api } from "grindylocks/utils/api"
import { type GetStaticProps, type NextPage } from "next";
import { Text } from "../../styleComponents"
import PostGrid from "grindylocks/components/PostGrid";

const SingleParkPage: NextPage<{ id: string }> = ({ id }) => {
    const { data, isLoading } = api.parks.getById.useQuery({ id: id })
    const postData = data?.posts ?? []

    if (isLoading) return <div>Loading...</div>
    if (postData.length === 0) return <div>No one has posted at this park yet. Maybe you could be the first?</div>
    if (!data) return <div>404</div>

    return (
        <div>
            <Text fontSize="huge">{data.name}</Text>
            <PostGrid posts={postData} />
        </div>
    )
}

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

export default SingleParkPage;