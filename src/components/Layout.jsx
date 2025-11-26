import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ToastContainer from './ToastContainer'

const Layout = () => {
    return (
        <div className="min-h-screen bg-base-200 font-sans text-base-content flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default Layout
