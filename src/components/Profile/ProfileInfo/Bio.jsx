import React, { useState } from 'react';
import useProfile from '../../../hooks/useProfile';
import useAxios from '../../../hooks/useApi';
import { actions } from '../../../actions';
import CheckIcon from "/public/assets/icons/check.svg";
import EditIcon from "/public/assets/icons/edit.svg";

const Bio = () => {
    const { state, dispatch } = useProfile();
    const { api } = useAxios();
    const [bio, setBio] = useState(state?.user?.bio);
    const [editMode, setEditMode] = useState(false);

    const handleBioEdit = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING });
        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${state?.user?.id}`,
                { bio }
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.USER_DATA_EDITED,
                    data: response.data,
                });
            }
            setEditMode(false);
        } catch (error) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };

    return (
        <div className="relative bg-white/5 rounded-xl p-4 border border-gray-200/10 shadow-sm transition-all duration-300 hover:bg-white/10">
            <div className="flex items-start justify-between gap-3">
                {!editMode ? (
                    <p className="text-gray-300 leading-relaxed text-base lg:text-lg">
                        {state?.user?.bio || "No bio added yet."}
                    </p>
                ) : (
                    <textarea
                        className="w-full p-3 bg-white/10 border border-gray-300/20 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        value={bio}
                        rows={4}
                        onChange={(e) => setBio(e.target.value)}
                    />
                )}

                {!editMode ? (
                    <button
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 shadow-md"
                        onClick={() => setEditMode(true)}
                    >
                        <img src={EditIcon} alt="Edit" className="h-4 w-4 invert" />
                    </button>
                ) : (
                    <button
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-green-500 hover:bg-green-600 transition-all duration-200 shadow-md"
                        onClick={handleBioEdit}
                    >
                        <img src={CheckIcon} alt="Check" className="h-4 w-4 invert" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Bio;
