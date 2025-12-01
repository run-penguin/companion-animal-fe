import { BUTTON_TYPE } from "../util/constants";

import "./Button.css";

type ButtonProps = {
  type: keyof typeof BUTTON_TYPE;
  isText: boolean;
  onClick: () => void;
};

const Button = ({ type, isText, onClick }: ButtonProps) => {
  const config = BUTTON_TYPE[type];

  return (
    <button className={`button ${config.className}`} onClick={onClick}>
      <span>{isText ? config.text : ""}</span>
    </button>
  );
};

export default Button;
