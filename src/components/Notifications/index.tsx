import React from "react";

import styles from "./Notifications.module.scss";
import { FollowRequestCard } from "../FollowRequestCard";
import { useUser } from "@clerk/nextjs";
import { api } from "grindylocks/utils/api";

interface IProps {

}

export const Notifications: React.FC<IProps> = (props) => {
    const { } = props;

    const { user } = useUser()
    const { data, isError } = api.account.getAccountByUsername.useQuery({ username: user?.username ?? "" })
    const followRequests = data?.follow_requests

    return (
        <div className={styles.Notifications}>
            {followRequests?.map(request => (
                <FollowRequestCard followRequest={request} />
            ))}
        </div>
    );
};

export default Notifications;
