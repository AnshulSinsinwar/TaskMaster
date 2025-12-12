import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

import { gsap } from 'gsap';
import { useGSAP } from '../hooks/useGSAP';
import { UserPlus, Mail, User, Lock, ArrowRight } from 'lucide-react';

export default function Signup() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const containerRef = useRef(null);

    // Animations removed for maximum visibility stability

    const onSubmit = async (data) => {
        const success = await registerUser(data.name, data.email, data.password);
        if (success) {
            navigate('/login');
        }
    };

    return (
        <div ref={containerRef} className="min-h-[80vh] flex items-center justify-center p-4">
            <div className="auth-card w-full max-w-md glass-card rounded-2xl p-8 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00ff9d] to-[#00b8ff]"></div>

                <div className="text-center mb-10 form-item">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#00ff9d]/10 text-[#00ff9d] mb-6 shadow-[0_0_20px_rgba(0,255,157,0.1)]">
                        <UserPlus className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
                    <p className="text-gray-400 mt-2">Join us to manage your tasks efficiently</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="form-item">
                        <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Full Name</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#00ff9d] transition-colors">
                                <User className="w-5 h-5" />
                            </div>
                            <input
                                {...register('name', { required: 'Name is required' })}
                                className="input-field !pl-10"
                                placeholder="John Doe"
                            />
                        </div>
                        {errors.name && <p className="text-red-400 text-sm mt-1 ml-1">{errors.name.message}</p>}
                    </div>

                    <div className="form-item">
                        <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Email Address</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#00ff9d] transition-colors">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                {...register('email', { required: 'Email is required' })}
                                type="email"
                                className="input-field !pl-10"
                                placeholder="john@example.com"
                            />
                        </div>
                        {errors.email && <p className="text-red-400 text-sm mt-1 ml-1">{errors.email.message}</p>}
                    </div>

                    <div className="form-item">
                        <label className="block text-sm font-medium text-gray-300 mb-1.5 ml-1">Password</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-[#00ff9d] transition-colors">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min length is 6' } })}
                                type="password"
                                className="input-field !pl-10"
                                placeholder="••••••••"
                            />
                        </div>
                        {errors.password && <p className="text-red-400 text-sm mt-1 ml-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="form-item btn-primary mt-8 group"
                    >
                        {isSubmitting ? 'Creating account...' : (
                            <span className="flex items-center gap-2">
                                Sign Up <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        )}
                    </button>
                </form>

                <p className="mt-8 text-center text-sm text-gray-400 form-item">
                    Already have an account?{' '}
                    <Link to="/login" className="font-bold text-[#00ff9d] hover:text-[#00cc7e] transition-colors">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
