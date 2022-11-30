import { createElement } from "react";

export const FormField = ({ tag = "input", error, label, ...otherProps }) => {
  const input = createElement(tag, {
    ...otherProps,
  });

  return (
    <div>
      <div>
      <label htmlFor={otherProps.name}>{label}</label>
      </div>
      {input}
      <p>{error}</p>
    </div>
  )
};
