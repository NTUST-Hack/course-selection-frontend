import { useState } from "react";

interface Props {
  children?: string;
}

const SecretHider = ({ children }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const style = {
    filter: isHover ? "blur(0)" : "blur(4px)",
    transition: "filter 100ms linear",
  };
  return (
    <span
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );
};

export default SecretHider;
