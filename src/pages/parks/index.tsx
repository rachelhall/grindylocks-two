import { api } from "grindylocks/utils/api"
import { NextPage } from "next";
import { Text } from "../../styleComponents"
import Link from "next/link";

const AllParksPage: NextPage = () => {
    const { data } = api.parks.getAll.useQuery()

    return (
        <div>
            {data?.map(park => {
                console.log(park.id)
                return (<div key={park.id}>
                    <Link href={`park/${park.id}`}>
                        <Text fontSize="large">{park.name}</Text>
                    </Link>
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