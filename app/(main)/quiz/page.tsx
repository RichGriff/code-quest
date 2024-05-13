import Quiz from "@/components/Quiz";
import { client } from "@/sanity/lib/client";
import { fetchUsers } from "@/actions/fetchUsers";
import { checkCategoryCompletion, getCategory, getQuestions } from "@/actions/fetchQuestions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BarChart, Crown } from "lucide-react";

export const dynamic = "force-dynamic";

// async function getData() {
//   const query = `*[_type == "questions"]{
//     question,
//     answers,
//     correctAnswer
//   }`;

//   const data = await client.fetch(query);

//   return data;
// }

const QuizPage = async () => {
  const category = await getCategory()
  const questions = await getQuestions(category._id);
  const user = await fetchUsers();
  const userId = user?.data.user.id;

  let completedCategory = false
  const clerkUser = await currentUser()

  if(category) {
    completedCategory = user ? await checkCategoryCompletion(clerkUser?.id, category._id) : false
  }

  return (
    <div className="min-h-screen mt-16">
      {completedCategory ? (
          <div className="px-4 md:px-6 max-w-[1500px] mx-auto w-[90%]">
            <div className="flex justify-center items-center">
              <h1 className="text-5xl font-bold tracking-tighter text-dark text-center">
                Sneaky! You have already completed<br/> the <span className="text-indigo-500">{category.category}</span> quiz!
              </h1>
            </div>
            <div className="flex justify-center items-center mt-16 gap-2">
              <Link href={'/leaderboard'} className="py-2 px-4 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-900 flex justify-center items-center">
                <Crown className="w-4 h-4 mr-2"/>
                Leaderboard
              </Link>
              <Link href={'/stats'} className="py-2 px-4 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-900 flex justify-center items-center">
                <BarChart className="w-4 h-4 mr-2"/>
                My Results
              </Link>
            </div>
          </div>
      ) : (
        <Quiz questions={questions} category={category} userId={userId} />
      )}
      
    </div>
  );
};

export default QuizPage;