import { useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Download, RefreshCw, Settings2 } from 'lucide-react'

const QrGenerator = () => {
    const [text, setText] = useState('')
    const [fgColor, setFgColor] = useState('#000000')
    const [bgColor, setBgColor] = useState('#ffffff')
    const [size, setSize] = useState(300)

    const downloadQR = (extension = 'png') => {
        const canvas = document.getElementById('qr-code')
        if (!canvas) return

        const url = canvas.toDataURL(`image/${extension}`)
        const downloadLink = document.createElement('a')
        downloadLink.href = url
        downloadLink.download = `qrcode.${extension}`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
    }

    return (
        <div className="container mx-auto max-w-5xl p-4 min-h-[80vh] flex flex-col justify-center">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold mb-2 flex items-center justify-center gap-3">
                    <Settings2 className="text-primary" />
                    QR Generator
                </h1>
                <p className="opacity-70">Create custom QR codes with colors and styles</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Controls Section */}
                <div className="card bg-base-100 shadow-xl lg:col-span-1 h-fit">
                    <div className="card-body">
                        <h2 className="card-title mb-4">Configuration</h2>

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text font-medium">Content</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered h-32 resize-none focus:border-primary"
                                placeholder="Enter text or URL..."
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </div>

                        <div className="divider my-2"></div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Foreground</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={fgColor}
                                        onChange={(e) => setFgColor(e.target.value)}
                                        className="w-10 h-10 rounded-lg cursor-pointer border-none"
                                    />
                                    <span className="text-xs opacity-70 uppercase">{fgColor}</span>
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Background</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={bgColor}
                                        onChange={(e) => setBgColor(e.target.value)}
                                        className="w-10 h-10 rounded-lg cursor-pointer border-none"
                                    />
                                    <span className="text-xs opacity-70 uppercase">{bgColor}</span>
                                </div>
                            </div>
                        </div>

                        <div className="card-actions justify-end mt-6">
                            <button
                                className="btn btn-ghost btn-sm gap-2"
                                onClick={() => {
                                    setText('')
                                    setFgColor('#000000')
                                    setBgColor('#ffffff')
                                }}
                            >
                                <RefreshCw size={16} /> Reset
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="card bg-base-100 shadow-xl lg:col-span-2">
                    <div className="card-body items-center justify-center min-h-[400px] bg-base-200/30 rounded-box m-4">
                        {text ? (
                            <div className="flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-300">
                                <div className="p-8 bg-white rounded-xl shadow-lg">
                                    <QRCodeCanvas
                                        id="qr-code"
                                        value={text}
                                        size={size}
                                        fgColor={fgColor}
                                        bgColor={bgColor}
                                        level={"H"}
                                        includeMargin={true}
                                    />
                                </div>

                                <div className="flex flex-wrap justify-center gap-4">
                                    <button
                                        className="btn btn-primary gap-2"
                                        onClick={() => downloadQR('png')}
                                    >
                                        <Download size={20} /> Download PNG
                                    </button>
                                    <button
                                        className="btn btn-outline gap-2"
                                        onClick={() => downloadQR('jpg')}
                                    >
                                        <Download size={20} /> Download JPG
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center opacity-40 text-center">
                                <Settings2 size={64} className="mb-4" />
                                <h3 className="text-xl font-bold">No Content</h3>
                                <p>Enter text in the configuration panel to generate a QR code</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QrGenerator
