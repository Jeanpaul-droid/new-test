import { useState, useEffect } from 'react'
import { Lock, Copy, RefreshCw, Check, ShieldCheck, ShieldAlert, Shield } from 'lucide-react'
import { useToast } from '../context/ToastContext'

const PasswordGenerator = () => {
    const { addToast } = useToast()
    const [password, setPassword] = useState('')
    const [length, setLength] = useState(16)
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    })
    const [strength, setStrength] = useState('strong')

    const generatePassword = () => {
        const charset = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
        }

        let chars = ''
        if (options.uppercase) chars += charset.uppercase
        if (options.lowercase) chars += charset.lowercase
        if (options.numbers) chars += charset.numbers
        if (options.symbols) chars += charset.symbols

        if (chars === '') {
            setPassword('')
            return
        }

        let generated = ''
        for (let i = 0; i < length; i++) {
            generated += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        setPassword(generated)
        calculateStrength(generated)
    }

    const calculateStrength = (pass) => {
        let score = 0
        if (pass.length > 8) score++
        if (pass.length > 12) score++
        if (/[A-Z]/.test(pass)) score++
        if (/[0-9]/.test(pass)) score++
        if (/[^A-Za-z0-9]/.test(pass)) score++

        if (score >= 5) setStrength('strong')
        else if (score >= 3) setStrength('medium')
        else setStrength('weak')
    }

    useEffect(() => {
        generatePassword()
    }, [length, options])

    const copyToClipboard = () => {
        if (!password) return
        navigator.clipboard.writeText(password)
        addToast('Password copied to clipboard!', 'success')
    }

    const handleOptionChange = (key) => {
        setOptions(prev => {
            const newOptions = { ...prev, [key]: !prev[key] }
            // Prevent unchecking all options
            if (!Object.values(newOptions).some(Boolean)) return prev
            return newOptions
        })
    }

    const getStrengthColor = () => {
        switch (strength) {
            case 'strong': return 'text-success'
            case 'medium': return 'text-warning'
            case 'weak': return 'text-error'
            default: return 'text-base-content'
        }
    }

    const getStrengthIcon = () => {
        switch (strength) {
            case 'strong': return <ShieldCheck size={24} className="text-success" />
            case 'medium': return <Shield size={24} className="text-warning" />
            case 'weak': return <ShieldAlert size={24} className="text-error" />
            default: return null
        }
    }

    return (
        <div className="container mx-auto max-w-4xl p-4 min-h-[80vh] flex flex-col justify-center">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
                    <Lock className="text-primary" />
                    Password Generator
                </h1>
                <p className="opacity-70">Generate secure, random passwords instantly</p>
            </div>

            <div className="card bg-base-100 shadow-2xl border border-base-content/5">
                <div className="card-body p-8">
                    {/* Password Display */}
                    <div className="relative mb-8">
                        <div className="bg-base-200/50 p-6 rounded-2xl border border-base-content/10 flex items-center justify-between gap-4">
                            <span className="font-mono text-2xl break-all font-bold tracking-wider">{password}</span>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={generatePassword}
                                    className="btn btn-ghost btn-circle hover:bg-base-content/10"
                                    title="Regenerate"
                                >
                                    <RefreshCw size={20} />
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className="btn btn-primary btn-circle shadow-lg shadow-primary/20"
                                    title="Copy"
                                >
                                    <Copy size={20} />
                                </button>
                            </div>
                        </div>
                        <div className={`absolute -bottom-6 left-2 text-sm font-medium flex items-center gap-2 ${getStrengthColor()}`}>
                            {getStrengthIcon()}
                            <span className="uppercase tracking-wide">{strength} Password</span>
                        </div>
                    </div>

                    <div className="divider my-8"></div>

                    {/* Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold mb-4">Password Length: {length}</h3>
                            <input
                                type="range"
                                min="6"
                                max="32"
                                value={length}
                                onChange={(e) => setLength(parseInt(e.target.value))}
                                className="range range-primary range-sm"
                            />
                            <div className="w-full flex justify-between text-xs px-2 mt-2 opacity-50">
                                <span>6</span>
                                <span>12</span>
                                <span>18</span>
                                <span>24</span>
                                <span>32</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(options).map(([key, value]) => (
                                <label key={key} className="label cursor-pointer justify-start gap-3 p-3 rounded-lg hover:bg-base-200/50 transition-colors border border-transparent hover:border-base-content/5">
                                    <input
                                        type="checkbox"
                                        checked={value}
                                        onChange={() => handleOptionChange(key)}
                                        className="checkbox checkbox-primary checkbox-sm"
                                    />
                                    <span className="label-text capitalize font-medium">{key}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordGenerator
