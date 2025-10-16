import React from 'react';
import ProfileImage from './ProfileImage';
import Bio from './Bio';
import ProfilePosts from './ProfilePosts';

const ProfileInfo = () => {
    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-8 lg:py-12 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/20">
            <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8">
                <ProfileImage />
                <div className="flex-1 w-full">
                    <Bio />
                </div>
            </div>

            <div className="mt-10 border-t border-gray-300/20 pt-6">
                <ProfilePosts />
            </div>
        </section>
    );
};

export default ProfileInfo;
