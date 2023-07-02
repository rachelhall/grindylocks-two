import React, { useContext, useEffect } from "react";
import { useForm, type SubmitHandler, Form } from "react-hook-form";
import Image from 'next/image'

import styles from "./NewPostForm.module.scss";
import TextInput from "grindylocks/styleComponents/TextInput";
import { Button } from "grindylocks/styleComponents/Button";
import FileInput from "grindylocks/styleComponents/FileInput";
import { api } from "grindylocks/utils/api";
import toast from "react-hot-toast";
import Select from "grindylocks/styleComponents/Select";
import { useModal } from "grindylocks/lib/hooks/useModal";
import { ModalContext } from "grindylocks/lib/context/ModalContext";
import { AccountContext } from "grindylocks/lib/context/accountContext";

type TFormInput = {
    content: string;
    files: FileList
    parkId: string;
}

interface IProps {

}

export const NewPostForm: React.FC<IProps> = (props) => {
    const { } = props;

    const account = useContext(AccountContext)

    const { data: parks } = api.parks.getAll.useQuery()
    const { handleSubmit, register, watch } = useForm<TFormInput>();
    const { handleModal } = useContext(ModalContext);
    const files = watch('files')
    const previewUrl = files && files[0] ? URL.createObjectURL(files[0]) : null

    const ctx = api.useContext()

    const parkOptions = parks?.map(park => ({
        key: park.id,
        name: park.name,
        value: park.id
    }))




    const { mutate, isLoading: _isPosting } = api.posts.create.useMutation({
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage && errorMessage[0]) {
                toast.error(errorMessage[0])
            } else {
                toast.error("There was an error with your")
            }
        },
        onSuccess: () => {
            ctx.posts.getAll.invalidate()
            handleModal()
        }
    })

    if (!account) throw new Error("You must be logged in to post.")

    const onSubmit: SubmitHandler<TFormInput> = async ({ content, files, parkId }) => {
        try {
            const formData = new FormData();

            if (files) {
                Array.from(files).forEach((file, index) => {
                    formData.append(`file`, file);
                })
            }

            const res = await fetch('/api/uploadMedia', {
                method: 'POST',
                body: formData,
            });

            const { filePath } = await res.json();

            mutate({ accountId: account?.id, content, filePath, parkId })
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <div className={styles.NewPostForm}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {previewUrl ? <Image style={{ objectFit: "cover", objectPosition: "center" }} src={previewUrl} height={300} width={300} alt="Image preview" /> : <div />}
                <TextInput register={register} name="content" required placeholder="Write a caption..." type="text" />
                <Select register={register} options={parkOptions} name="parkId" />
                <div className={styles.fileRow}>
                    <FileInput register={register} name={"files"} id="media" />
                    <Button type="submit">Share</Button>
                </div>
            </form>
        </div>
    );
};

export default NewPostForm;
