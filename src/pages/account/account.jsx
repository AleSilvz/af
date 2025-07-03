import { deleteUser, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, usersDb } from "../../../firebaseConfig";
import { IoEnterOutline } from "react-icons/io5";
import "./style.css";
import ButtonMenu from "../../components/button/buttonMenu";
import { optionMenu } from "./options";
import { useState } from "react";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SreenAccount() {
  const [nome, setNome] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      const docRef = doc(db, usersDb, currentUser.uid);
      const result = await getDoc(docRef);
      const data = result.data();
      setUser(currentUser);
      if (data?.name) {
        setNome(data.name);
      }
    }
  });

  async function exist() {
    await signOut(auth);
    navigate("/");
  }

  async function deleta() {
    if (!user) {
      alert("Nenhum usuário logado.");
      return;
    }

    try {
      const docRef = doc(db, usersDb, user.uid);
      await deleteDoc(docRef);
      await deleteUser(user);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div id="sreen_account">
        <div className="header">
          <div className="user-name">
            <p>Olá!</p>
            <h2>{nome ? nome.toUpperCase() : "Carregando..."}</h2>
          </div>
          <IoEnterOutline className="icon" onClick={() => exist()} />
        </div>

        <div className="saldo">
          <p>Saldo atual</p>
          <h1>R$ 0,00</h1>
        </div>

        <div className="container-account">
          <p>Menu</p>

          <div className="i">
            {optionMenu.map((e, index) => (
              <ButtonMenu
                key={index}
                icon={e.icon}
                onClick={() => navigate(e.page)}
              >
                {e.name}
              </ButtonMenu>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default SreenAccount;
