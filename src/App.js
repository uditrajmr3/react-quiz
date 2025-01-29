import { useEffect } from "react";

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
import { useQuestions } from "./lib/hooks/useQuestions";

function App() {
  const { state, dispatch } = useQuestions();

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
