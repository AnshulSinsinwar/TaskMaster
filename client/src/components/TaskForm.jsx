import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function TaskForm({ task, onClose, onSave }) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        if (task) {
            reset(task);
        }
    }, [task, reset]);

    const onSubmit = async (data) => {
        await onSave(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[60]">
            <div className="bg-[#18181b] w-full max-w-md rounded-2xl border border-white/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-[#00ff9d] to-[#00b8ff]"></div>

                <div className="flex justify-between items-center p-6 border-b border-white/5">
                    <h3 className="text-xl font-bold text-white tracking-wide">{task ? 'Edit Task' : 'New Task'}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors bg-white/5 p-1 rounded-full hover:bg-white/10">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Title</label>
                        <input
                            {...register('title', { required: 'Title is required' })}
                            className="input-field"
                            placeholder="Enter task title"
                        />
                        {errors.title && <p className="text-red-400 text-sm mt-1 ml-1">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Description</label>
                        <textarea
                            {...register('description')}
                            rows="4"
                            className="input-field resize-none"
                            placeholder="Enter task description"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Status</label>
                        <div className="relative">
                            <select
                                {...register('status')}
                                className="input-field appearance-none cursor-pointer"
                            >
                                <option value="pending" className="bg-[#0e0e0e]">Pending</option>
                                <option value="in-progress" className="bg-[#0e0e0e]">In Progress</option>
                                <option value="completed" className="bg-[#0e0e0e]">Completed</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl text-gray-300 font-medium hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-gradient-to-r from-[#00ff9d] to-[#00cc7e] text-black font-bold rounded-xl shadow-[0_0_15px_rgba(0,255,157,0.3)] hover:shadow-[0_0_25px_rgba(0,255,157,0.5)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Saving...' : 'Save Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
