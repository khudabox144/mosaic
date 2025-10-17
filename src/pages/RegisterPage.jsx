import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import RegistrationLogo from "/public/assets/icons/registration.svg";
import RegistrationForm from "../components/auth/RegistrationForm";

const RegistrationPage = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0f0f10] via-[#1a1a1c] to-[#101214] py-8 px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-[1368px] w-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20"
            >
                {/* Left Section */}
                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
                >
                    <img
                        className="h-52 sm:h-60 lg:h-72 drop-shadow-lg"
                        src={RegistrationLogo}
                        alt="auth_illustration"
                    />
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-lime-400 to-green-500 text-transparent bg-clip-text">
                            Facehook
                        </h1>
                        <p className="mt-3 max-w-md text-gray-400/95 text-sm sm:text-base leading-relaxed">
                            Create your own social media platform — connect with
                            friends, share posts, explore reactions, and more!
                        </p>
                    </div>
                </motion.div>

                {/* Right Section (Form Card) */}
                <motion.div
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-full max-w-md bg-white/5 backdrop-blur-lg border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8"
                >
                    <RegistrationForm />

                    <div className="mt-6 text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?
                            <Link
                                to="/login"
                                className="ml-2 font-semibold text-lime-400 hover:text-lime-300 transition-all hover:underline"
                            >
                                Login
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
};

export default RegistrationPage;
