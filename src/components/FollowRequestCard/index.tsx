import React from "react";

import styles from "./FollowRequestCard.module.scss";
import { Button, Text } from "grindylocks/styleComponents";
import { FollowRequest, FollowRequestStatus } from "@prisma/client";
import { api } from "grindylocks/utils/api";
import { toast } from "react-hot-toast";
import Avatar from "grindylocks/styleComponents/Avatar";
import Link from "next/link";

interface IProps {
    followRequest: FollowRequest
}

export const FollowRequestCard: React.FC<IProps> = (props) => {
    const { followRequest } = props;


    const ctx = api.useContext()

    const { data: followerRequesting } = api.account.getAccountById.useQuery({ id: followRequest.requested_id })

    const { mutate, isLoading: _isMutatingRequest } = api.followRequest.updateFollowRequest.useMutation({
        onError: e => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage && errorMessage[0]) {
                toast.error(errorMessage[0])
            } else {
                toast.error("There was an error with your follow request update")
            }
        },
        onSuccess: () => ctx.followRequest.invalidate()
    })

    const handleFollowRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
        const status = e.currentTarget.value as FollowRequestStatus
        mutate({ followRequestId: followRequest.id, status })
    }

    if (!followerRequesting) return null;

    return (
        <div className={styles.FollowRequestCard}>
            <Avatar src={followerRequesting?.profilePicture ?? ""} initials={`${followerRequesting.first_name?.[0]} ${followerRequesting.last_name?.[0]}`} username={followerRequesting?.username ?? ""} />


            <Link href={`profiles/@${followerRequesting?.username}`} className={styles.link}>
                <Text>{`${followerRequesting?.first_name} ${followerRequesting?.last_name} requested to follow you`}</Text>
            </Link>
            <div className={styles.buttonContainer}>
                <Button className={styles.button} buttonSize="micro" onClick={handleFollowRequest} value={FollowRequestStatus.ACCEPTED}>Accept</Button>
                <Button className={styles.button} buttonSize="micro" onClick={handleFollowRequest} value={FollowRequestStatus.REJECTED}>Ignore</Button>
            </div>

        </div>
    );
};

export default FollowRequestCard;
