import { AccountListCard } from "components/AccountListCard";
import { IAccount } from "lib/types/account";

interface IProps {
  accounts: IAccount[];
}

export const AccountList: React.FC<IProps> = ({ accounts }) => {
  return (
    <div>
      {accounts.map((account) => (
        <AccountListCard key={account.id} account={account} />
      ))}
    </div>
  );
};
