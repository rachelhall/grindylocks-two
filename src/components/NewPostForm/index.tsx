import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { gql, useMutation, useQuery } from "@apollo/client";
import axios from "axios";
import { ModalContext } from "lib/context/ModalContext";
import { ICloudinaryResponse } from "lib/types/cloudinaryResponse";
import { IMediaItem } from "lib/types/mediaItem";
import { IPost } from "lib/types/post";

import CloudinaryUploadWidget from "components/CloudinaryUploadWidget";

import { Button, Text, TextInput } from "../../styleComponents";

import styles from "./NewPostForm.module.scss";

interface IProps {}

export const NewPostForm: React.FC<IProps> = (props) => {
  const {} = props;

  const { handleModal } = useContext(ModalContext);

  const [cloudinaryResponse, setCloudinaryResponse] =
    useState<ICloudinaryResponse>();

  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPost>();

  const AllParksQuery = gql`
    query allParksQuery($first: Int, $after: String) {
      parks(first: $first, after: $after) {
        edges {
          node {
            id
            name
            description
          }
        }
      }
    }
  `;

  const { data, fetchMore } = useQuery(AllParksQuery);

  const CreatePostMutation = gql`
    mutation ($title: String!, $description: String!, $parkId: String!) {
      createPost(title: $title, description: $description, parkId: $parkId) {
        title
        description
        parkId
      }
    }
  `;

  const [createPost, { loading, error }] = useMutation(CreatePostMutation, {
    onCompleted: () => reset(),
  });

  const onSubmit = async (data) => {
    const { title, description, park } = data;

    const variables = {
      title,
      description,
      parkId: park,
    };

    try {
      toast.promise(createPost({ variables }), {
        loading: "Creating new post...",
        success: "Post successfully created!",
        error: `Something went wrong. Please try again - ${error}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.NewPostForm}>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="title"
          required={false}
          type="text"
          register={register}
        />
        <TextInput
          label="description"
          required={false}
          type="text"
          register={register}
        />
        <TextInput
          label="park"
          required={false}
          type="text"
          register={register}
        />
        {/* <CloudinaryUploadWidget setCloudinaryResponse={setCloudinaryResponse} /> */}
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default NewPostForm;
