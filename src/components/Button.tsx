import { BUTTON_TYPE } from "../util/constants";

import "./Button.css";

type ButtonProps = {
  type: keyof typeof BUTTON_TYPE;
  onClick: () => void;
};

const Button = ({ type, onClick }: ButtonProps) => {
  const config = BUTTON_TYPE[type];

  return (
    <button className={`button ${config.className}`} onClick={onClick}>
      {config.text}
    </button>
  );
};

export default Button;
