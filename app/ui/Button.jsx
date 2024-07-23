"use client";

import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = ({
  children,
  onClick,
  ripple,
  rippleCn,
  variant = "default",
  loading,
  loader,
  loaderText,
  rightIcon,
  leftIcon,
  className,
  ...props
}) => {
  const rippleEffect = (event) => {
    const button = event.currentTarget;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const x = event.clientX - button.getBoundingClientRect().left - radius;
    const y = event.clientY - button.getBoundingClientRect().top - radius;

    const circle = document.createElement("span");

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.transform = `scale(0)`;
    circle.className = cn(
      "ripple animate-ripple",
      "absolute rounded-full bg-white/40",
      variant !== "default" && "bg-blue-600",
      rippleCn
    );

    const ripple = button.getElementsByClassName("ripple")[0];

    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  const handleClick = (event) => {
    ripple && rippleEffect(event);
    onClick && onClick(event);
  };

  const variants = {
    default: "bg-blue-600 text-white hover:border-blue-500 active:bg-blue-700",
    outline:
      "border border-blue-600 hover:border-blue-400 hover:text-blue-400 active:border-blue-800 active:text-blue-800",
    light: "bg-blue-50 text-blue-600 hover:bg-blue-100 active:bg-blue-200",
    ghost: "hover:bg-blue-50 active:bg-blue-100",
    danger: "bg-red-600 text-white hover:border-red-500 active:bg-red-700",
    disabled: "bg-gray-100 text-gray-400 cursor-not-allowed",
  };

  const Loader = () => (
    <div className="flex gap-2 items-center">
      <div
        className={cn(
          "size-6 min-w-6 min-h-6",
          "m-auto rounded-full",
          "border-2 border-t-2",
          variant === "disabled"
            ? "border-white border-t-gray-400"
            : "border-white/25 border-t-white",
          "animate-spinner"
        )}
      />
      <p>{loaderText || "אנא המתן..."}</p>
    </div>
  );

  const GenerateChildren = () => {
    if (loading) {
      if (loader) return loader;
      else return <Loader />;
    } else return children;
  };

  return (
    <button
      disabled={variant === "disabled"}
      onClick={handleClick}
      {...props}
      className={cn(
        "relative overflow-hidden",
        "h-fit py-1.5 px-4",
        "flex gap-2 items-center",
        "text-blue-600 rounded-sm",
        "transition-all duration-300",
        !ripple && "active:bg-gray-50",
        variants[variant],
        className
      )}
    >
      {!loading && rightIcon}
      <GenerateChildren />
      {!loading && leftIcon}
    </button>
  );
};

export default Button;
