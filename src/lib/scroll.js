export function scrollToId(id) {
  const element = document.getElementById(id)
  element?.scrollIntoView?.({
    behavior: 'smooth',
    block: 'start',
  })
}