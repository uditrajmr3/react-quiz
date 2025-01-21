import { useEffect, useReducer } from "react";

import Header from "./Components/Header";
import Main from "./Components/main/Main";
import Loader from "./Components/common/Loader";
import Error from "./Components/common/Error";
import StartScreen from "./Components/main/StartScreen";
import Question from "./Components/main/Question";
import Footer from "./Components/main/Footer";
import NextButton from "./Components/main/NextButton";
import Timer from "./Components/main/Timer";
import Progress from "./Components/main/Progress";
import FinishScreen from "./Components/main/FinishScreen";

const TIME_PER_QUESTION = 30;

function reducer(state, action) {
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
      throw new Error("Unknown action!!");
  }
}

function App() {
  // staus: ['loading', 'error', 'ready', 'active', 'finished']
  const initialState = {
    questions: [],
    status: "loading",
    error: "",
    index: 0,
    answer: null,
    points: 0,
    highscore: Number(localStorage.getItem("highscore")) || 0,
    secondsRemaining: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    error,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  function startQuiz() {
    dispatch({ type: "start" });
  }
  function selectAnswer(answerIndex) {
    dispatch({ type: "newAnswer", payload: answerIndex });
  }
  function nextQuestion() {
    if (index + 1 === numQuestions) {
      dispatch({ type: "finished" });
    } else {
      dispatch({ type: "nextQuestion" });
    }
  }
  function restartQuiz() {
    dispatch({ type: "reset" });
  }
  function tick() {
    dispatch({ type: "tick" });
  }

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed", payload: err.message });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <div className="App">
      <Header />

      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error err={error} />}

        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={startQuiz} />
        )}

        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPossiblePoints}
              answer={answer}
            />

            <Question
              question={questions[index]}
              dispatch={selectAnswer}
              answer={answer}
            />

            <Footer>
              <Timer timeRemaining={secondsRemaining} action={tick} />
              <NextButton action={nextQuestion} answer={answer}>
                {index + 1 === numQuestions ? "Finish" : "Next"}
              </NextButton>
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPossiblePoints}
            highscore={highscore}
            action={restartQuiz}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
