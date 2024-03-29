import React, { useContext } from "react";
import { Button, Text } from 'grindylocks/styleComponents'
import pluralize from "pluralize"

import style from "./ProfileDetails.module.scss";
import Avatar from "grindylocks/styleComponents/Avatar";
import { Account, Business, Post, Trick } from "@prisma/client";
import Link from "next/link";
import FollowButton from "../FollowButton";
import { useUser } from "@clerk/nextjs";
import { api } from "grindylocks/utils/api";
import { AccountContext } from "grindylocks/lib/context/accountContext";

interface IProps {
    account: Account;
    posts: Post[];
    sponsors: Business[];
    tricks: Trick[];
}



export const ProfileDetails: React.FC<IProps> = (props) => {
    const { account, posts, sponsors, tricks } = props;
    const { user } = useUser()

    const ownAccount = useContext(AccountContext)
    const isOwnAccount = ownAccount?.id === account.id
    const followRequests = api.followRequest.getAllFollowRequestOnAccount.useQuery({ account_id: ownAccount.id })
    console.log({ followRequests })

    return (
        <div className={style.ProfileDetails}>
            {account.profilePicture && <Avatar initials={`${account.first_name?.[0]} ${account.last_name?.[0]}`} className={style.avatar} size="large" src={account.profilePicture} username={account.username ?? ""} />}
            <div className={style.details}>
                <Text fontSize="medium">{`${account.username}`}</Text>
                <div className={style.postCount}>
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
                <Text>{account.bio ?? ""}</Text>
                {/* <Text>{`Tricks: ${tricks}`}</Text> */}
                {!isOwnAccount && ownAccount && <FollowButton currentAccountId={ownAccount.id} accountId={account.id} />}
            </div>
        </div>
    );
};

export default ProfileDetails;
