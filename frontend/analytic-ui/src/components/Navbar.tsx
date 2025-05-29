import { motion } from "framer-motion";
import { FaGraduationCap, FaChevronDown } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const [navHeight, setNavHeight] = useState(0);
    const navRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (navRef.current) {
            setNavHeight(navRef.current.offsetHeight);
        }
        const handleResize = () => {
            if (navRef.current) {
                setNavHeight(navRef.current.offsetHeight);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const goHome = () => {
        navigate("/");
    };

    return (
        <>
            <motion.nav
                ref={navRef}
                className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-60 backdrop-blur-md text-white p-4 flex justify-between items-center shadow-lg"
                initial={{ y: -50 }}
                animate={{ y: 0 }}
            >
                {/* Logo */}
                <div
                    className="flex items-center gap-2 text-xl font-bold cursor-pointer select-none"
                    onClick={goHome}
                >
                    <FaGraduationCap />
                    Insight Courses
                </div>

                {/* Nav Links */}
                <ul className="flex gap-8 text-sm md:text-base relative">
                    {/* Courses with Dropdown */}
                    <li
                        className="relative cursor-pointer hover:text-blue-300 flex items-center gap-1 select-none"
                        onMouseEnter={() => setIsCoursesOpen(true)}
                        onMouseLeave={() => setIsCoursesOpen(false)}
                        onClick={() => {
                            setIsCoursesOpen((prev) => !prev);
                            goHome();
                        }}
                    >
                        Courses <FaChevronDown className="text-xs" />
                        {isCoursesOpen && (
                            <ul className="absolute top-full left-0 mt-2 w-40 bg-gray-900 rounded-md shadow-lg text-white py-2 z-50">
                                <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer" onClick={goHome}>AI & Machine Learning</li>
                                <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer" onClick={goHome}>Web Development</li>
                                <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer" onClick={goHome}>Data Science</li>
                                <li className="px-4 py-2 hover:bg-blue-600 cursor-pointer" onClick={goHome}>Cybersecurity</li>
                            </ul>
                        )}
                    </li>
                    <li className="cursor-pointer hover:text-blue-300 select-none" onClick={goHome}>Pricing</li>
                    <li className="cursor-pointer hover:text-blue-300 select-none" onClick={goHome}>About</li>
                    <li className="cursor-pointer hover:text-blue-300 select-none" onClick={goHome}>Contact</li>
                </ul>
            </motion.nav>

            {/* Spacer div with dynamic height */}
            <div style={{ height: navHeight }} />
        </>
    );
}
