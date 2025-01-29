import { useEffect, useReducer } from "react";
import { QuestionsContext } from "../hooks/useQuestions";
import { reducer } from "../hooks/questionsReducer";

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

export function QuestionsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
    function () {
      async function fetchQuestions() {
        try {
          const res = await fetch("http://localhost:9000/questions");
          const data = await res.json();
          dispatch({ type: "dataRecieved", payload: data });
        } catch (err) {
          dispatch({ type: "dataFailed", payload: err.message });
        }
      }
      fetchQuestions();
    },
    [dispatch]
  );

  return (
    <QuestionsContext.Provider value={{ state, dispatch }}>
      {children}
    </QuestionsContext.Provider>
  );
}
