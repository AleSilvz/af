import React from "react";
import './style.css'

function Title({ children }) {
  const [text, paragranf] = React.Children.toArray(children)

  return (
    <>
      <div id="body_title">
        <h1>{text}</h1>
        
        <p>{paragranf}</p>
      </div>
    </>
  );
}
export default Title;
