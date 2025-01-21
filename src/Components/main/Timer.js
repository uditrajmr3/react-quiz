import { useEffect } from "react";

function Timer({ timeRemaining, action }) {
  const mins = Math.floor(timeRemaining / 60);
  const secs = timeRemaining % 60;

  useEffect(
    function () {
      const timer = setInterval(function () {
        action();
      }, 1000);

      return function () {
        clearInterval(timer);
      };
    },
    [action]
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
