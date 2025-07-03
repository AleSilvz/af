import "./style.css";
import { goTo } from "../../utils/navigate";

function PrimaryButton({ width, to, criar = false, children, ...props }) {
  return (
    <>
      <button
        id="primary_button"
        style={{
          background: criar ? "var(--primary-color)" : "",
          color: criar ? "white" : "",
          fontWeight: criar ? "500" : "",
          width: `${width}`
        }}
        onClick={goTo(to)}
        {...props}
      >
        {children}
      </button>
    </>
  );
}
export default PrimaryButton;
