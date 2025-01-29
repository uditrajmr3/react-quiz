import { useQuestions } from "../../lib/hooks/useQuestions";

function Progress() {
  const { index, questions, points, answer } = useQuestions().state;
  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>

      <p>
        Question <strong>{index + 1}</strong> of <strong>{numQuestions}</strong>
      </p>

      <p>
        Points: <strong>{points}</strong> / <strong>{maxPossiblePoints}</strong>
      </p>
    </header>
  );
}

export default Progress;
