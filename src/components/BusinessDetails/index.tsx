import React from "react";
import { Text } from 'grindylocks/styleComponents'
import pluralize from "pluralize"

import style from "./BusinessDetails.module.scss";
import Avatar from "grindylocks/styleComponents/Avatar";
import { Account, Business, Post } from "@prisma/client";
import Link from "next/link";

interface IProps {
    business: Business;
    riders: Account[]

}



export const BusinessDetails: React.FC<IProps> = (props) => {
    const { business, riders } = props;
    return (
        <div className={style.BusinessDetails}>
            {/* {account.profilePicture && <Avatar className={style.avatar} size="large" src={account.profilePicture} username={account.username ?? ""} />} */}
            <div className={style.details}>
                <Text fontSize="large">{`${business.name}`}</Text>
                <Text fontSize="medium" fontWeight="bold">Riders:</Text>
                {riders.map(rider => (
                    <Link href={`/profile/@${rider.username}`} key={rider.id}>
                        <Text>{rider.first_name ?? ""}</Text>
                    </Link>
                ))}

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
