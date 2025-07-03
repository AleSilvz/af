import ButtonBack from "../../components/button/buttonBack";
import { IoAddCircle, IoCloudDownload } from "react-icons/io5";
import "./style.css";
import Item from "../../components/button/item";
import { useEffect, useState } from "react";
import ModalItem from "../../components/modal/ModalItem";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db, usersDb } from "../../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

function Compras() {
  const [und, setUnd] = useState(1);
  const [modalAberto, setModalAberto] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [total, setTotal] = useState("");
  const [uid, setUid] = useState("");
  const [search, setSearch] = useState("");

  const searchResult = produtos.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const finalList = search ? searchResult : produtos;

  useEffect(() => {
    const on = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        await getItens(uid);
      }
    });

    return () => on;
  }, [produtos]);

  async function getItens(uid) {
    try {
      const docRef = collection(db, usersDb, uid, "buy");
      const dados = await getDocs(docRef);

      const itens = dados.docs.map((item) => ({
        name: item.id,
        und: item.data().und,
        value: item.data().value,
      }));
      const saldo = itens.reduce((acc, e) => acc + e.und * e.value, 0);
      setTotal(saldo.toFixed(2));
      setProdutos(itens);
    } catch (error) {
      console.error(error);
    }
  }

  const handleSalvarItem = async (item) => {
    const { nome, valor } = item;

    try {
      const docItem = doc(db, usersDb, uid, "buy", nome);
      await setDoc(docItem, {
        und: und,
        value: valor,
      });
    } catch (error) {
      console.error(error);
    }
  };

  async function increment(item) {
    try {
      const docUpdate = doc(db, usersDb, uid, "buy", item);
      const und = (await getDoc(docUpdate)).data().und;
      await updateDoc(docUpdate, {
        und: und + 1,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function decrement(item) {
    try {
      const docUpdate = doc(db, usersDb, uid, "buy", item);
      const und = (await getDoc(docUpdate)).data().und;
      if (und > 1) {
        await updateDoc(docUpdate, {
          und: und - 1,
        });
      } else if (und === 1) {
        deleteDoc(docUpdate);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function ArmazenarComrpas() {
    try {
      const backup = collection(db, usersDb, uid, "buy");
      const dados = await getDocs(backup);

      const compras = dados.docs.map((item) => ({
        name: item.id,
        und: item.data().und,
        value: item.data().value,
        subtotal: (item.data().und * item.data().value).toFixed(2),
      }));

      const docSave = collection(db, usersDb, uid, "latest");

      await addDoc(docSave, {
        compras,
      });

      for (const doc of dados.docs) {
        await deleteDoc(doc.ref);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div id="compras">
        <ButtonBack style={{ color: "black" }} to={"/account"} />
        <div style={{ height: "100px" }}></div>
        <input
          type="text"
          placeholder="Pesquisar"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{ marginBottom: "10px", padding: "8px", width: "100%" }}
        />
        <div className="container-item-compras">
          {finalList.map((i, index) => (
            <Item
              key={index}
              name={i.name}
              und={i.und}
              value={i.value}
              total={i.und * i.value}
              onDoubleClick={(event) => {
                const bounding = event.currentTarget.getBoundingClientRect();
                const click = event.clientX - bounding.left;
                const largura = bounding.width;

                if (click > largura / 2) {
                  increment(i.name);
                } else {
                  decrement(i.name);
                }
              }}
            />
          ))}
        </div>

        <ModalItem
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          onSave={handleSalvarItem}
        />

        <div className="btn-add">
          <IoCloudDownload onClick={() => ArmazenarComrpas()} />
          <div className="total">
            <p>Total</p>
            <h3>R$ {total}</h3>
          </div>
          <IoAddCircle onClick={() => setModalAberto(true)} />
        </div>
      </div>
    </>
  );
}

export default Compras;
