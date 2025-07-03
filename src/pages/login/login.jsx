import ButtonBack from "../../components/button/buttonBack";
import PrimaryButton from "../../components/button/primaryButton";
import ContainerInput from "../../components/input/containerInput";
import StyleInput from "../../components/input/styleInput";
import Title from "../../components/tittle/title";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import "./style.css";
import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db, usersDb } from "../../../firebaseConfig";
import { useNavigate } from "react-router-dom";

function Screenlogin() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState([]);

  const navigate = useNavigate();

  const style = {
    width: "70%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "2%",
    marginBottom: "10%",
  };

  const hr = {
    width: "100px",
    height: "1px",
    background: "black",
    border: "none",
  };

  function validation() {
    const err = [];
    if (!nome) err.name = "Digite seu nome!";
    if (!senha) err.senha = "Digite sua senha!";
    setError(err);
    err.name && alert(err.name);
    err.senha && alert(err.senha);
    return Object.keys(err).length === 0;
  }

  async function getClientEmail() {
    try {
      const clientDb = collection(db, usersDb);
      const search = query(clientDb, where("name", "==", nome.toLowerCase()));
      const result = await getDocs(search);

      if (!result.empty) {
        const client = result.docs[0];
        const email = client.data().email;
        return { email, found: true };
      } else {
        return { email: null, found: false, error: "Usuário não encontrado!" };
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function client_login() {
    const err = validation();
    if (!err) return;

    const result = await getClientEmail();

    if (!result || !result.found) {
      return alert(result?.error || "Erro ao buscar cliente!");
    }

    const { email } = await getClientEmail();

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/account");
    } catch (err) {
      alert('Senha incorreta!')
      console.error(err);
    }
  }

  return (
    <>
      <div id="sreen_login">
        <ButtonBack to={"/"} />
        <Title>
          <span>
            Bem-vindo
            <br />
            de volta!
          </span>
          <span>Faça login na sua conta.</span>
        </Title>
        <ContainerInput>
          <StyleInput
            placeholder="Nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
          />
          <StyleInput
            placeholder="*********"
            eye
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
          />
        </ContainerInput>
        <div style={style}>Esqueceu a senha?</div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "5px",
            marginBottom: "15%",
            marginTop: "5%",
          }}
        >
          <PrimaryButton
            style={{ width: "70%" }}
            onClick={() => client_login()}
          >
            Entrar
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
          <PrimaryButton width={"70%"} criar to={"/singup"}>
            Criar
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}
export default Screenlogin;
