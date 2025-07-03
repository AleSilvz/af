import PrimaryButton from "../../components/button/primaryButton";
import "./style.css";

function SreenHome() {
  return (
    <>
      <div id="body_SreenHome">
        <img src="/girl.png" alt="Img" />
        <p>Tudo que você precisa, do seu jeitinho.</p>
        <div className="container-btn">
          <PrimaryButton to={"/login"}>Entrar</PrimaryButton>
          <PrimaryButton criar to={"/singup"}>
            Criar
          </PrimaryButton>
        </div>
      </div>
    </>
  );
}
export default SreenHome;
