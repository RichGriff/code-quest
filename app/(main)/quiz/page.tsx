import Quiz from "@/components/Quiz";
import { client } from "@/sanity/lib/client";
import { fetchUsers } from "@/actions/fetchUsers";

export const dynamic = "force-dynamic";

async function getData() {
  const query = `*[_type == "questions"]{
    question,
    answers,
    correctAnswer
  }`;

  const data = await client.fetch(query);

  return data;
}

const QuizPage = async () => {
  const questions = await getData();
  const user = await fetchUsers();
  const userId = user?.data.user.id;
  return (
    <div className="min-h-screen mt-16">
      <Quiz questions={questions} userId={userId} />
    </div>
  );
};

export default QuizPage;