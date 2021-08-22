const Button = ({ onClickHandler, label }) => {
  return <button onClick={onClickHandler}>{label}</button>;
};

export default Button;
