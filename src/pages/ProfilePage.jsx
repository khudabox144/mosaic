import React, { useEffect } from 'react';
import useProfile from '../hooks/useProfile';
import useAxios from '../hooks/useApi';
import useAuth from '../hooks/useAuth';
import { actions } from '../actions';
import ProfileInfo from '../components/Profile/ProfileInfo/ProfileInfo';
import ProfilePosts from '../components/Profile/ProfilePosts/ProfilePosts';

const ProfilePage = () => {

    const { state, dispatch } = useProfile();
    const { api } = useAxios();
    const { auth } = useAuth();

    useEffect(() => {
        dispatch({ type: actions.profile.DATA_FETCHING });
        const fetchProfile = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id
                }`);
            if(response.status===200){
                dispatch({
                    type:actions.profile.DATA_FETCHED,
                    data:response.data,
                })
            }
            } catch (error) {
                console.log(error);
                dispatch({
                    type:actions.profile.DATA_FETCH_ERROR,
                    error:error.message,
                })
            }
        };
        fetchProfile();
    }, [api, auth, dispatch])

    if(state?.loading){
        return <div>Fetching your profile data.........</div>
    }

    return (
        <>
        <ProfileInfo/>
        <ProfilePosts/> 
        </>
    );
};

export default ProfilePage;