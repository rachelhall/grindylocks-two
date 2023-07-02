import { type NextPage } from "next";
import Feed from "grindylocks/components/Feed";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col">
      <Feed />
    </div>
  );
};

export default Home;
