import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import Subtitle from './components/Subtitle'
import ChatInput from './components/ChatInput'
import ChatContainer from './components/ChatContainer'

function App() {
  const [messages, setMessages] = useState([])
  const [hasInteracted, setHasInteracted] = useState(false)
  const chatContainerRef = useRef(null)

  // Agrega mensaje del usuario
  const handleSendMessage = async (message) => {
    if (!hasInteracted) setHasInteracted(true)
    
    setMessages(prev => [...prev, { text: message, isUser: true }])
    
    try {
      // Llama a tu backend Flask
      const res = await fetch('http://localhost:8080/api/consultar-ia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: message })
      })

      const data = await res.json()

      if (res.ok) {
        setMessages(prev => [...prev, { text: data.response, isUser: false }])
      } else {
        setMessages(prev => [...prev, { text: `Error: ${data.error}`, isUser: false }])
      }

    } catch (error) {
      setMessages(prev => [...prev, { text: 'Error de conexión con el servidor.', isUser: false }])
    }
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-400 flex flex-col p-4">
      {/* Contenido inicial centrado */}
      {!hasInteracted ? (
        <div className="flex-grow flex flex-col justify-center items-center text-center space-y-6">
          <div>
            <Header />
            <Subtitle />
          </div>
          <ChatInput onSend={handleSendMessage} centered />
        </div>
      ) : (
        <>
          {/* Header fijo arriba */}
          <div className="text-center">
            <Header />
          </div>
      
          {/* Área de chat con scroll */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto py-4 max-h-[calc(100vh-220px)]"
          >
            <ChatContainer messages={messages} visible />
          </div>
      
          {/* Input en la parte inferior */}
          <div className="w-full flex justify-center mt-4">
            <ChatInput onSend={handleSendMessage} centered={false} />
          </div>
        </>
      )}
    </div>
  )
}

export default App