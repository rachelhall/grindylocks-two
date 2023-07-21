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
            <Text>{data.description}</Text>
            <br />
            <Text>{`${data.address_number} ${data.street}`}</Text>
            <Text>{`${data.city}, ${data.region_code} ${data.post_code}`}</Text>
            <br />
            <Text fontWeight="bold">Surface:</Text>
            <Text>{data.surface}</Text>
            <br />
            <Text fontWeight="bold">Elements:</Text>
            {data.elements.map(element => (
                <Text>{element.name}</Text>
            ))}
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