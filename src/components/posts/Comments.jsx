import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useAvatar } from "../../hooks/useAvatar";
// import { useAuth } from "../../hooks/useAuth";
import PostCommentsList from "./CommentsList";
import useAxios from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";



const Comments = ({ post }) => {
    const { avatarURL } = useAvatar(post);
    const { auth } = useAuth();
    const {api}=useAxios();

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState(post?.comments ?? []);
    const [showAll, setShowAll] = useState(false);

    const addComment = async (e) => {
        if (e.key === "Enter" && comment.trim()) {
            try {
                const response = await api.patch(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/comment`,
                    { comment }
                );
                if (response.status === 200) {
                    setComments(response.data.comments);
                    setComment("");
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4"
        >
            {/* Comment Input */}
            <motion.div
                className="flex items-center mb-4 gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <img
                    className="w-9 h-9 rounded-full object-cover border border-gray-600"
                    src={`${import.meta.env.VITE_SERVER_BASE_URL}/${auth?.user?.avatar || avatarURL}`}
                    alt="avatar"
                />
                <motion.input
                    type="text"
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={addComment}
                    whileFocus={{ scale: 1.02 }}
                    className="w-full h-9 sm:h-10 rounded-full bg-[#2E2E2E] px-4 text-sm text-white placeholder-gray-400 border border-gray-700 focus:border-lwsGreen outline-none transition-all"
                />
            </motion.div>

            {/* Toggle Comments */}
            <button
                onClick={() => setShowAll(!showAll)}
                className="text-gray-400 text-sm hover:text-white transition-all"
            >
                {showAll ? "Hide Comments ▴" : "All Comments ▾"}
            </button>

            {/* Comments List */}
            <AnimatePresence>
                {showAll && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PostCommentsList comments={comments} />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default Comments;
