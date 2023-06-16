import { api } from "grindylocks/utils/api"
import { NextPage } from "next";

const SingleParkPage: NextPage<{ id: string }> = ({ id }) => {
    const { data } = api.parks.getById.useQuery({ id })

    return (
        <div>
            <p>{data?.name}</p>
        </div>
    )
}

export default SingleParkPage;