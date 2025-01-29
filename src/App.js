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
  const { state } = useQuestions();
  const { status } = state;

  return (
    <div className="App">
      <Header />

      <Main>
        {status === "loading" && <Loader />}

        {status === "error" && <Error />}

        {status === "ready" && <StartScreen />}

        {status === "active" && (
          <>
            <Progress />

            <Question />

            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}

        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
