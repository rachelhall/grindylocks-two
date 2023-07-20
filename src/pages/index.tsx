import { type NextPage } from "next";
import Feed from "grindylocks/components/Feed";

const Home: NextPage = () => {
  return (
    <div style={{ display: 'flex', }}>
      <Feed />
    </div>
  );
};

export default Home;
