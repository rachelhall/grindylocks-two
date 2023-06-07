import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { gql, useMutation } from "@apollo/client";
import {
  AddressAutofill,
  config,
  useConfirmAddress,
} from "@mapbox/search-js-react";
import { IPark } from "lib/types/park";
import dynamic from "next/dynamic";
import { Button, TextInput } from "styleComponents";

import CloudinaryUploadWidget from "components/CloudinaryUploadWidget";

import styles from "./AddParkForm.module.scss";

interface IProps {}

export const AddParkForm: React.FC<IProps> = (props) => {
  const [imageSrc, setImageSrc] = useState();
  const [showFormExpanded, setShowFormExpanded] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const [feature, setFeature] = useState();
  const [showValidationText, setShowValidationText] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken =
      "pk.eyJ1IjoiZ3JpbmR5bG9ja3MiLCJhIjoiY2xkYzhvOWQ1MDJ6cDNwcWo1d3Z4ZHlmcyJ9.ZuHSX0E3O8SU2_s5kjjxLw";
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  const handleRetrieve = useCallback(
    (res) => {
      const feature = res.features[0];
      setFeature(feature);
      setShowMinimap(true);
      setShowFormExpanded(true);
    },
    [setFeature, setShowMinimap]
  );

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPark>();

  const CreateParkMutation = gql`
    mutation (
      $name: String!
      $description: String!
      $surface: String!
      $lat: Int
      $lon: Int
      $address_number: Int
      $street: String
      $post_code: Int
      $city: String
      $region: String
      $region_code: String
      $country: String
    ) {
      createPark(
        name: $name
        description: $description
        surface: $surface
        lat: $lat
        lon: $lon
        address_number: $address_number
        street: $street
        post_code: $post_code
        city: $city
        region: $region
        region_code: $region_code
        country: $country
      ) {
        name
        description
        lat
        lon
        address_number
        street
        post_code
        city
        region
        region_code
        country
      }
    }
  `;

  const [createPark, { loading, error }] = useMutation(CreateParkMutation, {
    onCompleted: () => reset(),
  });

  const onSubmit = async (data) => {
    console.log({ feature });
    const variables = {
      name: data.name,
      description: data.description,
      lat: feature.geometry[0],
      lon: feature.geometry[2],
      address_number: feature.properties.address_number,
      street: feature.properties.street,
      post_code: feature.properties.post_code,
      city: feature.properties.city,
      region: feature.properties.region,
      region_code: feature.properties.region_code,
      country: feature.properties.country,
    };

    try {
      toast.promise(createPark({ variables }), {
        loading: "Creating new park...",
        success: "Park successfully created!",
        error: `Something went wrong 😱. Please try again = ${error} `,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.AddParkForm}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="name"
          required={false}
          type="text"
          register={register}
        />
        <AddressAutofill accessToken={token} onRetrieve={handleRetrieve}>
          <TextInput
            label="Address"
            placeholder="Start typing your address, e.g. 123 Main..."
            required={false}
            type="text"
            register={register}
            autoComplete="address-line1"
            id="mapbox-autofill"
          />
        </AddressAutofill>

        <TextInput
          label="description"
          required={false}
          type="text"
          register={register}
        />
        {/* <CloudinaryUploadWidget /> */}

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddParkForm;
