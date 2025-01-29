import { useQuestions } from "../../lib/hooks/useQuestions";

function NextButton() {
  const { state, dispatch } = useQuestions();
  const { questions, answer, index } = state;

  const numQuestions = questions.length;

  function nextQuestion() {
    if (index + 1 === numQuestions) {
      dispatch({ type: "finished" });
    } else {
      dispatch({ type: "nextQuestion" });
    }
  }

  if (answer === null) return null;

  return (
    <button className="btn btn-ui" onClick={nextQuestion}>
      {index + 1 === numQuestions ? "Finish" : "Next"}
    </button>
  );
}

export default NextButton;
