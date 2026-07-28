import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../context/ToastContext';
import { motion } from 'motion/react';

export const LoginView: React.FC = () => {
  const { isRtl, login, setActiveTab, settings } = useApp();
  const { showToast } = useToast();

  const [email, setEmail] = useState('athlete@apex.com');
  const [password, setPassword] = useState('apex123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast({
        title: isRtl ? 'خطأ في البيانات' : 'Validation Error',
        message: isRtl ? 'يرجى إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter valid email and password.',
        type: 'error',
      });
      return;
    }

    setLoading(true);
    login(email, selectedRole, password);
    setTimeout(() => {
      setLoading(false);
      showToast({
        title: isRtl ? 'تم تسجيل الدخول بنجاح!' : 'Welcome Back!',
        message: isRtl ? `مرحباً بك بصلاحية ${selectedRole}` : `Signed in successfully as ${selectedRole}.`,
        type: 'success',
      });
      setActiveTab('dashboard');
    }, 600);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    setShowForgotPasswordModal(false);
    showToast({
      title: isRtl ? 'تم إرسال الرابط' : 'Reset Link Sent',
      message: isRtl ? `تم إرسال رابط إعادة تعيين كلمة المرور إلى ${resetEmail}` : `Password reset instructions sent to ${resetEmail}.`,
      type: 'info',
    });
    setResetEmail('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6"
      >
        <Card variant="highlight" padding="lg" className="space-y-6 border border-primary-fixed/40 shadow-2xl">
          {/* Logo & Brand Header */}
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-black font-headline text-3xl primary-glow mx-auto shadow-lg">
              A
            </div>
            <h1 className="text-2xl font-black font-headline text-on-surface">
              {settings.appName || 'APEX ELITE'}
            </h1>
            <p className="text-xs text-on-surface-variant font-medium">
              {isRtl ? 'سجّل دخولك للوصول إلى منصة الأداء الرياضي' : 'Sign in to access your biomechanical athlete portal'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label={isRtl ? 'البريد الإلكتروني' : 'Email Address'}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="athlete@apex.com"
              icon="mail"
            />

            <div className="space-y-1 relative">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                {isRtl ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/60 rounded-xl px-3 py-2.5 text-xs text-on-surface outline-none focus:border-primary-fixed pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-on-surface-variant hover:text-primary-fixed"
                >
                  <span className="material-symbols-outlined text-sm">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Role Selection Bar (For multi-role demo) */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                {isRtl ? 'اختر نوع الحساب (صلاحيات)' : 'Select Role (Permissions)'}
              </label>
              <div className="grid grid-cols-4 gap-1.5 p-1 bg-surface-container-high rounded-xl border border-outline-variant/60">
                {(['user', 'coach', 'moderator', 'admin'] as UserRole[]).map((r) => (
                  <button
                    type="button"
                    key={r}
                    onClick={() => setSelectedRole(r)}
                    className={`py-1.5 rounded-lg text-[10px] font-black uppercase transition-all ${
                      selectedRole === r
                        ? 'bg-primary-fixed text-on-primary-fixed shadow-md'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded accent-primary-fixed"
                />
                <span className="text-on-surface-variant font-bold">
                  {isRtl ? 'تذكرني' : 'Remember me'}
                </span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotPasswordModal(true)}
                className="text-primary-fixed font-bold hover:underline"
              >
                {isRtl ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
              </button>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="w-full mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-pulse">{isRtl ? 'جاري التحقق...' : 'Authenticating...'}</span>
              ) : isRtl ? (
                'تسجيل الدخول'
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Card>
      </motion.div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        title={isRtl ? 'استعادة كلمة المرور' : 'Reset Password'}
        icon="lock_reset"
      >
        <form onSubmit={handleForgotPassword} className="space-y-4 pt-2">
          <Input
            label={isRtl ? 'البريد الإلكتروني' : 'Registered Email'}
            type="email"
            required
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder="athlete@apex.com"
          />
          <div className="flex gap-3">
            <Button variant="primary" size="md" type="submit" className="flex-1">
              {isRtl ? 'إرسال رابط الإعادة' : 'Send Reset Link'}
            </Button>
            <Button
              variant="secondary"
              size="md"
              type="button"
              className="flex-1"
              onClick={() => setShowForgotPasswordModal(false)}
            >
              {isRtl ? 'إلغاء' : 'Cancel'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
