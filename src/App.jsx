import { useEffect, useState } from "react";
import "./App.css";
import SreenHome from "./pages/home/home";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import SreenAccount from "./pages/account/account";

function App() {
  const [loading, setLoading] = useState(true);
  const [on, setOn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    user && setOn(true);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div id="body_app">
          <h1>AF</h1>
        </div>
      ) : on ? (
        <SreenAccount />
      ) : (
        <SreenHome />
      )}
    </>
  );
}

export default App;
