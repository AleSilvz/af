import { useState } from "react";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";
import "./style.css";

function StyleInput({
  check = false,
  onChange,
  value,
  placeholder,
  eye,
  ...props
}) {
  const [see, setSee] = useState(false);

  return (
    <div className="container-input">
      <input
  {...props}
  value={value}
  onChange={onChange}
  className="style-inputs"
  type="text"
  placeholder={placeholder}
  inputMode={eye ? (see ? "text" : "numeric") : "text"}
  pattern={eye && !see ? "[0-9]*" : undefined}
  maxLength={eye ? 6 : undefined}
  style={eye ? { WebkitTextSecurity: !see ? "disc" : "none" } : {}}
/>
      {check && <IoCheckmarkOutline className="eye" />}
      {eye &&
        (see ? (
          <IoEyeOffOutline className="eye" onClick={() => setSee(!see)} />
        ) : (
          <IoEyeOutline className="eye" onClick={() => setSee(!see)} />
        ))}
    </div>
  );
}

export default StyleInput;
