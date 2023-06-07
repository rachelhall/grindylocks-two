import React from "react";
import { IMediaItem } from "lib/types/mediaItem";
import Image from "next/image";

import styles from "./PostMedia.module.scss";

interface IProps {
  media: IMediaItem[];
  alt: string;
}

export const PostMedia: React.FC<IProps> = (props) => {
  const { media, alt } = props;

  return (
    <div className={styles.PostMedia}>
      {media?.map((mediaItem, index) => (
        <Image
          key={index}
          alt={alt}
          src={mediaItem.public_url ?? ""}
          height="470"
          width="470"
          objectFit="cover"
        />
      ))}
    </div>
  );
};

export default PostMedia;
