import React, { useState, useEffect } from 'react';
import { Camera, ChevronRight, Eye, EyeOff, KeyRound, User, Loader2 } from 'lucide-react';

export default function AuthScreen({ onLogin }: { onLogin: (data: any) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', password: '', phone: '', name: '', otp: '' });
  const [showPassword, setShowPassword] = useState(false);
  
  // Sign up flow steps: 'phone' -> 'otp' -> 'details'
  const [signupStep, setSignupStep] = useState<'phone' | 'otp' | 'details'>('phone');
  const [isLoading, setIsLoading] = useState(false);
  
  // Real OTP generation
  const [sentOtp, setSentOtp] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [otpError, setOtpError] = useState(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      if (!formData.username || !formData.password) return;
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const loggedUser = {
          username: formData.username,
          name: formData.username,
          bio: 'Living my best life 🚀',
          link: '',
          avatar: '/dp.png',
          followers: 0,
          following: 0,
          posts: 0
        };

        try {
          const stored = localStorage.getItem('fixagram_users');
          const users = stored ? JSON.parse(stored) : [];
          if (!users.find((u: any) => u.username === loggedUser.username)) {
            users.push(loggedUser);
            localStorage.setItem('fixagram_users', JSON.stringify(users));
          }
        } catch(e) {}

        onLogin(loggedUser);
      }, 1000);
      return;
    }

    // Signup Flow
    if (signupStep === 'phone') {
      if (!formData.phone) return;
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Generate a real 6-digit OTP
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setSentOtp(newOtp);
        setSignupStep('otp');
        showToast(`Your Fixagram code is: ${newOtp}`);
      }, 1000);
      return;
    }

    if (signupStep === 'otp') {
      if (formData.otp.length < 6) return;
      
      // Verify Real OTP
      if (formData.otp !== sentOtp) {
        setOtpError(true);
        showToast("Incorrect code. Please try again.");
        return;
      }
      
      setOtpError(false);
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setSignupStep('details');
      }, 1000);
      return;
    }

    if (signupStep === 'details') {
      if (!formData.name || !formData.username || !formData.password) return;
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        const newUser = {
          username: formData.username,
          name: formData.name,
          bio: 'Just joined Fixagram! 🚀',
          link: '',
          avatar: '/dp.png',
          followers: 0,
          following: 0,
          posts: 0
        };
        
        // Save to global user list so others can find them
        try {
          const stored = localStorage.getItem('fixagram_users');
          const users = stored ? JSON.parse(stored) : [];
          if (!users.find((u: any) => u.username === newUser.username)) {
            users.push(newUser);
            localStorage.setItem('fixagram_users', JSON.stringify(users));
          }
        } catch(e) {
          console.error(e);
        }

        onLogin(newUser);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center pb-safe">
      <div className="w-full max-w-md bg-white min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
        
        {/* Toast Notification for OTP */}
        {toast && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-xl shadow-2xl text-sm z-50 animate-fade-in whitespace-nowrap font-medium">
            {toast}
          </div>
        )}

        {/* Logo */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-gradient-to-tr from-yellow-400 via-red-500 to-pink-500 rounded-3xl shadow-xl transform rotate-12 transition-transform hover:rotate-0 duration-300">
            <Camera className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-transparent bg-clip-text" style={{ fontFamily: "'Playfair Display', ui-serif, serif", backgroundImage: "linear-gradient(to right, #ef4444 50%, #ec4899 50%)" }}>
            Fixagram
          </h1>
          <p className="text-gray-500 text-sm mt-2 font-medium">Connect with friends, fix the world.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          {isLogin ? (
            <>
              <div>
                <input
                  type="text"
                  placeholder="Username, email or mobile number"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gray-400 focus:bg-white transition-all"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gray-400 focus:bg-white transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </>
          ) : (
            // Sign up flow
            <>
              {signupStep === 'phone' && (
                <div className="animate-fade-in">
                  <div className="text-center mb-4">
                    <p className="font-semibold text-gray-900 text-lg">Sign Up</p>
                    <p className="text-sm text-gray-500">Enter your mobile number</p>
                  </div>
                  <input
                    type="tel"
                    placeholder="Mobile number"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gray-400 focus:bg-white transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                    required
                  />
                </div>
              )}

              {signupStep === 'otp' && (
                <div className="animate-fade-in">
                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 mb-1">Enter the 6-digit code sent to</p>
                    <p className="font-semibold text-gray-900">{formData.phone}</p>
                  </div>
                  <div className="relative">
                    <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${otpError ? 'text-red-500' : 'text-gray-400'}`}>
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      placeholder="000000"
                      className={`w-full bg-gray-50 border rounded-xl pl-12 pr-4 py-3.5 text-lg tracking-[0.5em] text-center outline-none transition-all ${otpError ? 'border-red-500 text-red-500 focus:border-red-500' : 'border-gray-200 focus:border-gray-400 focus:bg-white'}`}
                      value={formData.otp}
                      onChange={(e) => {
                        setOtpError(false);
                        setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '').slice(0, 6) });
                      }}
                      required
                    />
                  </div>
                  {otpError && (
                    <p className="text-red-500 text-xs text-center mt-2 font-medium">Incorrect code.</p>
                  )}
                  <button 
                    type="button" 
                    onClick={() => {
                      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
                      setSentOtp(newOtp);
                      showToast(`New code sent: ${newOtp}`);
                    }}
                    className="w-full text-center text-sm font-semibold text-blue-500 mt-4 hover:underline"
                  >
                    Resend Code
                  </button>
                </div>
              )}

              {signupStep === 'details' && (
                <div className="animate-fade-in space-y-4">
                  <div className="text-center mb-4">
                    <p className="font-semibold text-gray-900 text-lg">Personal Details</p>
                    <p className="text-sm text-gray-500">Set up your profile</p>
                  </div>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-sm outline-none focus:border-gray-400 focus:bg-white transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Username (ID name)"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gray-400 focus:bg-white transition-all"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                    />
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm outline-none focus:border-gray-400 focus:bg-white transition-all"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={isLoading || (!isLogin && signupStep === 'otp' && formData.otp.length < 6)}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-70 disabled:hover:bg-blue-500 text-white font-semibold rounded-xl py-3.5 mt-2 transition-colors flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Please wait...</span>
              </>
            ) : (
              <>
                {isLogin ? 'Log In' : (signupStep === 'phone' ? 'Send OTP' : (signupStep === 'otp' ? 'Verify OTP' : 'Create Account'))}
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        {isLogin && (
          <>
            <div className="flex items-center w-full my-6 opacity-60">
              <div className="flex-1 border-b border-gray-300"></div>
              <span className="px-4 text-xs font-semibold text-gray-500 uppercase">OR</span>
              <div className="flex-1 border-b border-gray-300"></div>
            </div>

            {/* FB Login (Fake) */}
            <button className="flex items-center justify-center gap-2 text-[#385185] font-semibold text-sm hover:opacity-80 transition-opacity">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Log in with Facebook
            </button>
            <button className="text-xs text-[#00376b] mt-4 hover:underline">
              Forgot password?
            </button>
          </>
        )}

        {!isLogin && signupStep !== 'phone' && (
          <button 
            type="button"
            onClick={() => {
              if (signupStep === 'details') setSignupStep('otp');
              else if (signupStep === 'otp') setSignupStep('phone');
            }}
            className="text-xs text-blue-500 mt-4 hover:underline"
          >
            Go back
          </button>
        )}

        {/* Toggle Mode */}
        {((isLogin) || (!isLogin && signupStep === 'phone')) && (
          <div className="absolute bottom-8 inset-x-0 text-center border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => { 
                  setIsLogin(!isLogin); 
                  setSignupStep('phone');
                  setFormData({ username: '', password: '', phone: '', name: '', otp: '' });
                }}
                className="text-blue-500 font-semibold hover:underline focus:outline-none"
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
