function parseListText(text) {
  // Separar por números con punto, capturando números seguidos de punto y espacio
  // Este split elimina la parte del número, por eso se reconstruye luego con i+1.
  const items = text.split(/\s*\d+\.\s*/).filter(Boolean)

  if (items.length > 1) {
    return (
      <>
        {items.map((item, i) => (
          <p key={i} className="mb-2">
            {`${i + 1}. ${item.trim()}`}
          </p>
        ))}
      </>
    )
  }

  return text
}


export default function ChatContainer({ messages, visible }) {
  if (!visible) return null

  return (
    <div className="w-full max-w-md mx-auto space-y-3 pb-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg max-w-[80%] ${
            msg.isUser
              ? 'ml-auto bg-purple-600 text-white'
              : 'mr-auto bg-white/20 text-white backdrop-blur-sm'
          }`}
        >
          {msg.isUser ? (
            msg.text
          ) : (
            parseListText(msg.text)
          )}
        </div>
      ))}
    </div>
  )
}
