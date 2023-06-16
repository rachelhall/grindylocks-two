import { api } from "grindylocks/utils/api"
import { NextPage } from "next";
import { Text } from "../../styleComponents"

const AllParksPage: NextPage = () => {
    const { data } = api.parks.getAll.useQuery()
    console.log(data)

    return (
        <div>
            {data?.map(park => {
                return (<div key={park.id}>
                    <Text fontSize="large">{park.name}</Text>
                    <p></p>
                    <p>{park.description}</p>
                    <p>{park.city}, {park.region}</p>
                </div>
                )
            })}
        </div>
    )
}

export default AllParksPage;