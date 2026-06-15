import AuthHeader from '@/components/features/auth/AuthHeader';
import AuthTabs from '@/components/features/auth/AuthTabs';
import LoginForm from '@/components/features/auth/LoginForm';

import AuthLayout from '@/components/shared/AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout>
      <AuthHeader
        title="Welcome Back"
        subtitle="Good to see you again! Let's eat"
      />

      <AuthTabs activeTab="login" />

      <LoginForm />
    </AuthLayout>
  );
}