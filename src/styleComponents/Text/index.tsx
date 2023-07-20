import clsx from "clsx";

import styles from "./Text.module.scss";

interface IProps {
  children?: JSX.Element | string | null;
  className?: string;
  color?: "black" | "dark" | "light" | "accent";
  fontSize?: "small" | "medium" | "large" | "huge";
  fontWeight?: "light" | "regular" | "bold";
  hover?: "black" | "dark" | "light" | "accent";
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
  hover,
  uppercase = false,
  textAlign = "left",
}) => {
  const mainClass = clsx(
    className,
    [styles.text],
    hover === "accent" && styles.hoverpink
  );
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
        textAlign,
      }}
    >
      {children}
    </p>
  );
};

export default Text;
