import AuthHeader from '@/components/features/auth/AuthHeader';
import AuthTabs from '@/components/features/auth/AuthTabs';
import RegisterForm from '@/components/features/auth/RegisterForm';

import AuthLayout from '@/components/shared/AuthLayout';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome Back"
        subtitle="Good to see you again! Let's eat"
      />

      <AuthTabs activeTab="register" />

      <RegisterForm />
    </AuthLayout>
  );
}