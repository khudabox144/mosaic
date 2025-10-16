import React from 'react';
import Field from '../common/Field'
import { useForm } from 'react-hook-form';
import { motion as Motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
const Loginform = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const submitForm =async (formData) => {
        // console.log(formData);
         try{
      const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, formData);

      if (response.status === 200) {
        const { token, user } = response.data;
        if (token) {
          const authToken = token.token;
          const refreshToken = token.refreshToken;

          console.log(`Login time auth token: ${authToken}`);
          setAuth({user, authToken, refreshToken});

          navigate("/");
        }
      }
    } catch(error){
      console.error(error);
      setError("root.random", {
        type: "random",
        message:`User with email ${formData.email} is not found`,
      })
    }
      

    }

    const formVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
    };

    return (
        <Motion.form
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

            <Motion.button
                type='submit'
                className="w-full mt-6 py-3 bg-cyan-400 text-slate-900 text-lg 
                           font-bold rounded-lg shadow-xl 
                           transition-all duration-300 ease-in-out"
                whileHover={{ scale: 1.03, boxShadow: "0 10px 15px rgba(6, 182, 212, 0.4)" }}
                whileTap={{ scale: 0.98 }}
            >
                Login
            </Motion.button>
        </Motion.form>
    );
};

export default Loginform;
