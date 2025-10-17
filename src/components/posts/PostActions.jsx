import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CommentIcon from "/public/assets/icons/comment.svg";
import LikeFilledIcon from "/public/assets/icons/like-filled.svg";
import LikeIcon from "/public/assets/icons/like.svg";
import ShareIcon from "/public/assets/icons/share.svg";
// import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useApi";
import useAuth from "../../hooks/useAuth";


const reactions = [
    { emoji: "👍", label: "Like", color: "#3b82f6" },
    { emoji: "❤️", label: "Love", color: "#ef4444" },
    { emoji: "😂", label: "Haha", color: "#facc15" },
    { emoji: "😮", label: "Wow", color: "#a855f7" },
    { emoji: "😢", label: "Sad", color: "#60a5fa" },
    { emoji: "😡", label: "Angry", color: "#f87171" },
];

const PostActions = ({ post, commentCount }) => {
    const { auth } = useAuth();
    const { api } = useAxios();

    const [liked, setLiked] = useState(post?.likes?.includes(auth?.user?.id));
    const [showReactions, setShowReactions] = useState(false);

    const handleLike = async () => {
        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}/like`
            );
            if (response.status === 200) {
                setLiked(!liked);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="relative flex items-center justify-around py-4 lg:py-6 border-t border-gray-700">
            {/* ❤️ Like Button with Hover Reactions */}
            <motion.div
                className="relative flex flex-col items-center"
                onMouseEnter={() => setShowReactions(true)}
                onMouseLeave={() => setShowReactions(false)}
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    onClick={handleLike}
                    className={`flex-center gap-2 text-xs font-semibold lg:text-sm transition-all ${
                        liked ? "text-lwsGreen" : "text-gray-400 hover:text-white"
                    }`}
                >
                    <img
                        src={liked ? LikeFilledIcon : LikeIcon}
                        alt="Like"
                        className="w-4"
                    />
                    <span>{liked ? "Liked" : "Like"}</span>
                </motion.button>

                {/* Reaction Popup */}
                <AnimatePresence>
                    {showReactions && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                            className="absolute -top-14 flex items-center gap-2 bg-gray-800 border border-gray-600 rounded-full px-4 py-2 shadow-xl backdrop-blur-md"
                        >
                            {reactions.map((reaction) => (
                                <motion.button
                                    key={reaction.label}
                                    whileHover={{ scale: 1.4 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 200,
                                        damping: 10,
                                    }}
                                    title={reaction.label}
                                    className="text-lg md:text-xl cursor-pointer"
                                    style={{ color: reaction.color }}
                                    onClick={() => setLiked(true)}
                                >
                                    {reaction.emoji}
                                </motion.button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* 💬 Comment Button */}
            <motion.button
                whileHover={{ scale: 1.1, color: "#fff" }}
                transition={{ duration: 0.2 }}
                className="flex-center gap-2 text-xs font-semibold text-gray-400 lg:text-sm"
            >
                <img src={CommentIcon} alt="Comment" className="w-4" />
                <span>Comment ({commentCount ?? 0})</span>
            </motion.button>

            {/* 🔄 Share Button */}
            <motion.button
                whileHover={{ scale: 1.1, color: "#fff" }}
                transition={{ duration: 0.2 }}
                className="flex-center gap-2 text-xs font-semibold text-gray-400 lg:text-sm"
            >
                <img src={ShareIcon} alt="Share" className="w-4" />
                <span>Share</span>
            </motion.button>
        </div>
    );
};

export default PostActions;
