import Options from "./Options";

function Question({ question, dispatch, answer }) {
  return (
    <div>
      <h4>{question.question}</h4>

      <Options
        options={question?.options}
        action={dispatch}
        answer={answer}
        correctAnswer={question.correctOption}
      />
    </div>
  );
}

export default Question;
