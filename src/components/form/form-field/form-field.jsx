import { createElement } from "react";

// Сделать филды как в contacts-app
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
