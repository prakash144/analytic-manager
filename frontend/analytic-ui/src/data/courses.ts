import aiImg from "../assets/ai-ml.png";
import webDevImg from "../assets/web-dev.png";
import cyberSecImg from "../assets/cybersecurity.png";

export type Course = {
    id: string;
    title: string;
    description: string;
    image: string;
    price: string;
    duration: string;
};

export const courses: Course[] = [
    {
        id: "ai-ml",
        title: "Artificial Intelligence & Machine Learning",
        description:
            "Master AI fundamentals, machine learning models, and neural networks with hands-on projects.",
        image: aiImg,
        price: "$149",
        duration: "3 Months",
    },
    {
        id: "web-dev",
        title: "Full Stack Web Development",
        description:
            "Learn modern web development with React, Node.js, databases, and deployment strategies.",
        image: webDevImg,
        price: "$129",
        duration: "4 Months",
    },
    {
        id: "cybersecurity",
        title: "Cybersecurity Essentials",
        description:
            "Understand cybersecurity principles, threats, and best practices to secure applications and networks.",
        image: cyberSecImg,
        price: "$119",
        duration: "2 Months",
    },
];

export const courseMap = courses.reduce((acc, course) => {
    acc[course.id] = course;
    return acc;
}, {} as Record<string, Course>);
