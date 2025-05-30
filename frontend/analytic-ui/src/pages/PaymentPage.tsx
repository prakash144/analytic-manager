// PaymentPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Assume this utility exists
import { emitAnalyticsEvent } from "../utils/emitEvent";
import { courseMap } from "../data/courses";

const PaymentPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const state = location.state as { courseId?: string } | undefined;
    const courseId = state?.courseId;
    const course = courseId ? courseMap[courseId] : undefined;

    const userId = "user-123"; // replace with dynamic user ID if available

    const handlePayment = () => {
        if (!courseId || !course) return;

        emitAnalyticsEvent({
            eventType: "PAYMENT_INITIATED",
            userId,
            course: {
                id: course.id,
                title: course.title,
                description: course.description,
            },
        });

        setTimeout(() => navigate("/success"), 1000);
    };

    if (!course) {
        return (
            <p className="text-center p-8 text-red-500 font-semibold">
                Course not found.
            </p>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-800 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Complete Your Payment
                </h2>
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
                    aria-label={`Pay for ${course.title}`}
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
