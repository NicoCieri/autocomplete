function HighlightSubstring({ text, substring }: { text: string; substring: string }) {
  const parts = (text || '').split(new RegExp(`(${substring})`, 'gi'))

  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === substring.toLowerCase() ? (
          <span key={index} style={{ backgroundColor: 'yellow' }}>
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  )
}

export default HighlightSubstring
