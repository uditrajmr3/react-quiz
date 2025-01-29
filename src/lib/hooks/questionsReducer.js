const TIME_PER_QUESTION = 30;

export function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error", error: action.payload };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * TIME_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      const isCorrectAnswer = action.payload === question.correctOption;
      return {
        ...state,
        answer: action.payload,
        points: isCorrectAnswer ? state.points + question.points : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      const highscore = Math.max(state.points, state.highscore);
      if (highscore > state.highscore)
        localStorage.setItem("highscore", highscore);
      return { ...state, status: "finished", highscore: highscore };
    case "reset":
      return { ...state, status: "ready", index: 0, answer: null, points: 0 };
    case "tick":
      const newSecondsRemaining = state.secondsRemaining - 1;
      return {
        ...state,
        secondsRemaining: newSecondsRemaining,
        status: newSecondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      console.log(action.type);
      throw new Error("Unknown action!!");
  }
}
