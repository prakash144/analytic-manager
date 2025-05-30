import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Course, courses } from "../data/courses"; // centralized data
import courseBg from '../assets/course-bg.png';
import { emitAnalyticsEvent } from "../utils/emitEvent";


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

    const handleEnroll = (course: Course) => {
        // Here you can trigger analytics event for click tracking
        // e.g., analytics.track("Enroll Click", { courseId });
        emitAnalyticsEvent({
            eventType: "COURSE_ENROLL_CLICK",
            userId: "user-123", // Replace with session/user ID if available
            course: {
                id: course.id,
                title: course.title,
                description: course.description,
            },
        });

        // Redirect to Payment Page with courseId as param or state
        navigate("/payment", { state: { courseId: course.id } });
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
                    Dive deep into AI concepts like Machine Learning, Neural Networks, and Deep Learning. Hands-on
                    projects and real-world case studies included!
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {courses.map((course) => (
                        <motion.div
                            key={course.id}
                            whileHover={{scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.5)"}}
                            className="bg-white bg-opacity-10 rounded-xl p-6 flex flex-col justify-between backdrop-blur-md border border-white border-opacity-20"
                        >
                            <img
                                src={course.image}
                                alt={course.title}
                                className="rounded-md mb-5 object-cover h-40 w-full"
                                loading="lazy"
                            />
                            <div>
                                <h2 className="text-2xl font-semibold mb-3">{course.title}</h2>
                                <p className="text-gray-300 mb-6">{course.description}</p>
                            </div>
                            <button
                                onClick={() => handleEnroll(course)} // ✅ Send specific course
                                className="mt-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-6 py-3 transition shadow-lg"
                                aria-label={`Enroll in ${course.title}`}
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
