import React, { useState, useEffect, useRef } from "react";
import Timer from "./Timer";

const Question = ({ question, onAnswer, timeLimit, showFeedback }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [textAnswer, setTextAnswer] = useState("");
    const [isAnswered, setIsAnswered] = useState(false);
    const [feedback, setFeedback] = useState({ isCorrect: false, message: "" });
    const textInputRef = useRef(null);

    const isTextInput = question.options.length === 0;

    // Reset state for new question
    useEffect(() => {
        setSelectedOption(null);
        setTextAnswer("");
        setIsAnswered(false);
        setFeedback({ isCorrect: false, message: "" });

        // Auto-focus the text input if it's a text input question
        if (isTextInput && textInputRef.current) {
            setTimeout(() => textInputRef.current.focus(), 100);
        }
    }, [question, isTextInput]);

    const handleOptionSelect = (option) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        const isCorrect = option === question.correctAnswer;
        setFeedback({
            isCorrect,
            message: isCorrect
                ? "Correct!"
                : `Incorrect. The correct answer is: ${question.correctAnswer}`,
        });

        onAnswer({
            questionId: question.id,
            isCorrect,
            selectedOption: option,
        });
    };

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (isAnswered || !textAnswer.trim()) return;

        setIsAnswered(true);

        // Compare trimmed, case-insensitive answers
        const userAnswer = textAnswer.trim().toLowerCase();
        const correctAnswerText = question.correctAnswer.trim().toLowerCase();
        const isCorrect = userAnswer === correctAnswerText;

        setFeedback({
            isCorrect,
            message: isCorrect
                ? "Correct!"
                : `Incorrect. The correct answer is: ${question.correctAnswer}`,
        });

        onAnswer({
            questionId: question.id,
            isCorrect,
            selectedOption: textAnswer,
        });
    };

    const handleTimeUp = () => {
        if (!isAnswered) {
            setIsAnswered(true);
            setFeedback({
                isCorrect: false,
                message: `Time's up! The correct answer is: ${question.correctAnswer}`,
            });

            onAnswer({
                questionId: question.id,
                isCorrect: false,
                selectedOption: isTextInput ? textAnswer : null,
                timedOut: true,
            });
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <Timer seconds={timeLimit} onTimeUp={handleTimeUp} />

            <h2 className="text-xl font-semibold mb-4">{question.question}</h2>

            {isTextInput ? (
                <form onSubmit={handleTextSubmit} className="mb-4">
                    <div className="flex flex-col md:flex-row gap-2">
                        <input
                            ref={textInputRef}
                            type="text"
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            disabled={isAnswered}
                            placeholder="Type your answer here"
                            className={`flex-grow p-3 border rounded-md outline-none transition-colors
                ${
                    isAnswered
                        ? feedback.isCorrect
                            ? "bg-green-50 border-green-500"
                            : "bg-red-50 border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                }`}
                        />
                        <button
                            type="submit"
                            disabled={isAnswered || !textAnswer.trim()}
                            className={`px-6 py-3 rounded-md transition-colors
                ${
                    isAnswered
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : !textAnswer.trim()
                        ? "bg-blue-300 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-3">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            disabled={isAnswered}
                            className={`w-full p-3 text-left rounded-md transition-colors 
                ${
                    isAnswered && option === question.correctAnswer
                        ? "bg-green-100 border-green-500 border"
                        : isAnswered &&
                          option === selectedOption &&
                          option !== question.correctAnswer
                        ? "bg-red-100 border-red-500 border"
                        : isAnswered
                        ? "bg-gray-100 border border-gray-300 opacity-80"
                        : "bg-gray-50 border border-gray-300 hover:bg-gray-100"
                }`}
                        >
                            <div className="flex items-center">
                                <span className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300 mr-3">
                                    {option.split(".")[0]}{" "}
                                    {/* Extract letter from option */}
                                </span>
                                {option.split(".").slice(1).join(".")}{" "}
                                {/* Extract rest of the text */}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {showFeedback && isAnswered && (
                <div
                    className={`mt-4 p-3 rounded-md ${
                        feedback.isCorrect
                            ? "bg-green-50 text-green-800"
                            : "bg-red-50 text-red-800"
                    }`}
                >
                    <p className="font-medium">{feedback.message}</p>
                    {question.explanation && (
                        <p className="mt-2 text-gray-700">
                            {question.explanation}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Question;
