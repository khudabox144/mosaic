import { motion } from "framer-motion";

const PostCommentsList = ({ comments }) => {
    return (
        <motion.div
            className="space-y-4 divide-y divide-gray-700 mt-3 pl-2 lg:pl-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            {comments &&
                comments.map((comment, index) => (
                    <motion.div
                        className="flex items-center gap-3 pt-4"
                        key={comment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <img
                            className="w-6 h-6 rounded-full border border-gray-600"
                            src={`${import.meta.env.VITE_SERVER_BASE_URL}/${comment?.author?.avatar}`}
                            alt="avatar"
                        />
                        <div className="text-xs lg:text-sm text-gray-300">
                            <span className="font-semibold">{comment?.author?.name}:</span>{" "}
                            {comment.comment}
                        </div>
                    </motion.div>
                ))}
        </motion.div>
    );
};

export default PostCommentsList;
