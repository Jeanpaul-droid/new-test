import { Link } from 'react-router-dom'
import { Home, AlertTriangle } from 'lucide-react'

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-4">
            <div className="mb-8 relative">
                <div className="absolute inset-0 bg-error/20 blur-3xl rounded-full"></div>
                <AlertTriangle size={120} className="text-error relative z-10" />
            </div>

            <h1 className="text-9xl font-black mb-4 opacity-10">404</h1>
            <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
            <p className="text-xl opacity-60 mb-8 max-w-md">
                Oops! The page you are looking for might have been removed or is temporarily unavailable.
            </p>

            <Link to="/" className="btn btn-primary btn-lg gap-2 rounded-full px-8">
                <Home size={20} />
                Go Back Home
            </Link>
        </div>
    )
}

export default NotFound
