import { Trash2, Edit2, CheckCircle, Circle, Clock } from 'lucide-react';
import clsx from 'clsx';

export default function TaskCard({ task, onEdit, onDelete }) {
    const statusConfig = {
        'pending': { color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
        'in-progress': { color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/20' },
        'completed': { color: 'text-[#00ff9d]', bg: 'bg-[#00ff9d]/10', border: 'border-[#00ff9d]/20' },
    };

    const StatusIcon = {
        'pending': Circle,
        'in-progress': Clock,
        'completed': CheckCircle,
    }[task.status];

    const config = statusConfig[task.status];

    return (
        <div className="bg-[#18181b] rounded-2xl p-6 hover:bg-[#27272a] transition-all duration-200 group border border-white/10 hover:border-[#00ff9d]/50 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#00ff9d] opacity-50 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white line-clamp-1">{task.title}</h3>
                <span className={clsx('px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border', config.bg, config.color, config.border)}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {task.status.toUpperCase()}
                </span>
            </div>

            <p className="text-gray-200 mb-6 line-clamp-3 min-h-[4.5rem] tracking-wide leading-relaxed font-medium">{task.description}</p>

            <div className="flex justify-between items-center text-sm text-gray-400 border-t border-white/10 pt-4 mt-auto">
                <span className="font-mono text-xs">{new Date(task.createdAt).toLocaleDateString()}</span>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/20 text-white hover:text-[#00ff9d] transition-all"
                        title="Edit"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(task._id)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 text-white hover:text-red-400 transition-all"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
