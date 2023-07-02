import React from "react";

import styles from "./Notifications.module.scss";
import { FollowRequestCard } from "../FollowRequestCard";
import { useUser } from "@clerk/nextjs";
import { api } from "grindylocks/utils/api";
import { Text } from 'grindylocks/styleComponents'

interface IProps {

}

export const Notifications: React.FC<IProps> = (props) => {
    const { } = props;

    const { user } = useUser()
    const { data, isError } = api.account.getAccountByUsername.useQuery({ username: user?.username ?? "" })
    const followRequests = data?.follow_requests.filter(request => request.status === "PENDING")

    return (
        <div className={styles.Notifications}>
            <Text fontSize="large" fontWeight="bold" color="black">Notifications</Text>
            {followRequests?.map(request => (
                <FollowRequestCard followRequest={request} />
            ))}
        </div>
    );
};

export default Notifications;
