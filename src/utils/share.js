export const sharePrediction = (match, prediction, result) => {
  const text = `My World Cup 2026 Prediction: ${match} - ${prediction} (${result}) 🏆⚽`
  const url = window.location.href
  
  if (navigator.share) {
    navigator.share({
      title: 'World Cup 2026 Prediction',
      text: text,
      url: url
    }).catch(console.error)
  } else {
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(`${text} ${url}`).then(() => {
      alert('Prediction copied to clipboard!')
    }).catch(console.error)
  }
}

export const shareBracket = (champion) => {
  const text = `My World Cup 2026 Bracket Prediction: ${champion} will win it all! 🏆🥇`
  const url = window.location.href
  
  if (navigator.share) {
    navigator.share({
      title: 'World Cup 2026 Bracket',
      text: text,
      url: url
    }).catch(console.error)
  } else {
    navigator.clipboard.writeText(`${text} ${url}`).then(() => {
      alert('Bracket prediction copied to clipboard!')
    }).catch(console.error)
  }
}

export const shareDreamXI = (players) => {
  const text = `My World Cup 2026 Dream XI: ${players.join(', ')} ⭐`
  const url = window.location.href
  
  if (navigator.share) {
    navigator.share({
      title: 'World Cup 2026 Dream XI',
      text: text,
      url: url
    }).catch(console.error)
  } else {
    navigator.clipboard.writeText(`${text} ${url}`).then(() => {
      alert('Dream XI copied to clipboard!')
    }).catch(console.error)
  }
}
