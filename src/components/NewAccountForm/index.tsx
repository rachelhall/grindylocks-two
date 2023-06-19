import React from "react";
import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";

import styles from "./NewAccountForm.module.scss";
import TextInput from "grindylocks/styleComponents/TextInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "grindylocks/styleComponents";

type TFormInput = {

}

interface IProps {

}

export const NewAccountForm: React.FC<IProps> = (props) => {
    const { } = props;

    const { handleSubmit, register, watch, formState: { errors } } = useForm<TFormInput>();
    const { isLoaded, signUp, setActive } = useSignUp();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState("");
    const router = useRouter();
    // start the sign up process.
    const onHandleSubmit: SubmitHandler<TFormInput> = async () => {

        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                emailAddress,
                password,
            });

            // send the email.


            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            // change the UI to our pending section.
            setPendingVerification(true);
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    // This verifies the user using email code that is delivered.
    const onPressVerify = async () => {

        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });
            if (completeSignUp.status !== "complete") {
                /*  investigate the response, to see if there was an error
                 or if the user needs to complete more steps.*/
                console.log(JSON.stringify(completeSignUp, null, 2));
            }
            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId })
                router.push("/");
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <div>
            {!pendingVerification && (
                <form onSubmit={handleSubmit(onHandleSubmit)}>
                    <div>
                        <label htmlFor="email">Email</label>
                        <TextInput
                            register={register} name="email" type="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <TextInput
                            register={register} name="password" type="password" />
                    </div>
                    <Button type="submit">Sign up</Button>
                </form>
            )}
            {pendingVerification && (
                <div>
                    <form>
                        <TextInput
                            register={register}
                            name="code"
                            placeholder="Code..."
                            type="code"
                        />
                        <button onClick={onPressVerify}>
                            Verify Email
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
