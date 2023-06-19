import React from "react";
import Image from "next/image"
import { Text } from 'grindylocks/styleComponents'

import style from "./ProfileDetails.module.scss";
import Avatar from "grindylocks/styleComponents/Avatar";

interface IProps {
    profile: {
        id: string;
        username: string | null;
        profilePicture: string;
    }
}

const account = {
    name: "Rachel Raspberry",
    bio: "Musician. Software Developer. Rollerblader. Cat Mom."
}

export const ProfileDetails: React.FC<IProps> = (props) => {
    const { profile } = props;

    return (
        <div className={style.ProfileDetails}>
            <Avatar src={profile.profilePicture} username={profile.username ?? ""} />
            <div className={style.details}>
                <Text>{`@${profile.username}`}</Text>
                <Text fontWeight="bold">{account.name ?? ""}</Text>
                <Text>{account.bio ?? ""}</Text>
            </div>
        </div>
    );
};

export default ProfileDetails;
