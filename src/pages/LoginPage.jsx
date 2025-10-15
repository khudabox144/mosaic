import React from 'react';
import Loginform from "../components/auth/Loginform";
import AuthIllustration from "/public/assets/images/auth_illustration.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LoginPage = () => {

    const contentVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-deepDark py-8 px-4">
            <div className="max-w-[1368px] flex-1">
                <div className="container grid items-center gap-12 lg:grid-cols-2">

                    <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <img
                            className="mb-12 max-w-full max-lg:hidden rounded-lg shadow-2xl"
                            src={AuthIllustration}
                            alt="auth_illustration"
                        />
                        <div>
                            <h1 className="mb-3 text-white text-4xl font-extrabold lg:text-[45px]">
                                Facehook
                            </h1>
                            <p className="max-w-[452px] text-gray-400/95 lg:text-lg">
                                Create a social media app with features like,
                                showing the post, post details, reactions,
                                comments and profile.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="card bg-sky-900 p-8 rounded-xl shadow-2xl border border-sky-700"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }}
                    >
                        <Loginform />
                        <div className="py-4 lg:py-6">
                            <p className="text-center text-xs text-gray-200 lg:text-sm">
                                Don’t have an account?
                                <Link
                                    className="text-cyan-400 font-semibold transition-all hover:text-white hover:underline mx-2"
                                    to="/register"
                                >
                                    Create New
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
};

export default LoginPage;
