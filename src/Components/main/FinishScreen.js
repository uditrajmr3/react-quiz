import { useQuestions } from "../../lib/hooks/useQuestions";

function FinishScreen() {
  const { state, dispatch } = useQuestions();
  const { points, highscore, questions } = state;

  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  const percentage = (points / maxPossiblePoints) * 100;

  function restartQuiz() {
    dispatch({ type: "reset" });
  }

  return (
    <>
      <p className="result">
        You scored {points} out of {maxPossiblePoints} points! (
        {Math.ceil(percentage)}
        %)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>

      <button className="btn btn-ui" onClick={restartQuiz}>
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
