import { IoChevronBackOutline } from "react-icons/io5";
import { goTo } from "../../utils/navigate";

function ButtonBack({ to, ...props }) {
  return (
    <>
      <div id="button_back">
        <IoChevronBackOutline {...props} className="back" onClick={goTo(to)} />
      </div>
    </>
  );
}
export default ButtonBack;
