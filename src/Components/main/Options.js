function Options({ options, correctAnswer, action, answer }) {
  const hasAnswered = answer !== null;

  function selectAnswer(answerIndex) {
    action(answerIndex);
  }

  return (
    <div className="options">
      {options?.map((option, index) => (
        <button
          key={option}
          disabled={hasAnswered}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered ? (index === correctAnswer ? "correct" : "wrong") : ""
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
