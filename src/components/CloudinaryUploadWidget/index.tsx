import React from "react";
import { UploadApiOptions } from "cloudinary";
import { IMediaItem } from "lib/types/mediaItem";
import Script from "next/script";
import { Button } from "styleComponents";
import { openUploadWidget } from "utils/CloudinaryService";

import styles from "./CloudinaryUploadWidget.module.scss";

interface IProps {
  setCloudinaryResponse: (data: any) => void;
}

export const CloudinaryUploadWidget: React.FC<IProps> = (props) => {
  const { setCloudinaryResponse } = props;

  const cloudOptions = {
    cloudName: "dyspjkmgs",
    uploadPreset: "grindylocks_park",
  };

  const onMediaUpload = (error, result) => {
    try {
      const files: IMediaItem[] = result.info.files;

      if (files) {
        files.forEach((file) => setCloudinaryResponse(file.uploadInfo));
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const uploadWidget = () => {
    const myUploadWidget = window.cloudinary.openUploadWidget(
      cloudOptions,
      onMediaUpload
    );

    myUploadWidget.open();
  };
  return (
    <div className={styles.CloudinaryUploadWidget}>
      <Button onClick={uploadWidget}>Open widget</Button>
      <Script
        src="https://widget.cloudinary.com/v2.0/global/all.js"
        type="text/javascript"
      />
    </div>
  );
};

export default CloudinaryUploadWidget;
