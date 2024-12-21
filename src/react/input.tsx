import type { RefObject } from 'react'

export function setCaret<T extends HTMLElement>(ref: RefObject<T>) {
  if (!ref.current || !ref.current.firstChild) return

  const startNode = ref.current.firstChild.firstChild
  const endNode = ref.current.childNodes[2].firstChild

  if (!startNode || !endNode) return

  const range = document.createRange()
  range.setStart(startNode, 6) // 6 is the offset of "world" within "Hello world"
  range.setEnd(endNode, 7) // 7 is the length of "this is"

  const sel = window.getSelection()

  if (sel) {
    sel.removeAllRanges()
    sel.addRange(range)
  }

  return

  // const range = document.createRange()
  // const sel = window.getSelection()

  // range.setStart(ref.current, 5)
  // range.collapse(true)

  // if (sel) {
  //   sel.removeAllRanges()
  //   sel.addRange(range)
  // }
}
