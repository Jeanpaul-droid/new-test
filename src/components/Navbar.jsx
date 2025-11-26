import { NavLink, Link } from 'react-router-dom'
import { Menu, QrCode, Languages, Link as LinkIcon, X, Book, Command, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'night')

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => prev === 'night' ? 'winter' : 'night')
    }

    const navItems = [
        { path: '/', label: 'Home', icon: null },
        { path: '/qr', label: 'QR Generator', icon: QrCode },
        { path: '/translate', label: 'Translator', icon: Languages },
        { path: '/shorten', label: 'Shortener', icon: LinkIcon },
        { path: '/docs', label: 'Docs', icon: Book },
    ]

    return (
        <nav className="sticky top-0 z-50 w-full bg-base-100/60 backdrop-blur-xl border-b border-white/5 supports-[backdrop-filter]:bg-base-100/60">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg group-hover:shadow-primary/40 transition-all duration-300">
                            <Command size={20} strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-base-content to-base-content/70">
                            Tools-kits
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
                                        ? 'bg-primary/10 text-primary shadow-sm'
                                        : 'text-base-content/70 hover:text-base-content hover:bg-base-content/5'
                                    }`
                                }
                            >
                                {item.icon && <item.icon size={16} />}
                                {item.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-base-content/5 transition-colors mr-2 text-base-content/70 hover:text-primary"
                        aria-label="Toggle Theme"
                    >
                        {theme === 'night' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-base-content/5 transition-colors"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-b border-white/5 bg-base-100/95 backdrop-blur-xl overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                                            ? 'bg-primary/10 text-primary'
                                            : 'text-base-content/70 hover:bg-base-content/5'
                                        }`
                                    }
                                >
                                    {item.icon && <item.icon size={20} />}
                                    <span className="font-medium">{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
