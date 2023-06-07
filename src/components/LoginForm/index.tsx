import { useState } from "react";
import { useForm } from "react-hook-form";
import fetchJson, { FetchError } from "lib/fetchJson";
import useUser from "lib/hooks/useUser";
import { useRouter } from "next/router";

import { Button, TextInput } from "../../styleComponents";
import { Text } from "../../styleComponents/Text";

import styles from "./LoginForm.module.scss";

interface IProps {}

const LoginForm: React.FC<IProps> = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>();

  const { mutateUser } = useUser();

  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      mutateUser(
        await fetchJson("api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        })
      );
      router.push("/account");
    } catch (error) {
      if (error instanceof FetchError) {
        setErrorMsg(error.data.message);
      } else {
        console.error("An unexpected error has occurred:", error);
      }
    }
  };

  return (
    <div className={styles.loginForm}>
      <Text color="dark">Login here</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="email"
          required={true}
          type="text"
          register={register}
        />
        <TextInput
          label="password"
          required={true}
          type="password"
          register={register}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default LoginForm;
