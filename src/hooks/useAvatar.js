import useProfile from "./useProfile";

export const useAvatar = (post) => {
    const { state } = useProfile();

    // prefer the user's avatar path when available
    const isMe = post?.author?.id === state?.user?.id;
    const avatarPath = isMe ? state?.user?.avatar : post?.author?.avatar;

    // If avatarPath exists, serve it from server; otherwise use the shipped default avatar image
    const avatarURL = avatarPath
        ? `${import.meta.env.VITE_SERVER_BASE_URL}/${avatarPath}`
        : "/public/assets/images/avatars/avatar_1.png";

    return { avatarURL };
};