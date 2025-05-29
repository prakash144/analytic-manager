import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import aiImg from "../assets/ai-ml.png";
import webDevImg from "../assets/web-dev.png";
import cyberSecImg from "../assets/cybersecurity.png";
import courseBg from '../assets/course-bg.png';

type Course = {
    id: string;
    title: string;
    description: string;
    image: string;
};

const courses: Course[] = [
    {
        id: "ai-ml",
        title: "Artificial Intelligence & Machine Learning",
        description:
            "Master AI fundamentals, machine learning models, and neural networks with hands-on projects.",
        image: aiImg,
    },
    {
        id: "web-dev",
        title: "Full Stack Web Development",
        description:
            "Learn modern web development with React, Node.js, databases, and deployment strategies.",
        image: webDevImg,
    },
    {
        id: "cybersecurity",
        title: "Cybersecurity Essentials",
        description:
            "Understand cybersecurity principles, threats, and best practices to secure applications and networks.",
        image: cyberSecImg,
    },
];

// Typing effect hook for heading
function useTypingEffect(text: string, speed = 75) {
    const [displayedText, setDisplayedText] = useState("");
    useEffect(() => {
        let currentIndex = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(text.slice(0, currentIndex + 1));
            currentIndex++;
            if (currentIndex === text.length) clearInterval(intervalId);
        }, speed);
        return () => clearInterval(intervalId);
    }, [text, speed]);
    return displayedText;
}

const CoursePage: React.FC = () => {
    const navigate = useNavigate();
    const heading = "Master Artificial Intelligence: From Basics to Advanced";
    const typedHeading = useTypingEffect(heading, 50);

    const handleEnroll = (courseId: string) => {
        // Here you can trigger analytics event for click tracking
        // e.g., analytics.track("Enroll Click", { courseId });

        // Redirect to Payment Page with courseId as param or state
        navigate("/payment", { state: { courseId } });
    };

    return (
        <div
            className="relative min-h-screen bg-cover bg-center flex flex-col items-center justify-start py-24 px-6"
            style={{ backgroundImage: `url(${courseBg})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

            <div className="relative z-10 max-w-6xl w-full text-center text-white">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg min-h-[5rem] mb-12">
                    {typedHeading}
                    <span className="blinking-cursor">|</span>
                </h1>

                <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-300 font-light drop-shadow-md mb-16">
                    Dive deep into AI concepts like Machine Learning, Neural Networks, and Deep Learning. Hands-on projects and real-world case studies included!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courses.map(({ id, title, description, image }) => (
                        <motion.div
                            key={id}
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.5)" }}
                            className="bg-white bg-opacity-10 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md border border-white border-opacity-20"
                        >
                            <img
                                src={image}
                                alt={title}
                                className="rounded-md mb-5 object-cover h-40 w-full"
                                loading="lazy"
                            />
                            <div>
                                <h2 className="text-2xl font-semibold mb-3">{title}</h2>
                                <p className="text-gray-300 mb-6">{description}</p>
                            </div>
                            <button
                                onClick={() => handleEnroll(id)}
                                className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-6 py-3 transition shadow-lg"
                                aria-label={`Enroll in ${title}`}
                            >
                                Enroll Now
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CoursePage;
