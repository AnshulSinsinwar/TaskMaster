import { useState, useEffect, useRef } from 'react';
import api from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Plus, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';
import { gsap } from 'gsap';
import { useGSAP } from '../hooks/useGSAP';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    useEffect(() => {
        let result = tasks;
        if (searchTerm) {
            result = result.filter(t =>
                t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                t.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (statusFilter !== 'all') {
            result = result.filter(t => t.status === statusFilter);
        }
        setFilteredTasks(result);
    }, [tasks, searchTerm, statusFilter]);

    // Animations removed for maximum visibility stability

    const fetchTasks = async () => {
        try {
            const res = await api.get('/tasks');
            setTasks(res.data);
        } catch (error) {
            if (error.code === 'ERR_NETWORK') {
                toast.error('Cannot connect to server. Is MongoDB running?');
            } else {
                toast.error('Failed to load tasks');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdate = async (data) => {
        try {
            if (editingTask) {
                await api.put(`/tasks/${editingTask._id}`, data);
                toast.success('Task updated');
            } else {
                await api.post('/tasks', data);
                toast.success('Task created');
            }
            fetchTasks();
        } catch (error) {
            console.error(error);
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            toast.success('Task deleted');
            fetchTasks();
        } catch (error) {
            console.error(error);
            toast.error('Delete failed');
        }
    };

    const openCreateModal = () => {
        setEditingTask(null);
        setIsFormOpen(true);
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setIsFormOpen(true);
    };

    if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-[#00ff9d]/20 border-t-[#00ff9d] rounded-full animate-spin"></div>
            </div>
        </div>
    );

    return (
        <div ref={containerRef} className="space-y-8">
            <div className="dashboard-header flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                    <h1 className="text-5xl font-bold tracking-tight text-white mb-2">
                        My Tasks
                    </h1>
                    <p className="text-gray-100 text-lg font-light tracking-wide">Manage your mission critical objectives</p>
                </div>
                <button
                    onClick={openCreateModal}
                    className="flex items-center gap-2 px-8 py-3 bg-[#00ff9d] text-black font-extrabold rounded-xl hover:bg-[#00cc7e] hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-white/50 shadow-[0_0_20px_rgba(0,255,157,0.3)]"
                >
                    <Plus className="w-6 h-6 stroke-[3]" />
                    <span className="text-base uppercase tracking-wider">New Task</span>
                </button>
            </div>

            <div className="search-bar bg-[#18181b] p-2 rounded-2xl flex flex-col sm:flex-row gap-2 border border-white/20 mt-8 shadow-lg">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent border-none text-white placeholder-gray-400 pl-12 py-3 focus:ring-0 text-lg font-medium"
                    />
                </div>
                <div className="w-px bg-white/20 mx-2 hidden sm:block"></div>
                <div className="relative min-w-[200px]">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full bg-transparent border-none text-white font-medium py-3 pl-4 pr-10 focus:ring-0 cursor-pointer text-lg appearance-none"
                    >
                        <option value="all" className="bg-[#18181b] text-white">All Status</option>
                        <option value="pending" className="bg-[#18181b] text-white">Pending</option>
                        <option value="in-progress" className="bg-[#18181b] text-white">In Progress</option>
                        <option value="completed" className="bg-[#18181b] text-white">Completed</option>
                    </select>
                    <Filter className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#00ff9d] pointer-events-none w-5 h-5" />
                </div>
            </div>

            {filteredTasks.length === 0 ? (
                <div className="text-center py-32 glass-card rounded-3xl border border-white/5 mt-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 text-gray-500 mb-6">
                        <Search className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">No tasks found</h3>
                    <p className="text-gray-400 text-lg">Your dashboard is clean. Time to create something new?</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 task-grid">
                    {filteredTasks.map(task => (
                        <div key={task._id} className="task-card">
                            <TaskCard
                                task={task}
                                onEdit={openEditModal}
                                onDelete={handleDelete}
                            />
                        </div>
                    ))}
                </div>
            )}

            {isFormOpen && (
                <TaskForm
                    task={editingTask}
                    onClose={() => setIsFormOpen(false)}
                    onSave={handleCreateOrUpdate}
                />
            )}
        </div>
    );
}
