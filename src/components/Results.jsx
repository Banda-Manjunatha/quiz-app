import React from "react";

const Results = ({ results, totalQuestions, timeTaken, onRestart }) => {
    const correctAnswers = results.filter((r) => r.isCorrect).length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);

    // Format total time taken
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-6">
                Quiz Results
            </h2>

            <div className="flex flex-col md:flex-row justify-between mb-8">
                <div className="text-center mb-4 md:mb-0">
                    <p className="text-gray-500 text-sm">Score</p>
                    <p className="text-3xl font-bold">
                        {correctAnswers}/{totalQuestions}
                    </p>
                </div>
                <div className="text-center mb-4 md:mb-0">
                    <p className="text-gray-500 text-sm">Percentage</p>
                    <p className="text-3xl font-bold">{percentage}%</p>
                </div>
                <div className="text-center">
                    <p className="text-gray-500 text-sm">Time Taken</p>
                    <p className="text-3xl font-bold">
                        {formatTime(timeTaken)}
                    </p>
                </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                <div
                    className={`h-4 rounded-full ${
                        percentage >= 70
                            ? "bg-green-500"
                            : percentage >= 40
                            ? "bg-yellow-500"
                            : "bg-red-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Question Breakdown</h3>
            <div className="space-y-3 mb-8">
                {results.map((result, index) => (
                    <div
                        key={index}
                        className="flex items-center p-3 border rounded-lg"
                    >
                        <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full mr-3 ${
                                result.isCorrect
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                        >
                            {result.isCorrect ? "✓" : "✗"}
                        </div>
                        <div className="flex-1">
                            <p className="font-medium">Question {index + 1}</p>
                            {result.timedOut ? (
                                <p className="text-sm text-red-600">
                                    Time's up
                                </p>
                            ) : (
                                <p className="text-sm text-gray-600">
                                    {result.selectedOption
                                        ? `Your answer: ${result.selectedOption}`
                                        : "Not answered"}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    onClick={onRestart}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Take Quiz Again
                </button>
            </div>
        </div>
    );
};

export default Results;
