export function createSlider<T>(items: T[]) {
  let current = 0
  const total = items.length
  let startX = 0
  let deltaX = 0
  let isDragging = false

  const next = () => {
    current = (current + 1) % total
    return current
  }

  const prev = () => {
    current = (current - 1 + total) % total
    return current
  }

  const goTo = (i: number) => {
    if (i >= 0 && i < total) current = i
    return current
  }

  const handleStart = (e: TouchEvent | MouseEvent) => {
    startX = 'touches' in e ? e.touches[0].clientX : e.clientX
    isDragging = true
  }

  const handleMove = (
    e: TouchEvent | MouseEvent,
    onMove?: (offsetPercent: number) => void
  ) => {
    if (!isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    deltaX = clientX - startX
    if (onMove) {
      const offsetPercent = (deltaX / window.innerWidth) * 100
      onMove(offsetPercent)
    }
  }

  const handleEnd = () => {
    isDragging = false
    if (Math.abs(deltaX) > 50) {
      const dir = deltaX < 0 ? 'next' : 'prev'
      deltaX = 0
      return dir
    }
    deltaX = 0
    return null
  }

  return {
    getCurrent: () => current,
    next,
    prev,
    goTo,
    handleStart,
    handleMove,
    handleEnd,
  }
}
