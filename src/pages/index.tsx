import { type NextPage } from "next";
import Image from "next/image";
import { api, } from "grindylocks/utils/api";
import { SignInButton, SignOutButton, useUser } from "@clerk/clerk-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import toast from "react-hot-toast";
import { PostView } from "grindylocks/components/PostView";


dayjs.extend(relativeTime);

const CreatePostWizard = () => {
  const { user } = useUser();
  const { data } = api.parks.getAll.useQuery()

  const [value, setValue] = useState("");
  const [file, setFile] = useState<File>()
  const [selectedPark, setSelectedPark] = useState<string>()


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files[0]) {
      setFile(e.target.files[0])
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

  const handleSelectPark = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPark(e.target.value)
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {

    try {
      e.preventDefault();
      const formData = new FormData();
      if (!file) throw new Error("no file selected")

      formData.append('file', file);

      const res = await fetch('/api/uploadMedia', {
        method: 'POST',
        body: formData,
      });

      const { filePath } = await res.json();
      if (selectedPark) {
        mutate({ content: value, filePath, parkId: selectedPark })
      }
    } catch (error) {
      console.error(error);
    }
  }

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
        placeholder="Tell us about your skate"
        className="grow bg-transparent outline-none "
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isPosting}
      />

      <input type="file" onChange={handleFileChange} />
      {data &&
        <select value={selectedPark} onChange={handleSelectPark}>
          {data?.map(park => <option key={park.id} value={park.id}>{park.name}</option>)}
        </select>
      }
      {value !== "" && <button disabled={isPosting} type="submit" onClick={handleSubmit}>Submit</button>}

    </div>
  );
};



const Home: NextPage = () => {
  const user = useUser();

  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      {data?.map((post) => (
        <PostView {...post} key={post.post.id} />
      ))}
    </div>
  );
};

export default Home;
