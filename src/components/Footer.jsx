import { Link } from 'react-router-dom'
import { Github, Twitter, Command } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-base-200/50 border-t border-base-content/5 mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg">
                            <Command size={20} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Tools-kits</h3>
                            <p className="text-sm opacity-60">Simple tools for everyday tasks</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 text-sm font-medium opacity-70">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <Link to="/qr" className="hover:text-primary transition-colors">QR Generator</Link>
                        <Link to="/translate" className="hover:text-primary transition-colors">Translator</Link>
                        <Link to="/shorten" className="hover:text-primary transition-colors">Shortener</Link>
                    </div>

                    <div className="flex gap-4">
                        <a href="#" className="btn btn-ghost btn-sm btn-circle hover:text-primary">
                            <Github size={20} />
                        </a>
                        <a href="#" className="btn btn-ghost btn-sm btn-circle hover:text-primary">
                            <Twitter size={20} />
                        </a>
                    </div>
                </div>

                <div className="divider my-4"></div>

                <div className="text-center text-sm opacity-50 flex items-center justify-center gap-1">
                    <p>{new Date().getFullYear()} Tools-kits. Made with</p>
                    <p>by Antigravity</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
