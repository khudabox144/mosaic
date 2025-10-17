import axios from "axios";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Field from "../common/Field";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const submitForm = async (formData) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
                formData
            );
            if (response.status === 201) navigate("/login");
        } catch (error) {
            setError("root.random", {
                type: "random",
                message: `Something went wrong: ${error.message}`,
            });
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-5 border-b border-gray-700 pb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* First Name */}
            <Field label="First Name" error={errors.firstName}>
                <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "#84cc16" }}
                    transition={{ duration: 0.2 }}
                    {...register("firstName", {
                        required: "First Name is Required",
                    })}
                    className={`auth-input transition-all ${
                        errors.firstName
                            ? "border-red-500"
                            : "border-gray-600 focus:border-lime-400"
                    }`}
                    type="text"
                    id="firstName"
                    placeholder="Enter your first name"
                />
            </Field>

            {/* Last Name */}
            <Field label="Last Name" error={errors.lastName}>
                <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "#84cc16" }}
                    transition={{ duration: 0.2 }}
                    {...register("lastName")}
                    className={`auth-input transition-all ${
                        errors.lastName
                            ? "border-red-500"
                            : "border-gray-600 focus:border-lime-400"
                    }`}
                    type="text"
                    id="lastName"
                    placeholder="Enter your last name"
                />
            </Field>

            {/* Email */}
            <Field label="Email" error={errors.email}>
                <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "#84cc16" }}
                    transition={{ duration: 0.2 }}
                    {...register("email", { required: "Email ID is Required" })}
                    className={`auth-input transition-all ${
                        errors.email
                            ? "border-red-500"
                            : "border-gray-600 focus:border-lime-400"
                    }`}
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                />
            </Field>

            {/* Password */}
            <Field label="Password" error={errors.password}>
                <motion.input
                    whileFocus={{ scale: 1.02, borderColor: "#84cc16" }}
                    transition={{ duration: 0.2 }}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message:
                                "Your password must be at least 8 characters",
                        },
                    })}
                    className={`auth-input transition-all ${
                        errors.password
                            ? "border-red-500"
                            : "border-gray-600 focus:border-lime-400"
                    }`}
                    type="password"
                    id="password"
                    placeholder="Enter a strong password"
                />
            </Field>

            {/* Error Message */}
            {errors?.root?.random?.message && (
                <p className="text-red-400 text-sm text-center">
                    {errors.root.random.message}
                </p>
            )}

            {/* Submit Button */}
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-lime-400 to-green-500 font-semibold text-deepDark hover:opacity-90 shadow-md"
                type="submit"
            >
                Register
            </motion.button>
        </motion.form>
    );
};

export default RegistrationForm;
