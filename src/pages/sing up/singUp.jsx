import { useEffect, useState } from "react";
import ButtonBack from "../../components/button/buttonBack";
import PrimaryButton from "../../components/button/primaryButton";
import ContainerInput from "../../components/input/containerInput";
import StyleInput from "../../components/input/styleInput";
import Title from "../../components/tittle/title";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, usersDb } from "../../../firebaseConfig";
import "./style.css";
import isEmail from "validator/lib/isEmail";
import { useNavigate } from "react-router-dom";

function ScreenSingUP() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState([]);
  const [isCreate, setIsCreate] = useState(false);

  const navigate = useNavigate();

  const hr = {
    width: "100px",
    height: "1px",
    background: "black",
    border: "none",
  };

  const checkIsEmail = isEmail(email);

  function validation() {
    const err = [];
    if (!nome) err.name = "Digite seu name!";
    if (!senha) err.senha = "Digite sua senha!";
    if (!email) err.email = "Digite seu email!";

    if (Object.keys(err).length > 0) {
      alert(Object.values(err).join("\n"));
    }

    setError(err);
    return Object.keys(err).length === 0;
  }

  async function clientExist() {
    try {
      const clients = collection(db, usersDb);
      const search = query(clients, where("name", "==", nome.toLowerCase()));
      const result = await getDocs(search);
      return !result.empty;
    } catch (err) {
      console.error(err);
    }
  }

  async function createAccount() {
    const err = validation();
    if (!err) return;
    const a = await clientExist();
    if (a) return alert("Usuário existente!");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.toLowerCase(),
        senha
      );
      const user = userCredential.user;
      const uid = user.uid;

      const docRef = doc(db, usersDb, uid);
      await setDoc(docRef, {
        name: nome.toLowerCase(),
        email: email.toLowerCase(),
      });

      setIsCreate(true);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (isCreate) {
      const timer = setTimeout(() => {
        navigate("/account");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCreate, navigate]);

  return (
    <div id="body_singup">
      <ButtonBack to={"/"} />
      <Title>
        <span>
          Bem-vindo
          <br />
          Crie sua conta!
        </span>
        <span>Digite seus dados abaixo.</span>
      </Title>
      <ContainerInput style={{ marginTop: "10%" }}>
        <StyleInput
          placeholder="Nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
        />
        <StyleInput
          placeholder="email@exemplo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          check={checkIsEmail}
        />
        <StyleInput
          placeholder="*********"
          eye
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
        />
      </ContainerInput>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "5px",
          marginBottom: "15%",
          marginTop: "15%",
        }}
      >
        <PrimaryButton style={{ width: "70%" }} onClick={() => createAccount()}>
          Criar
        </PrimaryButton>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <hr style={hr} /> OR <hr style={hr} />
        </div>
        <PrimaryButton width={"70%"} criar to={"/login"}>
          Entrar
        </PrimaryButton>
      </div>
    </div>
  );
}
export default ScreenSingUP;
