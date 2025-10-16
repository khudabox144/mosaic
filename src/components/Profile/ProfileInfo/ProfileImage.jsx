import React, { useRef } from 'react';
import useProfile from '../../../hooks/useProfile';
import useAxios from '../../../hooks/useApi';
import { actions } from '../../../actions';
import EditIcon from "/public/assets/icons/edit.svg";

const ProfileImage = () => {
    const { state, dispatch } = useProfile();
    const { api } = useAxios();
    const ImageRef = useRef();

    const handleImageUpload = () => {
        if (ImageRef.current) ImageRef.current.click();
    };

    const updateImage = async () => {
        try {
            const formData = new FormData();
            for (const file of ImageRef.current.files) {
                formData.append("avatar", file);
            }

            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}/avatar`,
                formData
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPDATED,
                    data: response.data,
                });
            }
        } catch (error) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };

    return (
        <div className="relative group flex justify-center">
            <img
                className="max-w-[180px] lg:max-w-[220px] aspect-square object-cover rounded-full border-4 border-white/30 shadow-lg transition-transform duration-300 group-hover:scale-105"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/${state?.user?.avatar}`}
                alt={state?.user?.firstName}
            />

            <form id="form" encType="multipart/form-data">
                <button
                    className="flex-center absolute bottom-3 right-3 h-9 w-9 rounded-full bg-black/60 backdrop-blur-sm hover:bg-black/80 transition-all duration-300 border border-white/20"
                    onClick={handleImageUpload}
                    type="button"
                >
                    <img src={EditIcon} alt="Edit" className="h-4 w-4 invert" />
                </button>
                <input id="file" type="file" ref={ImageRef} hidden onChange={updateImage} />
            </form>
        </div>
    );
};

export default ProfileImage;
