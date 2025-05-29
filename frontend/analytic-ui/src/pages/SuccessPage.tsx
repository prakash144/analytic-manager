import React from "react";
import successImg from "../assets/success.png"; // Ensure the image exists in assets

const SuccessPage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 px-4 text-center">
            <img
                src={successImg}
                alt="Success"
                className="w-64 h-64 mb-8 animate-bounce" // Increased size
            />
            <h1 className="text-5xl md:text-6xl font-extrabold text-green-700 mb-4">
                Payment Successful!
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-6">
                🎉 Congratulations on enrolling!
            </p>
            <p className="text-lg text-gray-600">
                We've emailed your course details and receipt.
            </p>
        </div>
    );
};

export default SuccessPage;
