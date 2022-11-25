import { createElement } from "react";

export const FormField = ({ tag = "input", error, ...otherProps }) => {
  const input = createElement(tag, {
    ...otherProps,
  });

  return (
    <div>
      {input}
      <p>{error}</p>
    </div>
  )
};
