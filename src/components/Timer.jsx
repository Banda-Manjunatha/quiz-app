import { useState, useEffect } from "react";

const Timer = ({ seconds, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(seconds);

    useEffect(() => {
        if (timeLeft <= 0) {
            onTimeUp();
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, onTimeUp]);

    useEffect(() => {
        setTimeLeft(seconds);
    }, [seconds]);

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    // Calculate percentage for progress bar
    const percentage = (timeLeft / seconds) * 100;

    return (
        <div className="w-full mb-4">
            <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">
                    Time left
                </span>
                <span className="text-sm font-medium text-gray-700">
                    {formatTime()}
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className={`h-2.5 rounded-full ${
                        percentage <= 25
                            ? "bg-red-500"
                            : percentage <= 50
                            ? "bg-yellow-500"
                            : "bg-green-500"
                    }`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default Timer;
