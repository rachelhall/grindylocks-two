import React from "react";

import styles from "./FollowButton.module.scss";
import { Button } from "grindylocks/styleComponents";
import { api } from "grindylocks/utils/api";
import toast from "react-hot-toast";

interface IProps {
    accountId: string
    currentAccountId: string;
}

export const FollowButton: React.FC<IProps> = (props) => {
    const { accountId, currentAccountId } = props;

    const ctx = api.useContext()

    const { mutate, isLoading: _isFollowing } = api.followRequest.createFollowRequest.useMutation({
        onError: e => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage && errorMessage[0]) {
                toast.error(errorMessage[0])
            } else {
                toast.error("There was an error with your request")
            }
        },
        onSuccess: () => {
            ctx.followRequest.invalidate()
        }
    })

    const handleFollow = () => {
        const success = mutate({ account_id: currentAccountId, requested_id: accountId })

    }
    return (
        <div className={styles.FollowButton}>
            <Button onClick={handleFollow}>Follow</Button>
        </div>
    );
};

export default FollowButton;
