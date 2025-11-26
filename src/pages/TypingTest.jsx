import { useState, useEffect, useRef } from 'react'
import { Keyboard, RefreshCw, Trophy, Timer, AlertCircle } from 'lucide-react'
import { useToast } from '../context/ToastContext'

const SAMPLE_TEXTS = [
    "The quick brown fox jumps over the lazy dog.",
    "To be or not to be, that is the question.",
    "All that glitters is not gold.",
    "A journey of a thousand miles begins with a single step.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "In the middle of difficulty lies opportunity.",
    "Life is what happens when you're busy making other plans."
]

const TypingTest = () => {
    const { addToast } = useToast()
    const [text, setText] = useState('')
    const [input, setInput] = useState('')
    const [startTime, setStartTime] = useState(null)
    const [wpm, setWpm] = useState(0)
    const [accuracy, setAccuracy] = useState(100)
    const [isFinished, setIsFinished] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        resetTest()
    }, [])

    const resetTest = () => {
        const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]
        setText(randomText)
        setInput('')
        setStartTime(null)
        setWpm(0)
        setAccuracy(100)
        setIsFinished(false)
        if (inputRef.current) inputRef.current.focus()
    }

    const handleChange = (e) => {
        const value = e.target.value
        if (isFinished) return

        if (!startTime) {
            setStartTime(Date.now())
        }

        setInput(value)
        calculateStats(value)

        if (value === text) {
            finishTest()
        }
    }

    const calculateStats = (currentInput) => {
        // Accuracy
        let errors = 0
        for (let i = 0; i < currentInput.length; i++) {
            if (currentInput[i] !== text[i]) errors++
        }
        const acc = Math.max(0, ((currentInput.length - errors) / currentInput.length) * 100)
        setAccuracy(isNaN(acc) ? 100 : Math.round(acc))

        // WPM
        if (startTime) {
            const timeElapsed = (Date.now() - startTime) / 60000 // in minutes
            const wordsTyped = currentInput.length / 5
            const currentWpm = Math.round(wordsTyped / timeElapsed)
            setWpm(currentWpm === Infinity ? 0 : currentWpm)
        }
    }

    const finishTest = () => {
        setIsFinished(true)
        addToast(`Test completed! ${wpm} WPM`, 'success')
    }

    const getCharClass = (index) => {
        if (index >= input.length) return 'opacity-50'
        return input[index] === text[index] ? 'text-success' : 'text-error bg-error/10'
    }

    return (
        <div className="container mx-auto max-w-4xl p-4 min-h-[80vh] flex flex-col justify-center">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
                    <Keyboard className="text-primary" />
                    Typing Speed Test
                </h1>
                <p className="opacity-70">Test your typing speed and accuracy</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-content/5">
                    <div className="stat-figure text-primary">
                        <Timer size={32} />
                    </div>
                    <div className="stat-title">WPM</div>
                    <div className="stat-value text-primary">{wpm}</div>
                    <div className="stat-desc">Words per minute</div>
                </div>

                <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-content/5">
                    <div className="stat-figure text-secondary">
                        <Trophy size={32} />
                    </div>
                    <div className="stat-title">Accuracy</div>
                    <div className="stat-value text-secondary">{accuracy}%</div>
                    <div className="stat-desc">Typing precision</div>
                </div>

                <div className="stat bg-base-100 shadow-xl rounded-2xl border border-base-content/5 cursor-pointer hover:bg-base-200 transition-colors" onClick={resetTest}>
                    <div className="stat-figure text-accent">
                        <RefreshCw size={32} />
                    </div>
                    <div className="stat-title">Reset</div>
                    <div className="stat-value text-accent text-2xl">New Test</div>
                    <div className="stat-desc">Click to restart</div>
                </div>
            </div>

            <div className="card bg-base-100 shadow-2xl border border-base-content/5">
                <div className="card-body p-8">
                    <div className="mb-6 text-2xl font-mono leading-relaxed p-6 bg-base-200/30 rounded-xl border border-base-content/5 select-none relative">
                        {text.split('').map((char, index) => (
                            <span key={index} className={getCharClass(index)}>{char}</span>
                        ))}
                    </div>

                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={handleChange}
                        className="input input-bordered input-lg w-full font-mono text-xl focus:outline-none focus:border-primary"
                        placeholder="Start typing here..."
                        disabled={isFinished}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                    />

                    {isFinished && (
                        <div className="mt-4 alert alert-success">
                            <Trophy size={20} />
                            <span>Great job! You typed at {wpm} WPM with {accuracy}% accuracy.</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TypingTest
