import { beforeEach, describe, expect, it, vi } from 'vitest'
import { scrollToId } from './scroll'

describe('scrollToId', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
    delete Element.prototype.scrollIntoView
  })

  it('scrolls the target element into view with smooth behavior', () => {
    const spy = vi.fn()
    Element.prototype.scrollIntoView = spy
    const section = document.createElement('section')
    section.id = 'wizard'
    document.body.appendChild(section)

    scrollToId('wizard')

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy.mock.calls[0][0]).toEqual({ behavior: 'smooth', block: 'start' })
  })

  it('does nothing and does not throw when the element does not exist', () => {
    const spy = vi.fn()
    Element.prototype.scrollIntoView = spy

    expect(() => scrollToId('missing')).not.toThrow()
    expect(spy).not.toHaveBeenCalled()
  })
})