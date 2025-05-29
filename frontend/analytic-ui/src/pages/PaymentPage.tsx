// PaymentPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const courseData = {
    "ai-ml": {
        title: "Artificial Intelligence & Machine Learning",
        price: "$149",
        duration: "3 Months",
    },
    "web-dev": {
        title: "Full Stack Web Development",
        price: "$129",
        duration: "4 Months",
    },
    "cybersecurity": {
        title: "Cybersecurity Essentials",
        price: "$119",
        duration: "2 Months",
    },
};

const PaymentPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { courseId } = location.state || {};
    const course = courseData[courseId];

    const handlePayment = () => {
        // Send analytics event here
        // e.g., analytics.track("Payment Initiated", { courseId })

        // Simulate payment delay then redirect
        setTimeout(() => navigate("/success"), 1000);
    };

    if (!course) return <p className="text-center p-8">Course not found.</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Complete Your Payment</h2>
                <p className="text-gray-600 mb-6">
                    You're enrolling in <strong>{course.title}</strong>
                </p>

                <div className="mb-4">
                    <p className="text-sm text-gray-500">Course Duration:</p>
                    <p className="font-medium">{course.duration}</p>
                </div>

                <div className="mb-6">
                    <p className="text-sm text-gray-500">Price:</p>
                    <p className="text-xl font-bold text-green-600">{course.price}</p>
                </div>

                <button
                    onClick={handlePayment}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;