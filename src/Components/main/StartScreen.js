function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestions} questions to test your React Mastery</h3>
      <button className="btn htn-ui" onClick={dispatch}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
