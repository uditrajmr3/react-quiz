import { useQuestions } from "../../lib/hooks/useQuestions";

function Options() {
  const { state, dispatch } = useQuestions();
  const { answer, questions, index } = state;
  const { options, correctOption } = questions.at(index);
  const hasAnswered = answer !== null;

  function selectAnswer(answerIndex) {
    console.log(answerIndex, options, correctOption);
    dispatch({ type: "newAnswer", payload: answerIndex });
  }

  return (
    <div className="options">
      {options?.map((option, index) => (
        <button
          key={option}
          disabled={hasAnswered}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""
          }`}
          onClick={() => selectAnswer(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
