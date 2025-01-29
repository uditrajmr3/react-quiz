function NextButton({ action, answer, children }) {
  if (answer === null) return null;

  return (
    <button className="btn btn-ui" onClick={action}>
      {children}
    </button>
  );
}

export default NextButton;
