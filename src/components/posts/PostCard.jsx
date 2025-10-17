import React from "react";
import { motion } from "framer-motion";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostActions from "./PostActions";
import Comments from "./Comments";

const PostCard = ({ post }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="card mt-6 lg:mt-8 bg-white/5 backdrop-blur-md border border-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
            <PostHeader post={post} />
            <PostBody poster={post?.image} content={post?.content} />
            <PostActions
                postId={post?.id}
                commentCount={post?.comments?.length}
            />
            <Comments post={post} />
        </motion.article>
    );
};

export default PostCard;
