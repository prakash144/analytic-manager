import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CoursePage from "./pages/CoursePage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import './App.css';

function App() {
    return (
        <Router>
            <Navbar />
            {/* Remove fixed padding, rely on Navbar spacer instead */}
            <div>
                <Routes>
                    <Route path="/" element={<CoursePage />} />
                    <Route path="/payment" element={<PaymentPage />} />
                    <Route path="/success" element={<SuccessPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
