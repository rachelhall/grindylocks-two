import React from "react";
import { Text } from 'grindylocks/styleComponents'
import pluralize from "pluralize"

import style from "./BusinessDetails.module.scss";
import Avatar from "grindylocks/styleComponents/Avatar";
import { Account, Business, Post } from "@prisma/client";
import Link from "next/link";
import RiderCard from "../RiderCard";

interface IProps {
    business: Business;
    riders: Account[]
}



export const BusinessDetails: React.FC<IProps> = (props) => {
    const { business, riders } = props;
    return (
        <div className={style.BusinessDetails}>
            {business.profilePicture && <Avatar className={style.avatar} size="large" initials={business.name[0] ?? ""} src={business.profilePicture} username={business.name ?? ""} />}
            <div className={style.details}>


                <Text fontSize="large">{`${business.name}`}</Text>
                <div className={style.hours}>
                    <Text fontWeight="bold">Store Hours:</Text>
                    <Text fontSize="small">{`Store Hours:${business.hours}`}</Text>
                </div>
                <div className={style.riders}>
                    <Text fontSize="small" fontWeight="bold">Riders:</Text>
                    <div className={style.riderCards}>

                        {riders.map(rider => (
                            <Link href={`/profile/@${rider.username}`} key={rider.id} >
                                <RiderCard rider={rider} />
                            </Link>
                        ))}
                    </div>
                </div>


                {/* <div className={style.postCount}>
                    <Text fontWeight="bold">{`${posts.length}`}</Text>
                    <Text>{`${pluralize('post', posts.length)}`}</Text>
                </div>
                {sponsors.length > 0 && (<div className={style.sponsors}>
                    <Text fontWeight="bold">Team: </Text>
                    {sponsors.map(sponsor => (
                        <Link href={`/business/${sponsor.id}`}>
                            <Text>{sponsor.name}</Text>
                        </Link>
                    ))}
                </div>)}
                <Text fontWeight="bold">{`${account.first_name ?? ""} ${account.last_name ?? ""}`}</Text>
                <Text>{account.bio ?? ""}</Text> */}
            </div>
        </div>
    );
};

export default BusinessDetails;
