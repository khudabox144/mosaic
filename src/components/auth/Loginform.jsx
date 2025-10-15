import React from 'react';
import Field from '../common/Field'
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
useNavigate
const Loginform = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const submitForm = (formData) => {
        console.log(formData);
        const user = { ...formData };
        setAuth({ user });
        navigate('/');

    }

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
    };

    return (
        <motion.form
            className="pb-10 lg:pb-[60px]"
            onSubmit={handleSubmit(submitForm)}
            variants={formVariants}
            initial="hidden"
            animate="visible"
        >
            <Field label={'Email'} error={errors.email} >
                <input
                    {...register('email', { required: "Email ID is required" })}
                    className={`auth-input ${errors.email ? "border-red-500 ring-1 ring-red-500" : ""}`}
                    type="email"
                    name='email'
                    id='email'
                    placeholder='john.doe@example.com'
                />
            </Field>

            <Field label={'Password'} error={errors.password} >
                <input
                    {...register('password', {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Your password must be at least 8 characters",
                        },
                    })}
                    className={`auth-input ${errors.password ? "border-red-500 ring-1 ring-red-500" : ""}`}
                    type="password"
                    name='password'
                    id='password'
                    placeholder='••••••••'
                />
            </Field>

            <motion.button
                type='submit'
                className="w-full mt-6 py-3 bg-cyan-400 text-slate-900 text-lg 
                           font-bold rounded-lg shadow-xl 
                           transition-all duration-300 ease-in-out"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px rgba(6, 182, 212, 0.4)" }}
                whileTap={{ scale: 0.98 }}
            >
                Login
            </motion.button>
        </motion.form>
    );
};

export default Loginform;
