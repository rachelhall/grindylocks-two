import { IAccount } from "lib/types/account";

interface IProps {
  account: IAccount;
}

export const AccountListCard: React.FC<IProps> = ({ account }) => {
  return (
    <div className="accountListCard">
      <p>{account.name}</p>
      <p>{account.bio}</p>
      <p>{account.pronouns}</p>
    </div>
  );
};
