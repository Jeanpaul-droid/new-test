import { useState, useEffect } from 'react'
import { Book, Code, Layers, Layout as LayoutIcon, Terminal, Check, ChevronRight, Menu } from 'lucide-react'

const Docs = () => {
    const [activeSection, setActiveSection] = useState('intro')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const sections = [
        { id: 'intro', title: 'Introduction', icon: Book },
        { id: 'getting-started', title: 'Getting Started', icon: Terminal },
        { id: 'architecture', title: 'Architecture', icon: Layers },
        { id: 'components', title: 'Components', icon: LayoutIcon },
        { id: 'styling', title: 'Styling', icon: Code },
    ]

    // Close mobile menu when section changes
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [activeSection])

    return (
        <div className="min-h-screen bg-base-200">
            <div className="container mx-auto max-w-7xl px-4 py-8 flex flex-col lg:flex-row gap-8">

                {/* Mobile Menu Button */}
                <div className="lg:hidden mb-4">
                    <button
                        className="btn btn-block justify-between"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="flex items-center gap-2">
                            <Menu size={20} /> Menu
                        </span>
                        <ChevronRight size={16} className={`transition-transform ${isMobileMenuOpen ? 'rotate-90' : ''}`} />
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <aside className={`lg:w-64 flex-shrink-0 ${isMobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
                    <div className="sticky top-24 card bg-base-100 shadow-xl border border-base-content/5">
                        <div className="card-body p-4">
                            <h2 className="text-xs font-bold uppercase opacity-50 mb-4 px-4 tracking-wider">Documentation</h2>
                            <ul className="menu bg-base-100 w-full rounded-box gap-1 p-0">
                                {sections.map((section) => (
                                    <li key={section.id}>
                                        <button
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeSection === section.id
                                                    ? 'bg-primary text-primary-content shadow-md'
                                                    : 'hover:bg-base-200'
                                                }`}
                                            onClick={() => setActiveSection(section.id)}
                                        >
                                            <section.icon size={18} />
                                            <span className="font-medium">{section.title}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0">
                    <div className="card bg-base-100 shadow-xl border border-base-content/5 min-h-[80vh]">
                        <div className="card-body p-8 lg:p-12 prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary">

                            {activeSection === 'intro' && (
                                <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center gap-3 mb-6 text-primary">
                                        <Book size={32} />
                                        <h1 className="m-0">Introduction</h1>
                                    </div>
                                    <p className="lead text-xl opacity-80">
                                        Welcome to the <strong>Tools-kits</strong> documentation. This application is a modern collection of essential web tools designed for speed and simplicity.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-8">
                                        <div className="p-6 rounded-xl bg-base-200/50 border border-base-content/5">
                                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                                <Check size={18} className="text-success" /> Modern Stack
                                            </h3>
                                            <p className="text-sm opacity-70">Built with React 19, Vite, and Tailwind CSS for maximum performance.</p>
                                        </div>
                                        <div className="p-6 rounded-xl bg-base-200/50 border border-base-content/5">
                                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                                <Check size={18} className="text-success" /> Privacy Focused
                                            </h3>
                                            <p className="text-sm opacity-70">All processing happens locally or via secure, stateless APIs.</p>
                                        </div>
                                    </div>

                                    <h2>Core Features</h2>
                                    <ul>
                                        <li><strong>QR Generator:</strong> Create customizable QR codes instantly.</li>
                                        <li><strong>Translator:</strong> Real-time translation using MyMemory API.</li>
                                        <li><strong>URL Shortener:</strong> Efficient link shortening with history.</li>
                                    </ul>
                                </article>
                            )}

                            {activeSection === 'getting-started' && (
                                <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center gap-3 mb-6 text-primary">
                                        <Terminal size={32} />
                                        <h1 className="m-0">Getting Started</h1>
                                    </div>
                                    <p>Follow these steps to get the project running on your local machine.</p>

                                    <h3>Prerequisites</h3>
                                    <ul>
                                        <li>Node.js 18+</li>
                                        <li>npm or yarn</li>
                                    </ul>

                                    <h3>Installation</h3>
                                    <div className="mockup-code bg-[#1e1e1e] text-gray-300 not-prose my-6 shadow-lg">
                                        <pre data-prefix="$"><code>git clone https://github.com/yourusername/tools-kits.git</code></pre>
                                        <pre data-prefix="$"><code>cd tools-kits</code></pre>
                                        <pre data-prefix="$"><code>npm install</code></pre>
                                        <pre data-prefix="$" className="text-success"><code>npm run dev</code></pre>
                                    </div>

                                    <div className="alert alert-info shadow-lg">
                                        <Terminal size={24} />
                                        <span>The development server will start at <code>http://localhost:5173</code></span>
                                    </div>
                                </article>
                            )}

                            {activeSection === 'architecture' && (
                                <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center gap-3 mb-6 text-primary">
                                        <Layers size={32} />
                                        <h1 className="m-0">Architecture</h1>
                                    </div>

                                    <p>The project follows a standard feature-based directory structure.</p>

                                    <div className="not-prose bg-base-200 p-6 rounded-xl font-mono text-sm my-6 border border-base-content/5">
                                        <ul className="space-y-2">
                                            <li><span className="text-primary">src/</span></li>
                                            <li className="pl-4">├── <span className="text-secondary">components/</span> <span className="opacity-50">// Reusable UI components</span></li>
                                            <li className="pl-4">├── <span className="text-secondary">pages/</span> <span className="opacity-50">// Route components (views)</span></li>
                                            <li className="pl-4">├── <span className="text-secondary">assets/</span> <span className="opacity-50">// Static assets</span></li>
                                            <li className="pl-4">├── <span className="text-warning">App.jsx</span> <span className="opacity-50">// Main application entry</span></li>
                                            <li className="pl-4">└── <span className="text-warning">main.jsx</span> <span className="opacity-50">// React DOM root</span></li>
                                        </ul>
                                    </div>

                                    <h3>Key Technologies</h3>
                                    <div className="overflow-x-auto not-prose">
                                        <table className="table table-zebra w-full border border-base-content/5 rounded-lg">
                                            <thead>
                                                <tr>
                                                    <th>Tech</th>
                                                    <th>Usage</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="font-bold">React Router</td>
                                                    <td>Client-side routing</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-bold">Framer Motion</td>
                                                    <td>Animations and transitions</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-bold">Lucide React</td>
                                                    <td>Iconography</td>
                                                </tr>
                                                <tr>
                                                    <td className="font-bold">Zustand / Context</td>
                                                    <td>State Management (if applicable)</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </article>
                            )}

                            {activeSection === 'components' && (
                                <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center gap-3 mb-6 text-primary">
                                        <LayoutIcon size={32} />
                                        <h1 className="m-0">Components</h1>
                                    </div>

                                    <h3>Layout System</h3>
                                    <p>The application uses a master layout component to maintain consistency.</p>

                                    <div className="collapse collapse-plus bg-base-200 mb-4 border border-base-content/5">
                                        <input type="radio" name="comps" defaultChecked />
                                        <div className="collapse-title text-xl font-medium">
                                            Layout.jsx
                                        </div>
                                        <div className="collapse-content">
                                            <p>Wraps the entire application. Handles the sticky Navbar, the main content area (Outlet), and the Footer.</p>
                                        </div>
                                    </div>

                                    <div className="collapse collapse-plus bg-base-200 mb-4 border border-base-content/5">
                                        <input type="radio" name="comps" />
                                        <div className="collapse-title text-xl font-medium">
                                            Navbar.jsx
                                        </div>
                                        <div className="collapse-content">
                                            <p>Responsive navigation bar. Features a glassmorphism effect, mobile hamburger menu, and active link highlighting.</p>
                                        </div>
                                    </div>

                                    <h3>Feature Components</h3>
                                    <p>Each tool is encapsulated in its own page component.</p>
                                    <ul className="list-disc pl-5 space-y-2">
                                        <li><strong>QrGenerator.jsx:</strong> Uses <code>qrcode.react</code> canvas rendering.</li>
                                        <li><strong>Translator.jsx:</strong> Handles API state and local storage history.</li>
                                        <li><strong>UrlShortener.jsx:</strong> Manages input validation and history persistence.</li>
                                    </ul>
                                </article>
                            )}

                            {activeSection === 'styling' && (
                                <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    <div className="flex items-center gap-3 mb-6 text-primary">
                                        <Code size={32} />
                                        <h1 className="m-0">Styling</h1>
                                    </div>

                                    <p>We use a combination of <strong>Tailwind CSS</strong> for utility classes and <strong>DaisyUI</strong> for component primitives.</p>

                                    <h3>Theme Configuration</h3>
                                    <p>The application uses the <code>night</code> theme from DaisyUI by default.</p>

                                    <div className="mockup-code bg-[#1e1e1e] text-gray-300 not-prose my-6">
                                        <pre data-prefix="1"><code>// tailwind.config.js</code></pre>
                                        <pre data-prefix="2"><code>module.exports = &#123;</code></pre>
                                        <pre data-prefix="3"><code>  plugins: [require("daisyui")],</code></pre>
                                        <pre data-prefix="4"><code>  daisyui: &#123;</code></pre>
                                        <pre data-prefix="5" className="bg-warning/20"><code>    themes: ["night"],</code></pre>
                                        <pre data-prefix="6"><code>  &#125;,</code></pre>
                                        <pre data-prefix="7"><code>&#125;</code></pre>
                                    </div>

                                    <h3>Custom Utilities</h3>
                                    <p>Custom animations and glassmorphism effects are defined in <code>index.css</code> or via Tailwind arbitrary values.</p>
                                </article>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Docs
