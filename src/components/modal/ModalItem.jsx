import React, { useState } from "react";

function ModalItem({ isOpen, onClose, onSave }) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({ nome, valor });
    setNome("");
    setValor("");
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Adicionar Item</h3>
        <input
          type="text"
          placeholder="Nome do item"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          style={styles.input}
        />
        <div style={styles.buttons}>
          <button onClick={handleSave}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    background: "#fff",
    padding: 20,
    borderRadius: 8,
    width: 300,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default ModalItem;
