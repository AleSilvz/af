function ButtonMenu({ children, icon: Icon, ...props }) {
  return (
    <div className="item-menu">
      <button {...props} className="container-button-menu">{Icon}</button>
      {children}
    </div>
  );
}
export default ButtonMenu;
