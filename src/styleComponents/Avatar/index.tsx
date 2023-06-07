import Image from "next/image";

import styles from "./Avatar.module.scss";
interface IProps {
  src?: string;
  name?: string;
  className?: string;
}
export const Avatar: React.FC<IProps> = ({ className, name, src }) => {
  return (
    <div className={`${styles.avatar} ${className}`}>
      <Image
        alt={`picture of ${name}`}
        src={src ?? ""}
        height="100"
        width="100"
        objectFit="cover"
      />
    </div>
  );
};
