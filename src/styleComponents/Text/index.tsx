import clsx from "clsx";

import styles from "./Text.module.scss";

interface IProps {
  children?: JSX.Element | string | null;
  className?: string;
  color?: "black" | "dark" | "light" | "accent";
  fontSize?: "small" | "medium" | "large" | "huge";
  fontWeight?: "light" | "regular" | "bold";
  uppercase?: boolean;
  textAlign?: "left" | "center" | "right";
  verticalSpacing?: "small" | "large";
}

export const Text: React.FC<IProps> = ({
  children = "",
  className,
  color = "black",
  fontSize = "small",
  fontWeight = "regular",
  uppercase = false,
}) => {
  const mainClass = clsx(className, [styles.text]);
  return (
    <p
      className={mainClass}
      style={{
        fontSize:
          fontSize === "small"
            ? "1rem"
            : fontSize === "medium"
              ? "1.5rem"
              : fontSize === "large"
                ? "1.75rem"
                : fontSize === "huge"
                  ? "2.5rem"
                  : "unset",
        fontWeight:
          fontWeight === "light"
            ? "200"
            : fontWeight === "regular"
              ? "400"
              : fontWeight === "bold"
                ? "600"
                : "400",

        textTransform: uppercase ? "uppercase" : "unset",
        color:
          color === "light"
            ? "var(--light)"
            : color === "accent"
              ? "var(--pink)"
              : "var(--black)",
      }}
    >
      {children}
    </p>
  );
};

export default Text;
