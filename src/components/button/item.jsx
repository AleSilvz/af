function Item({ name, value, und, total,...props }) {

  return (
    <div className="item-item" {...props}>
      <div className="containerName">{name}</div>
      <div className="containerTotal">
        <p style={{ fontSize: "2rem", fontWeight: "600" }}>R${total.toFixed(2)}</p>
        <br />
        <p style={{ fontWeight: "300" }}>
          {und}UND R$ {value}
        </p>
      </div>
    </div>
  );
}

export default Item;
