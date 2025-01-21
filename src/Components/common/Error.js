function Error({ err }) {
  return (
    <p className="error">
      <span>💥</span> There was an error fecthing questions:{" "}
      <strong className="red">
        <em>{err}</em>
      </strong>
    </p>
  );
}

export default Error;
