import { useState, useEffect } from 'react'
import { ArrowRightLeft, Copy, Check, Languages, History, Trash2 } from 'lucide-react'

const Translator = () => {
    const [inputText, setInputText] = useState('')
    const [translatedText, setTranslatedText] = useState('')
    const [isTranslating, setIsTranslating] = useState(false)
    const [copied, setCopied] = useState(false)
    const [direction, setDirection] = useState('fr-en') // 'fr-en' or 'en-fr'
    const [history, setHistory] = useState([])

    useEffect(() => {
        const savedHistory = localStorage.getItem('translator_history')
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory))
        }
    }, [])

    const saveToHistory = (original, translated, dir) => {
        const newItem = {
            id: Date.now(),
            original,
            translated,
            direction: dir,
            timestamp: new Date().toISOString()
        }
        const newHistory = [newItem, ...history].slice(0, 10) // Keep last 10
        setHistory(newHistory)
        localStorage.setItem('translator_history', JSON.stringify(newHistory))
    }

    const clearHistory = () => {
        setHistory([])
        localStorage.removeItem('translator_history')
    }

    const handleTranslate = async () => {
        if (!inputText) return

        setIsTranslating(true)
        try {
            const langPair = direction === 'fr-en' ? 'fr|en' : 'en|fr'
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${langPair}`)
            const data = await response.json()

            if (data.responseStatus === 200) {
                const result = data.responseData.translatedText
                setTranslatedText(result)
                saveToHistory(inputText, result, direction)
            } else {
                console.error('Translation error:', data.responseDetails)
                setTranslatedText('Error: Could not translate. Try again later.')
            }
        } catch (error) {
            console.error('Network error:', error)
            setTranslatedText('Error: Network issue.')
        } finally {
            setIsTranslating(false)
        }
    }

    const swapLanguages = () => {
        setDirection(prev => prev === 'fr-en' ? 'en-fr' : 'fr-en')
        setInputText(translatedText)
        setTranslatedText(inputText)
    }

    const copyToClipboard = () => {
        if (!translatedText) return
        navigator.clipboard.writeText(translatedText)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const loadFromHistory = (item) => {
        setDirection(item.direction)
        setInputText(item.original)
        setTranslatedText(item.translated)
    }

    return (
        <div className="container mx-auto max-w-6xl p-4 min-h-[80vh] flex flex-col justify-center">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
                    <Languages className="text-primary" />
                    Translator
                </h1>
                <p className="opacity-70">Professional French-English Translation</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Translation Area */}
                <div className="lg:col-span-2">
                    <div className="card bg-base-100 shadow-2xl border border-base-content/5">
                        <div className="card-body p-0">
                            {/* Header / Controls */}
                            <div className="bg-base-200/50 p-4 border-b border-base-content/5 flex items-center justify-between rounded-t-2xl">
                                <div className="flex items-center gap-4 flex-1 justify-center md:justify-start">
                                    <span className={`font-bold ${direction === 'fr-en' ? 'text-primary' : 'opacity-50'}`}>French</span>
                                    <button
                                        className="btn btn-circle btn-sm btn-ghost hover:bg-base-content/10"
                                        onClick={swapLanguages}
                                    >
                                        <ArrowRightLeft size={16} />
                                    </button>
                                    <span className={`font-bold ${direction === 'en-fr' ? 'text-primary' : 'opacity-50'}`}>English</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-base-content/5">
                                {/* Input Area */}
                                <div className="p-6">
                                    <textarea
                                        className="textarea textarea-ghost w-full h-64 text-xl resize-none focus:bg-transparent focus:outline-none placeholder:opacity-30"
                                        placeholder={direction === 'fr-en' ? "Entrez le texte ici..." : "Enter text here..."}
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                    ></textarea>
                                    <div className="flex justify-between items-center mt-4 text-sm opacity-50">
                                        <span>{inputText.length} chars</span>
                                        {inputText && (
                                            <button
                                                className="btn btn-xs btn-ghost"
                                                onClick={() => setInputText('')}
                                            >
                                                Clear
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Output Area */}
                                <div className="p-6 bg-base-200/30">
                                    {isTranslating ? (
                                        <div className="h-64 flex items-center justify-center">
                                            <span className="loading loading-dots loading-xl text-primary"></span>
                                        </div>
                                    ) : (
                                        <div className="relative h-full">
                                            <textarea
                                                className="textarea textarea-ghost w-full h-64 text-xl resize-none focus:bg-transparent focus:outline-none"
                                                placeholder="Translation..."
                                                value={translatedText}
                                                readOnly
                                            ></textarea>
                                            {translatedText && (
                                                <div className="absolute bottom-0 right-0">
                                                    <button
                                                        className="btn btn-sm btn-ghost gap-2"
                                                        onClick={copyToClipboard}
                                                    >
                                                        {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                                                        Copy
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Footer Action */}
                            <div className="p-4 border-t border-base-content/5 flex justify-end bg-base-200/30 rounded-b-2xl">
                                <button
                                    className="btn btn-primary px-8"
                                    onClick={handleTranslate}
                                    disabled={isTranslating || !inputText}
                                >
                                    Translate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* History Sidebar */}
                <div className="lg:col-span-1">
                    <div className="card bg-base-100 shadow-xl h-full max-h-[600px] flex flex-col">
                        <div className="card-body p-4 flex-none border-b border-base-content/5">
                            <div className="flex items-center justify-between">
                                <h2 className="card-title text-lg flex items-center gap-2">
                                    <History size={20} /> History
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
                                    <p>No translation history yet</p>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {history.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => loadFromHistory(item)}
                                            className="text-left p-3 rounded-lg hover:bg-base-200 transition-colors border border-base-content/5 group"
                                        >
                                            <div className="flex items-center gap-2 text-xs opacity-50 mb-1">
                                                <span className="uppercase font-bold">{item.direction}</span>
                                                <span>•</span>
                                                <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                                            </div>
                                            <p className="font-medium truncate text-sm mb-1">{item.original}</p>
                                            <p className="text-sm opacity-70 truncate text-primary group-hover:text-primary-focus">
                                                {item.translated}
                                            </p>
                                        </button>
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

export default Translator
