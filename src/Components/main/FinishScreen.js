function FinishScreen({ points, maxPoints, highscore, action }) {
  const percentage = (points / maxPoints) * 100;

  return (
    <>
      <p className="result">
        You scored {points} out of {maxPoints} points! ({Math.ceil(percentage)}
        %)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>

      <button className="btn btn-ui" onClick={action}>
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
