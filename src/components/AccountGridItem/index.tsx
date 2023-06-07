import React from "react";
import { IPost } from "lib/types/post";
import Image from "next/image";

import { Text } from "../../styleComponents";

import styles from "./AccountGridItem.module.scss";

interface IProps {
  post: IPost;
}

export const AccountGridItem: React.FC<IProps> = (props) => {
  const { post } = props;

  return (
    <div className={styles.AccountGridItem}>
      <Image
        alt={post.title}
        src={post.media[0].public_url ?? ""}
        layout="fill"
        objectFit="cover"
      />
      <div className={styles.postInfo}>
        <Text>{post.title}</Text>
      </div>
    </div>
  );
};

export default AccountGridItem;
