import React from 'react';
import ProfileImage from './ProfileImage';
import Bio from './Bio';
import ProfilePosts from '../ProfilePosts/ProfilePosts';
import useProfile from '../../../hooks/useProfile';
import useAuth from '../../../hooks/useAuth';

const ProfileInfo = () => {
    const { state } = useProfile();
    const { auth } = useAuth();
    const user = state?.user ?? auth?.user;

    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-8 lg:py-12 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/20">
            
            {/* Profile top section */}
            <div className="flex flex-col items-center text-center gap-4">
                {/* Profile Image */}
                <ProfileImage />

                {/* Name & Email */}
                <div className="mt-2">
                    <h2 className="text-2xl font-semibold text-white">
                        {user?.firstName} {user?.lastName}
                    </h2>
                    <p className="text-gray-400 text-sm lg:text-base mt-1">
                        📧 {user?.email || "No email available"}
                    </p>
                </div>

                {/* Bio below image & email */}
                <div className="w-full lg:w-3/4 mt-4">
                    <Bio />
                </div>
            </div>

            {/* Profile Posts below bio */}
            <div className="mt-10 border-t border-gray-300/20 pt-6">
                <ProfilePosts />
            </div>
        </section>
    );
};

export default ProfileInfo;
