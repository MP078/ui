import React from 'react';
import { AuthLayout } from '../components/auth/AuthLayout';
import { RegisterForm } from '../components/auth/RegisterForm';

export default function Register() {
  return (
    <AuthLayout
      title="Create an account"
      subtitle="Join our community of travelers"
    >
      <RegisterForm />
    </AuthLayout>
  );
}