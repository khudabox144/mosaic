import { motion } from "framer-motion";
import React from "react";

const PostBody = ({ poster, content }) => {
    return (
        <div className="border-b border-gray-700 py-4 lg:py-5 px-4">
            <p className="mb-4 text-sm lg:text-base text-gray-200">{content ?? "No Content Available"}</p>

            {poster && (
                <motion.div
                    className="flex items-center justify-center overflow-hidden rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                >
                    <img
                        className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-xl shadow-md"
                        src={`${import.meta.env.VITE_SERVER_BASE_URL}/${poster}`}
                        alt="poster"
                    />
                </motion.div>
            )}
        </div>
    );
};

export default PostBody;
