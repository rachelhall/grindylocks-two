
import { type NextPage } from "next";
import Image from "next/image";
import { api, type RouterOutputs } from "grindylocks/utils/api";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { PageLayout } from "grindylocks/components/layout";
import { PostView } from "grindylocks/components/PostView";

dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();


  const [value, setValue] = useState("");
  const [filePath, setFilePath] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files[0]) {
      setFilePath(URL.createObjectURL(e.target.files[0]))
    }


  }

  const ctx = api.useContext()
  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0])
      } else {

        toast.error("There was an error with your")
      }
    },
    onSuccess: () => {
      setValue("")
      ctx.posts.getAll.invalidate()
    }
  })

  const handleSubmit = () => mutate({ content: value, filePath })

  if (!user) {
    return null;
  }

  return (
    <div className="gap3 flex w-full">
      <Image
        width={16}
        height={16}
        className="flex h-16 w-16  rounded-full"
        src={user.profileImageUrl}
        alt=""
      />
      <input
        placeholder="Type some emojis"
        className="grow bg-transparent outline-none "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isPosting}
      />

      <input type="file" onChange={handleFileChange} />
      {value !== "" && <button disabled={isPosting} type="submit" onClick={handleSubmit}>Submit</button>}

    </div>
  );
};



const Home: NextPage = () => {
  const user = useUser();

  const { data } = api.posts.getAll.useQuery();

  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  return (
    <PageLayout>
      {!user.isSignedIn ? (
        <div className="flex justify-center">
          <SignInButton />
        </div>
      ) : (
        <div className="flex justify-center">
          <SignOutButton />
        </div>
      )}

      {!!user.isSignedIn && <CreatePostWizard />}
      <div className="flex flex-col">
        {data?.map((post) => (
          <PostView {...post} key={post.post.id} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Home;
