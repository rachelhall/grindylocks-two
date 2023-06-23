import React from "react";

import styles from "./RiderCard.module.scss";
import Card from "grindylocks/styleComponents/Card";
import Text from "grindylocks/styleComponents/Text"
import { Account } from "@prisma/client";
import Image from "next/image";

interface IProps {
    rider: Account
}

export const RiderCard: React.FC<IProps> = (props) => {
    const { rider } = props;

    return (
        <Card className={styles.RiderCard} size="xSmall">
            <>
                <Text color="light" className={styles.name} >{`${rider.first_name ?? ""} ${rider.last_name ?? ""}`}</Text>
                <Image fill src={rider.profilePicture ?? ""} alt={`photo of ${rider.first_name ?? ""} ${rider.last_name ?? ""}`} />
            </>
        </Card>
    );
};

export default RiderCard;
