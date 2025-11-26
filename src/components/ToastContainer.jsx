import { useToast } from '../context/ToastContext'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ToastContainer = () => {
    const { toasts, removeToast } = useToast()

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle size={18} />
            case 'error': return <AlertCircle size={18} />
            default: return <Info size={18} />
        }
    }

    const getColors = (type) => {
        switch (type) {
            case 'success': return 'alert-success text-success-content'
            case 'error': return 'alert-error text-error-content'
            default: return 'alert-info text-info-content'
        }
    }

    return (
        <div className="toast toast-end toast-bottom z-[100] flex flex-col gap-2 p-4">
            <AnimatePresence mode="popLayout">
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        layout
                        initial={{ opacity: 0, x: 20, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.9 }}
                        className={`alert ${getColors(toast.type)} shadow-lg min-w-[300px] flex items-center gap-3 p-3 rounded-xl border border-white/10 backdrop-blur-md`}
                    >
                        {getIcon(toast.type)}
                        <span className="font-medium text-sm flex-1">{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            className="btn btn-ghost btn-xs btn-circle hover:bg-black/10"
                        >
                            <X size={14} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    )
}

export default ToastContainer
