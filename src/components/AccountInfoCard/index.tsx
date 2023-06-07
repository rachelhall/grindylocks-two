import * as account from "lib/types/account";

import { Avatar, Text } from "../../styleComponents";

import styles from "./AccountInfoCard.module.scss";

interface IProps {
  account: account.IAccount;
}

export const AccountInfoCard: React.FC<IProps> = ({ account }) => {
  return (
    <div className={styles.accountInfoCard}>
      <Avatar
        className={styles.avatar}
        name={account.name}
        src={account.avatar}
      />
      <div>
        <div className={styles.nameRow}>
          <Text fontWeight="bold">{account.name}</Text>
          <Text fontWeight="light">{account.pronouns}</Text>
        </div>
        <Text>{account.bio}</Text>
      </div>
    </div>
  );
};
