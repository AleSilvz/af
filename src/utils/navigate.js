import { useNavigate } from "react-router-dom";

function goTo(to) {
  const navigate = useNavigate();
  return () => navigate(to);
}

export { goTo };
