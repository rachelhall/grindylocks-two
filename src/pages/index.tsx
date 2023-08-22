import { type NextPage } from "next";
import Feed from "grindylocks/components/Feed";
import { redirect } from 'next/navigation'
import { useContext } from "react";
import { AccountContext } from "grindylocks/lib/context/accountContext";

const Home: NextPage = () => {

  const account = useContext(AccountContext)
  // if (!user) {
  //   redirect('/parks')
  // }

  return (
    <div style={{ display: 'flex', }}>
      <Feed />
    </div>
  );
};

export default Home;
