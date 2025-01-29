import { useQuestions } from "../../lib/hooks/useQuestions";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuestions().state;
  const question = questions.at(index);

  return (
    <div>
      <h4>{question.question}</h4>

      <Options />
    </div>
  );
}

export default Question;
