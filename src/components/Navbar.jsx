import React, { useState } from "react";

const Navbar = ({ currentView, setCurrentView }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm mb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <h1 className="text-xl font-bold text-blue-600">
                                QuizMaster
                            </h1>
                        </div>
                    </div>
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <div className="hidden sm:flex sm:space-x-8">
                            <button
                                onClick={() => setCurrentView("quiz")}
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                    currentView === "quiz"
                                        ? "border-blue-500 text-gray-900"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`}
                            >
                                Take Quiz
                            </button>
                            <button
                                onClick={() => setCurrentView("history")}
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                                    currentView === "history"
                                        ? "border-blue-500 text-gray-900"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`}
                            >
                                History
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Icon when menu is closed */}
                            <svg
                                className={`${
                                    isMobileMenuOpen ? "hidden" : "block"
                                } h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                            {/* Icon when menu is open */}
                            <svg
                                className={`${
                                    isMobileMenuOpen ? "block" : "hidden"
                                } h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`}
            >
                <div className="pt-2 pb-3 space-y-1">
                    <button
                        onClick={() => {
                            setCurrentView("quiz");
                            setIsMobileMenuOpen(false);
                        }}
                        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left ${
                            currentView === "quiz"
                                ? "bg-blue-50 border-blue-500 text-blue-700"
                                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                        }`}
                    >
                        Take Quiz
                    </button>
                    <button
                        onClick={() => {
                            setCurrentView("history");
                            setIsMobileMenuOpen(false);
                        }}
                        className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left ${
                            currentView === "history"
                                ? "bg-blue-50 border-blue-500 text-blue-700"
                                : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                        }`}
                    >
                        History
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
