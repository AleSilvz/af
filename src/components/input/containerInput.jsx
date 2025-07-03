import './style.css'

function ContainerInput({ children, ...props }) {
  return (
    <>
      <div id='body_inputs' {...props}>
          {children}
      </div>
    </>
  );
}

export default ContainerInput;
