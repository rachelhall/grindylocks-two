import React from "react";
import { Text } from 'grindylocks/styleComponents'
import pluralize from "pluralize"

import style from "./ProfileDetails.module.scss";
import Avatar from "grindylocks/styleComponents/Avatar";
import { Account, Business, Post } from "@prisma/client";

interface IProps {
    account: Account;
    posts: Post[];
    sponsors: Business[]
}



export const ProfileDetails: React.FC<IProps> = (props) => {
    const { account, posts, sponsors } = props;

    return (
        <div className={style.ProfileDetails}>
            {account.profilePicture && <Avatar className={style.avatar} size="large" src={account.profilePicture} username={account.username ?? ""} />}
            <div className={style.details}>
                <Text fontSize="medium">{`${account.username}`}</Text>
                <div className={style.postCount}>
                    <Text fontWeight="bold">{`${posts.length}`}</Text>
                    <Text>{`${pluralize('post', posts.length)}`}</Text>
                </div>
                {sponsors.length > 0 && (<div className={style.sponsors}>
                    <Text fontWeight="bold">Team: </Text>
                    <Text>{sponsors.map(sponsor => sponsor.name).join(" ")}</Text>
                </div>)}
                <Text fontWeight="bold">{`${account.first_name ?? ""} ${account.last_name ?? ""}`}</Text>
                <Text>{account.bio ?? ""}</Text>
            </div>
        </div>
    );
};

export default ProfileDetails;
