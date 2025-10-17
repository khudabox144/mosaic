import { motion } from "framer-motion";
import { useAvatar } from "../../hooks/useAvatar";
import PostCommentsList from "./CommentsList";

const Comments = ({ post }) => {
    const { avatarURL } = useAvatar(post);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4"
        >
            <div className="flex items-center mb-4 gap-2 lg:gap-4">
                <img
                    className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover border border-gray-600"
                    src={avatarURL}
                    alt="avatar"
                />
                <input
                    type="text"
                    className="h-9 w-full rounded-full bg-[#2E2E2E] px-4 text-xs text-white placeholder-gray-400 focus:outline-none sm:h-[38px]"
                    placeholder="What's on your mind?"
                />
            </div>

            <button className="text-gray-400 text-sm hover:text-white transition-all">
                All Comments ▾
            </button>

            <PostCommentsList comments={post?.comments} />
        </motion.div>
    );
};

export default Comments;
