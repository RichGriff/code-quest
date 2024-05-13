"use client";

import { useState, useEffect } from "react";
import StatCard from "./StatCard";
import { Button } from "./ui/button";
import { BarChart, CloudFog, Crown, RefreshCcw } from "lucide-react";

import Prism from 'prismjs'
import "prismjs/themes/prism-okaidia.css"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-javascript"
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from '@sanity/image-url'
import Image from "next/image";

interface QuizProps {
  questions: {
    question: string
    description: string
    code: string
    image: any
    answers: string[]
    correctAnswer: string
  }[];
  category: string
  userId: string | undefined
}

const Quiz = ({ questions, userId, category }: QuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timeRemaining, setTimeRemaining] = useState(25);
  const [timerRunning, setTimerRunning] = useState(false);

  const { question, description, code, image, answers, correctAnswer } = questions[activeQuestion];

  // console.log(image)
  const builder = imageUrlBuilder(client)
  function urlFor(source: any) {
    return builder.image(source)
  }
  // const test = urlFor(image).width(200).url()
  // console.log(test)

  // useEffect(() => {
  //   let timer: NodeJS.Timeout;
  //   if (timerRunning && timeRemaining > 0) {
  //     timer = setTimeout(() => {
  //       setTimeRemaining((prevTime) => prevTime - 1);
  //     }, 1000);
  //   } else if (timeRemaining === 0) {
  //     handleTimeUp();
  //   }
  //   return () => clearTimeout(timer);
  // }, [timerRunning, timeRemaining]);

  // const startTimer = () => {
  //   setTimerRunning(true);
  // };

  // const stopTimer = () => {
  //   setTimerRunning(false);
  // };

  // const resetTimer = () => {
  //   setTimeRemaining(25);
  // };

  // const handleTimeUp = () => {
  //   stopTimer();
  //   resetTimer();
  //   nextQuestion();
  // };

  // useEffect(() => {
  //   startTimer();

  //   return () => {
  //     stopTimer();
  //   };
  // }, []);

  const onAnswerSelected = (
    answer: string,
    idx: number
  ) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(answer);
    } else {
      setSelectedAnswer("");
    }
  };

  const saveResults = async (results: any) => {
    console.log('My Results', results)

    fetch("/api/quizResults", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          quizScore: results.score,
          correctAnswers: results.correctAnswers,
          wrongAnswers: results.wrongAnswers,
          category
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not working fam"
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log(
            "Quiz results saved successfully:",
            data
          );
        })
        .catch((error) => {
          console.error(
            "Error saving quiz results:",
            error
          );
        });
  }

  const nextQuestion = () => {
    setSelectedAnswerIndex(null);

    // console.log('Prev Results', results)

    const newResults = {...results}

    if(selectedAnswer) {
      newResults.score = newResults.score + 5
      newResults.correctAnswers = newResults.correctAnswers + 1
    } else {
      newResults.wrongAnswers = newResults.wrongAnswers + 1
    }

    // console.log('New Results', newResults)
    setResults(newResults);

    // setResults((prev) =>
    //   selectedAnswer
    //     ? {
    //         ...prev,
    //         score: prev.score + 5,
    //         correctAnswers: prev.correctAnswers + 1,
    //       }
    //     : {
    //         ...prev,
    //         wrongAnswers: prev.wrongAnswers + 1,
    //       }
    // );

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
      // stopTimer(); // Stop the timer when showing the results
    }
    setChecked(false);
    // resetTimer();
  };

  useEffect(() => {
    if(showResults) {
      saveResults(results)
    }
  },[results, showResults])

  useEffect(() => {
    Prism.highlightAll()
  },[activeQuestion])

  return (
    <div className="min-h-[500px]">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
        {!showResults ? (
          <>
            <div className="flex justify-between mb-10 items-center">
              <div className="bg-indigo-500 text-white px-4 rounded-md py-1">
                <h2>
                  Question: {activeQuestion + 1}
                  <span>/{questions.length}</span>
                </h2>
              </div>

              {/* <div className="bg-primary text-white px-4 rounded-md py-1">
                {timeRemaining} seconds to answer
              </div> */}
            </div>

            <div className="flex flex-col justify-start items-start gap-4">
              <div>
                <h3 className="mb-2 text-2xl font-bold pr-6">
                  {question}
                </h3>
              </div>
              <div className="w-full flex flex-col md:flex-row-reverse justify-start items-start gap-2">
                {code && (
                  <div className="w-full">
                    <div className="h-full rounded-md">
                      <pre className="language-js md:min-h-[350px] rounded-md">
                        <code className="language-js">
                          {code}
                        </code>
                      </pre>
                    </div>
                  </div>
                )}
                {description && (
                  <div className="w-full">
                    <div className="h-full rounded-md bg-slate-50 py-4 px-6">
                      <p>
                        {description}
                      </p>  
                    </div>
                  </div>
                )}
                {image && (
                  <div className="w-full h-[350px] md-h-full">
                    <div className="h-full rounded-md bg-slate-50">
                      <div className="relative w-full h-full">
                      <Image
                        src={urlFor(image).url()}
                        alt={'Image'}
                        fill
                        className="object-cover rounded-md"
                      />
                      </div>
                      {/* <img src={urlFor(image).width(200).url()} /> */}
                    </div>
                  </div>
                )}
                <div className="w-full">
                  <ul className="w-full">
                    {answers.map(
                      (answer: string, idx: number) => (
                        <li
                          key={idx}
                          onClick={() =>
                            onAnswerSelected(answer, idx)
                          }
                          className={`cursor-pointer mb-5 py-3 rounded-md hover:bg-indigo-500 hover:text-white px-3
                          ${
                            selectedAnswerIndex === idx &&
                            "bg-indigo-600 text-white"
                          }
                          `}
                        >
                          <span>{answer}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={nextQuestion}
                disabled={!checked}
                className="font-bold bg-indigo-500 hover:bg-indigo-600"
              >
                {activeQuestion === questions.length - 1
                  ? "Finish"
                  : "Next Question →"}
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl uppercase mb-10">
              Results 📈
            </h3>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
              <StatCard
                title="Percentage"
                // value={`${(results.score / 50) * 100}%`}
                value={`${(results.correctAnswers / questions.length) * 100}%`}
              />
              <StatCard
                title="Total Questions"
                value={questions.length}
              />
              <StatCard
                title=" Total Score"
                value={results.score}
              />
              <StatCard
                title="Correct Answers"
                value={results.correctAnswers}
              />
              <StatCard
                title="Wrong Answers"
                value={results.wrongAnswers}
              />
            </div>
            {/* <Button
            variant={"ghost"}
              onClick={() => window.location.reload()}
              className="mt-10 font-bold uppercase"
            >
              <RefreshCcw className="w-4 h-4 mr-2"/>
              Restart Quiz
            </Button> */}
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
        )}
      </div>
    </div>
  );
};

export default Quiz;


// import { useState, useEffect } from "react";
// import StatCard from "./StatCard";

// interface QuizProps {
//   questions: {
//     question: string;
//     answers: string[];
//     correctAnswer: string;
//   }[];
//   userId: string | undefined;
// }

// const Quiz = ({ questions, userId }: QuizProps) => {
//   const [activeQuestion, setActiveQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState("");
//   const [checked, setChecked] = useState(false);
//   const [selectedAnswerIndex, setSelectedAnswerIndex] =
//     useState<number | null>(null);
//   const [showResults, setShowResults] = useState(false);
//   const [results, setResults] = useState({
//     score: 0,
//     correctAnswers: 0,
//     wrongAnswers: 0,
//   });
//   const [timeRemaining, setTimeRemaining] = useState(25);
//   const [timerRunning, setTimerRunning] = useState(false);

//   const { question, answers, correctAnswer } =
//     questions[activeQuestion];

//   useEffect(() => {
//     let timer: NodeJS.Timeout;
//     if (timerRunning && timeRemaining > 0) {
//       timer = setTimeout(() => {
//         setTimeRemaining((prevTime) => prevTime - 1);
//       }, 1000);
//     } else if (timeRemaining === 0) {
//       handleTimeUp();
//     }
//     return () => clearTimeout(timer);
//   }, [timerRunning, timeRemaining]);

//   const startTimer = () => {
//     setTimerRunning(true);
//   };

//   const stopTimer = () => {
//     setTimerRunning(false);
//   };

//   const resetTimer = () => {
//     setTimeRemaining(25);
//   };

//   const handleTimeUp = () => {
//     stopTimer();
//     resetTimer();
//     nextQuestion();
//   };

//   useEffect(() => {
//     startTimer();

//     return () => {
//       stopTimer();
//     };
//   }, []);

//   const onAnswerSelected = (
//     answer: string,
//     idx: number
//   ) => {
//     setChecked(true);
//     setSelectedAnswerIndex(idx);
//     if (answer === correctAnswer) {
//       setSelectedAnswer(answer);
//     } else {
//       setSelectedAnswer("");
//     }
//   };

//   const nextQuestion = () => {
//     setSelectedAnswerIndex(null);
//     setResults((prev) =>
//       selectedAnswer
//         ? {
//             ...prev,
//             score: prev.score + 5,
//             correctAnswers: prev.correctAnswers + 1,
//           }
//         : {
//             ...prev,
//             wrongAnswers: prev.wrongAnswers + 1,
//           }
//     );
//     if (activeQuestion !== questions.length - 1) {
//       setActiveQuestion((prev) => prev + 1);
//     } else {
//       setShowResults(true);
//       stopTimer();
//       fetch("/api/quizResults", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: userId,
//           quizScore: results.score,
//           correctAnswers: results.correctAnswers,
//           wrongAnswers: results.wrongAnswers,
//         }),
//       })
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(
//               "Network response was not working fam"
//             );
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log(
//             "Quiz results saved successfully:",
//             data
//           );
//         })
//         .catch((error) => {
//           console.error(
//             "Error saving quiz results:",
//             error
//           );
//         });
//     }
//     setChecked(false);
//     resetTimer();
//     startTimer();
//   };
//   return (
//     <div className="min-h-[500px]">
//       <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
//         {!showResults ? (
//           <>
//             <div className="flex justify-between mb-10 items-center">
//               <div className="bg-primary text-white px-4 rounded-md py-1">
//                 <h2>
//                   Question: {activeQuestion + 1}
//                   <span>/{questions.length}</span>
//                 </h2>
//               </div>

//               <div className="bg-primary text-white px-4 rounded-md py-1">
//                 {timeRemaining} seconds to answer
//               </div>
//             </div>

//             <div>
//               <h3 className="mb-5 text-2xl font-bold">
//                 {question}
//               </h3>
//               <ul>
//                 {answers.map(
//                   (answer: string, idx: number) => (
//                     <li
//                       key={idx}
//                       onClick={() =>
//                         onAnswerSelected(answer, idx)
//                       }
//                       className={`cursor-pointer mb-5 py-3 rounded-md hover:bg-primary hover:text-white px-3
//                       ${
//                         selectedAnswerIndex === idx &&
//                         "bg-primary text-white"
//                       }
//                       `}
//                     >
//                       <span>{answer}</span>
//                     </li>
//                   )
//                 )}
//               </ul>
//               <button
//                 onClick={nextQuestion}
//                 disabled={!checked}
//                 className="font-bold"
//               >
//                 {activeQuestion === questions.length - 1
//                   ? "Finish"
//                   : "Next Question →"}
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className="text-center">
//             <h3 className="text-2xl uppercase mb-10">
//               Results 📈
//             </h3>
//             <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
//               <StatCard
//                 title="Percentage"
//                 value={`${(results.score / 50) * 100}%`}
//               />
//               <StatCard
//                 title="Total Questions"
//                 value={questions.length}
//               />
//               <StatCard
//                 title=" Total Score"
//                 value={results.score}
//               />
//               <StatCard
//                 title="Correct Answers"
//                 value={results.correctAnswers}
//               />
//               <StatCard
//                 title="Wrong Answers"
//                 value={results.wrongAnswers}
//               />
//             </div>
//             <button
//               onClick={() => window.location.reload()}
//               className="mt-10 font-bold uppercase"
//             >
//               Restart Quiz
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Quiz;