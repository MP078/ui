import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { Button } from "../ui/button";
import { FormInput } from "./FormInput";
import { AuthFormState } from "./types";
import { auth } from "../../lib/api";

export function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<AuthFormState>({
    email: "",
    password: "",
    isLoading: false,
  });
  const [errors, setErrors] = useState<Partial<AuthFormState>>({});

  const validateForm = () => {
    const newErrors: Partial<AuthFormState> = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormData((prev) => ({ ...prev, isLoading: true }));

    try {
      const { email, password } = formData;
      const data = await auth.login(email, password);

      console.log("Login successful:", data);
      navigate(0);
    } catch (error) {
      console.error("Login failed:", error);
      // Optional: Set error state or show toast
    } finally {
      setFormData((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof AuthFormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
        icon={<Mail className="w-5 h-5 text-gray-400" />}
      />

      <FormInput
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Enter your password"
        icon={<Lock className="w-5 h-5 text-gray-400" />}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="h-4 w-4 text-brand-orange focus:ring-brand-orange border-gray-300 rounded"
          />
          <label
            htmlFor="remember"
            className="ml-2 block text-sm text-gray-700"
          >
            Remember me
          </label>
        </div>
        <Link
          to="/forgot-password"
          className="text-sm text-brand-orange hover:text-brand-orange/90"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={formData.isLoading}>
        {formData.isLoading ? "Signing in..." : "Sign In"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475647/facebook-color.svg"
            alt="Facebook"
            className="w-5 h-5 mr-2"
          />
          Facebook
        </button>
      </div>

      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-brand-orange hover:text-brand-orange/90 font-medium"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
