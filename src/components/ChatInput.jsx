import { useState, useRef, useEffect } from 'react'

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 240) + 'px'
    }
  }, [message])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (message.trim()) {
      onSend(message)
      setMessage('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message"
          className="w-full p-4 pr-24 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none overflow-y-auto max-h-25 resize-none"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          Generate
        </button>
      </div>
    </form>
  )
}
