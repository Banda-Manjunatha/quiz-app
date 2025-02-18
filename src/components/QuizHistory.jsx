import React, { useState, useEffect } from "react";
import useIndexedDB from "../hooks/useIndexedDB";

const QuizHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getQuizHistory, isInitialized } = useIndexedDB();

    useEffect(() => {
        const fetchHistory = async () => {
            if (!isInitialized) {
                return; // Wait until the database is initialized
            }

            try {
                const data = await getQuizHistory();
                // Sort by timestamp, most recent first
                const sortedData = Array.isArray(data)
                    ? data.sort(
                          (a, b) =>
                              new Date(b.timestamp) - new Date(a.timestamp),
                      )
                    : [];
                setHistory(sortedData);
                setLoading(false);
            } catch (err) {
                setError(`Failed to load quiz history: ${err}`);
                console.error(err);
                setLoading(false);
            }
        };

        if (isInitialized) {
            fetchHistory();
        }
    }, [getQuizHistory, isInitialized]);

    // Format date to readable format
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
        }).format(date);
    };

    if (!isInitialized)
        return <div className="text-center py-8">Initializing database...</div>;
    if (loading)
        return <div className="text-center py-8">Loading history...</div>;
    if (error)
        return <div className="text-center py-8 text-red-600">{error}</div>;
    if (history.length === 0)
        return <div className="text-center py-8">No quiz attempts yet.</div>;

    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Quiz History</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Score
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Percentage
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Time Taken
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {history.map((item) => {
                            const correctAnswers = item.results.filter(
                                (r) => r.isCorrect,
                            ).length;
                            const percentage = Math.round(
                                (correctAnswers / item.results.length) * 100,
                            );

                            return (
                                <tr key={item.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {formatDate(item.timestamp)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {correctAnswers}/{item.results.length}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                percentage >= 70
                                                    ? "bg-green-100 text-green-800"
                                                    : percentage >= 40
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {percentage}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {Math.floor(item.timeTaken / 60)}m{" "}
                                        {item.timeTaken % 60}s
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuizHistory;
