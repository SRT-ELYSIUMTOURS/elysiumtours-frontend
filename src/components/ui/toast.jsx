import React, { useState } from "react";
import ReactDOM from "react-dom";
import { classNames } from "../../utils/classNames";

const Toast = ({
  children,
  variant = "info",
  Heading,
  text,
  className = "",
  onCancel,
  ...props
}) => {
  const baseStyles =
    " bg-primary-light-default flex relative overflow-hidden flex-col gap-[5px] rounded-[15px] p-2 max-w-[490px]";
  const variants = {
    warning: {
      icon: "src/assets/Warning.svg",
      bg: "src/assets/Red-Error.svg",
    },
    error: {
      icon: "src/assets/Danger.svg",
      bg: "src/assets/Red-Error.svg",
    },
    info: {
      icon: "src/assets/Information.svg",
      bg: "src/assets/Blue-warning.svg",
    },
    success: {
      icon: "src/assets/checkmark.svg",
      bg: "src/assets/Blue-warning.svg",
    },
  };
  const sizes = {
    small: "text-med-small-semibold",
    medium: "text-md-semibold",
  };
  const disabledStyles = "bg-secondary-light-active text-primary-dark-darker";

  const toastContent = (
    <div
      className={classNames(baseStyles, variants[variant], className)}
      style={{ boxShadow: "0px 1px 5px 0px #27C84033" }}
      {...props}
    >
      <img
        className="absolute  right-0   "
        src="src\assets\toastBg.svg"
        alt=""
      />

      <img
        className="absolute -left-[34px]  -top-[17px] "
        src={variants[variant].bg}
        alt=""
      />
      <div className="flex z-10 flex-1 gap-[5px] py-2.5 items-center ">
        {variants[variant].icon && (
          <img
            src={variants[variant].icon}
            alt={`${variant} icon`}
            width="24"
            height="24"
          />
        )}
        <p className="flex-1 text-md-bold">{Heading}</p>
        <button className="cursor-pointer" onClick={onCancel}>
          {/* close button */}
          <img
            src="src/assets/XSquare.svg"
            width="20"
            height="20"
            alt="close icon"
          />
        </button>
      </div>
      <p className="text-tertiary-normal-default flex-1 p-2.5 text-med-small-regular">
        {text}
      </p>
    </div>
  );

  return ReactDOM.createPortal(
    toastContent,
    document.getElementById("toast-root")
  );
};

export default Toast;
