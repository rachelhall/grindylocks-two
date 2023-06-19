import { api } from "grindylocks/utils/api"
import { type NextPage } from "next";
import { Text } from "../../styleComponents"
import Link from "next/link";
import MediaCard from "grindylocks/styleComponents/MediaCard";

import styles from "./Parks.module.scss"

const Parks: NextPage = () => {
    const { data } = api.parks.getAll.useQuery()


    return (
        <div className={styles.Parks}>
            {data?.map(park => {

                return (<div key={park.id} className={styles.parkPreview}>
                    <Link href={`park/${park.id}`}>
                        {park.media[0]?.url && <MediaCard src={park.media[0]?.url} />}
                        <Text fontSize="medium" fontWeight="bold">{park.name}</Text>
                        <Text fontSize="small">{park.description}</Text>
                        <Text fontSize="small">{`${park.city}, ${park.region}`}</Text>
                    </Link>
                </div>
                )
            })}
        </div>
    )
}

export default Parks;