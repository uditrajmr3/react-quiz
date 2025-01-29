import { useEffect } from "react";
import { useQuestions } from "../../lib/hooks/useQuestions";

function Timer() {
  const { state, dispatch } = useQuestions();
  const { secondsRemaining } = state;

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;

  useEffect(
    function () {
      function tick() {
        dispatch({ type: "tick" });
      }

      const timer = setInterval(function () {
        tick();
      }, 1000);

      return function () {
        clearInterval(timer);
      };
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
