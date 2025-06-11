function parseListText(text) {
  // RegEx captura números seguidos de punto y espacio o salto de línea
  const items = text.split(/(?:\n|^)\s*\d+\.\s*/).filter(Boolean);

  // Si hay más de 1 ítem, renderizamos lista con saltos
  if (items.length > 1) {
    return (
      <>
        {items.map((item, i) => (
          <p key={i} className="mb-2">
            {`${i + 1}. ${item.trim()}`}
          </p>
        ))}
      </>
    );
  }

  // Si no detecta lista, devuelve texto simple
  return text;
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
