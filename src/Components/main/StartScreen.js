import { useQuestions } from "../../lib/hooks/useQuestions";

function StartScreen() {
  const { state, dispatch } = useQuestions();
  const { questions } = state;
  const numQuestions = questions.length;

  function startQuiz() {
    dispatch({ type: "start" });
  }

  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestions} questions to test your React Mastery</h3>
      <button className="btn htn-ui" onClick={startQuiz}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
