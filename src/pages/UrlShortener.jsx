import { useState, useEffect } from 'react'
import { Link as LinkIcon, Copy, Check, ExternalLink, History, Trash2, ArrowRight } from 'lucide-react'

const UrlShortener = () => {
    const [url, setUrl] = useState('')
    const [shortUrl, setShortUrl] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [history, setHistory] = useState([])

    useEffect(() => {
        const savedHistory = localStorage.getItem('shortener_history')
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory))
        }
    }, [])

    const saveToHistory = (original, short) => {
        const newItem = {
            id: Date.now(),
            original,
            short,
            timestamp: new Date().toISOString()
        }
        const newHistory = [newItem, ...history].slice(0, 10) // Keep last 10
        setHistory(newHistory)
        localStorage.setItem('shortener_history', JSON.stringify(newHistory))
    }

    const clearHistory = () => {
        setHistory([])
        localStorage.removeItem('shortener_history')
    }

    const handleShorten = (e) => {
        e.preventDefault()
        if (!url) return

        setIsLoading(true)
        setTimeout(() => {
            const randomId = Math.random().toString(36).substring(7)
            const result = `https://short.url/${randomId}`
            setShortUrl(result)
            saveToHistory(url, result)
            setIsLoading(false)
        }, 800)
    }

    const copyToClipboard = (text) => {
        if (!text) return
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="container mx-auto max-w-4xl p-4 min-h-[60vh] flex flex-col justify-center">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">URL Shortener</h1>
                <p className="opacity-70">Paste your long link below</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Shortener Area */}
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <form onSubmit={handleShorten}>
                                <div className="join w-full">
                                    <input
                                        type="url"
                                        placeholder="https://example.com/very/long/url..."
                                        className="input input-bordered join-item w-full focus:outline-none"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-primary join-item"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <span className="loading loading-spinner"></span> : 'Shorten'}
                                    </button>
                                </div>
                            </form>

                            {shortUrl && (
                                <div className="mt-6 p-4 bg-base-200 rounded-lg flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-4">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs opacity-50 mb-1">Shortened URL</p>
                                        <a href={url} target="_blank" rel="noopener noreferrer" className="link link-primary font-bold truncate block">
                                            {shortUrl}
                                        </a>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            className="btn btn-sm btn-ghost btn-square"
                                            onClick={() => window.open(url, '_blank')}
                                        >
                                            <ExternalLink size={16} />
                                        </button>
                                        <button
                                            className="btn btn-sm btn-primary btn-square"
                                            onClick={() => copyToClipboard(shortUrl)}
                                        >
                                            {copied ? <Check size={16} /> : <Copy size={16} />}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* History Sidebar */}
                <div className="lg:col-span-1">
                    <div className="card bg-base-100 shadow-xl h-full max-h-[500px] flex flex-col">
                        <div className="card-body p-4 flex-none border-b border-base-content/5">
                            <div className="flex items-center justify-between">
                                <h2 className="card-title text-lg flex items-center gap-2">
                                    <History size={20} /> Recent
                                </h2>
                                {history.length > 0 && (
                                    <button
                                        onClick={clearHistory}
                                        className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                                    >
                                        <Trash2 size={14} /> Clear
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="overflow-y-auto flex-1 p-2 custom-scrollbar">
                            {history.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-40 p-8 text-center">
                                    <History size={48} className="mb-4" />
                                    <p>No recent links</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {history.map((item) => (
                                        <div key={item.id} className="p-3 rounded-lg bg-base-200/50 hover:bg-base-200 transition-colors border border-base-content/5">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs opacity-50">{new Date(item.timestamp).toLocaleDateString()}</span>
                                                <button
                                                    className="btn btn-ghost btn-xs btn-square"
                                                    onClick={() => copyToClipboard(item.short)}
                                                >
                                                    <Copy size={12} />
                                                </button>
                                            </div>
                                            <p className="text-xs opacity-70 truncate mb-1">{item.original}</p>
                                            <div className="flex items-center gap-2 text-primary font-medium text-sm">
                                                <ArrowRight size={12} />
                                                <span className="truncate">{item.short}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UrlShortener
