import React, { useState } from "react";
import Quiz from "./components/Quiz";
import QuizHistory from "./components/QuizHistory";
import Navbar from "./components/Navbar";
import { quizData } from "./data/quizData";

function App() {
    const [currentView, setCurrentView] = useState("quiz");

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar currentView={currentView} setCurrentView={setCurrentView} />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {currentView === "quiz" ? (
                    <Quiz questions={quizData} />
                ) : (
                    <QuizHistory />
                )}
            </main>
        </div>
    );
}

export default App;
