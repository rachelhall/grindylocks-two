import { api } from "grindylocks/utils/api";
import type { GetStaticProps, NextPage } from "next";

import { generateSSGHelper } from "grindylocks/server/helpers/ssgHelper";
import styles from "./Business.module.scss"
import BusinessDetails from "grindylocks/components/BusinessDetails";



const BusinessPage: NextPage<{ trpcState: any }> = (props) => {
    const business_id = props.trpcState.json.queries[0].state.data.id;


    const { data, isLoading } = api.business.getBusinessById.useQuery({ id: business_id })
    const { data: postData, isLoading: postIsLoading } = api.posts.getPostsByUserId.useQuery({ userId: data?.id ?? "" })


    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!data) {
        return <div>404</div>
    }

    return (
        <div className={styles.Profile}>
            <BusinessDetails business={data} riders={data.team_riders} />

        </div>

    )

}


export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateSSGHelper()

    const slug = context?.params?.slug;


    if (typeof slug !== "string") throw new Error("no slug")

    const business_id = slug



    await ssg.business.getBusinessById.prefetch({ id: business_id })

    return {
        props: {
            trpcState: ssg.dehydrate(),
            business_id,
        }
    }
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

export default BusinessPage; 