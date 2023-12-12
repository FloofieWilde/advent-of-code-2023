export function nl2br (str, isXhtml) {
  if (typeof str === 'undefined' || str === null) {
    return ''
  }
  const breakTag = (isXhtml || typeof isXhtml === 'undefined') ? '<br />' : '<br>'
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2')
}
