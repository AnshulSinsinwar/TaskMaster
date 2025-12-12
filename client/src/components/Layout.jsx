import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard } from 'lucide-react';

export default function Layout() {
    const { user, logout } = useAuth();
    const location = useLocation();

    return (
        <div className="min-h-screen text-gray-200">
            <nav className="fixed w-full z-50 glass-card bg-black/50 border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center">
                            <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00ff9d] to-[#00b8ff] flex items-center gap-3">
                                <LayoutDashboard className="w-8 h-8 text-[#00ff9d]" />
                                TaskMaster
                            </Link>
                        </div>
                        <div className="flex items-center gap-6">
                            {user ? (
                                <>
                                    <span className="text-gray-400 font-medium">Welcome, <span className="text-white">{user.name}</span></span>
                                    <button
                                        onClick={logout}
                                        className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-[#00ff9d] transition-colors duration-300"
                                        title="Logout"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <div className="space-x-4">
                                    <Link to="/login" className="text-gray-400 hover:text-white transition-colors font-medium">Login</Link>
                                    <Link to="/signup" className="px-6 py-2 bg-[#00ff9d] text-black font-bold rounded-full hover:shadow-[0_0_15px_rgba(0,255,157,0.4)] transition-all transform hover:-translate-y-0.5">
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12">
                <Outlet />
            </main>
        </div>
    );
}
