import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThreeDotsIcon from "/public/assets/icons/3dots.svg";
import DeleteIcon from "/public/assets/icons/delete.svg";
import EditIcon from "/public/assets/icons/edit.svg";
import TimeIcon from "/public/assets/icons/time.svg";
import { useAvatar } from "../../hooks/useAvatar";
import { getDateDifferenceFromNow } from "../../utils";
import useAuth from "../../hooks/useAuth";
import { usePost } from "../../hooks/usePost";
import useAxios from "../../hooks/useApi";
import { actions } from "../../actions";

const PostHeader = ({ post }) => {
    const [showAction, setShowAction] = useState(false);
    const { avatarURL } = useAvatar(post);
    const { auth } = useAuth();
    const isMe = post?.author?.id == auth?.user?.id;
    const { dispatch } = usePost();
    const { api } = useAxios();

    const toggleAction = () => setShowAction(!showAction);
     const handleDeletePost = async (event) => {
        dispatch({ type: actions.post.DATA_FETCHING });

        try {
            const response = await api.delete(
                `${import.meta.env.VITE_SERVER_BASE_URL}/posts/${post.id}`
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.post.POST_DELETED,
                    data: post.id,
                });
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: actions.post.DATA_FETCH_ERROR,
                error: error.response?.data || error.message,
            });
        }
    };

    return (
        <header className="flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-3">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="w-10 h-10 rounded-full lg:w-14 lg:h-14 object-cover border border-gray-600"
                    src={avatarURL}
                    alt="avatar"
                />
                <div>
                    <h6 className="text-base lg:text-lg font-semibold">{post?.author?.name}</h6>
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs lg:text-sm">
                        <img src={TimeIcon} alt="time" className="w-4" />
                        <span>{`${getDateDifferenceFromNow(post?.createAt)}`}</span>
                    </div>
                </div>
            </div>

            <div className="relative">
                <button onClick={toggleAction}>
                    <img src={ThreeDotsIcon} alt="3dots" className="w-5 hover:opacity-80" />
                </button>

                <AnimatePresence>
                    {isMe && showAction && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 top-8 z-10 bg-[#1e1e1e] border border-gray-700 rounded-xl p-2 w-32 shadow-lg backdrop-blur-md"
                        >
                            <button
                                className="action-menu-item hover:text-lime-400 flex items-center gap-2 w-full px-2 py-1"
                                onClick={() => {
                                    setShowAction(false);
                                    console.log("Edit post");
                                }}
                            >
                                <img src={EditIcon} alt="Edit" className="w-4" />
                                Edit
                            </button>

                            <button
                                className="action-menu-item hover:text-red-500 flex items-center gap-2 w-full px-2 py-1"
                                onClick={handleDeletePost}
                            >
                                <img src={DeleteIcon} alt="Delete" className="w-4" />
                                Delete
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default PostHeader;
