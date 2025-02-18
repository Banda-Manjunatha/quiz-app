import React, { useState, useEffect } from "react";
import Question from "./Question";
import Results from "./Results";
import useIndexedDB from "../hooks/useIndexedDB";

const Quiz = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [startTime, setStartTime] = useState(null);
    const [totalTimeTaken, setTotalTimeTaken] = useState(0);
    const { saveQuizResult, isInitialized } = useIndexedDB();

    // Start timer when quiz begins
    useEffect(() => {
        if (!startTime && !quizCompleted) {
            setStartTime(Date.now());
        }
    }, [startTime, quizCompleted]);

    const handleAnswer = (answer) => {
        setAnswers((prev) => [...prev, answer]);

        if (currentQuestionIndex < questions.length - 1) {
            // Move to next question after a brief delay to show feedback
            setTimeout(() => {
                setCurrentQuestionIndex((prev) => prev + 1);
            }, 1500);
        } else {
            // Calculate total time taken
            const endTime = Date.now();
            const timeInSeconds = Math.floor((endTime - startTime) / 1000);
            setTotalTimeTaken(timeInSeconds);

            // End the quiz
            setTimeout(() => {
                setQuizCompleted(true);

                if (isInitialized) {
                    // Saving results to IndexedDB
                    const results = {
                        results: answers.concat([answer]),
                        timeTaken: timeInSeconds,
                    };
                    saveQuizResult(results).catch((err) =>
                        console.error("Failed to save results:", err),
                    );
                } else {
                    console.error(
                        "IndexedDB not initialized, cannot save results",
                    );
                }
            }, 1500);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setQuizCompleted(false);
        setStartTime(Date.now());
        setTotalTimeTaken(0);
    };

    if (quizCompleted) {
        return (
            <Results
                results={answers}
                totalQuestions={questions.length}
                timeTaken={totalTimeTaken}
                onRestart={restartQuiz}
            />
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-4 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-gray-600">
                    {answers.filter((a) => a.isCorrect).length} correct
                </span>
            </div>

            <Question
                key={currentQuestionIndex}
                question={questions[currentQuestionIndex]}
                onAnswer={handleAnswer}
                timeLimit={30}
                showFeedback={true}
            />

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{
                        width: `${
                            ((currentQuestionIndex + 1) / questions.length) *
                            100
                        }%`,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default Quiz;
