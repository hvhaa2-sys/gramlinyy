import { useCallback, useEffect, useState } from 'react'

const prefix = 'shield-checklist:'

export function useChecklistStorage(platformId: string, itemIds: string[]) {
  const key = `${prefix}${platformId}`

  const [checked, setChecked] = useState<Record<string, boolean>>(() => {
    try {
      const raw = localStorage.getItem(key)
      if (raw) return JSON.parse(raw) as Record<string, boolean>
    } catch {
      /* ignore */
    }
    return {}
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(checked))
    } catch {
      /* ignore */
    }
  }, [key, checked])

  const toggle = useCallback((itemId: string) => {
    setChecked((prev) => ({ ...prev, [itemId]: !prev[itemId] }))
  }, [])

  const doneCount = itemIds.filter((id) => checked[id]).length
  const total = itemIds.length

  const reset = useCallback(() => {
    setChecked({})
    try {
      localStorage.removeItem(key)
    } catch {
      /* ignore */
    }
  }, [key])

  return { checked, toggle, doneCount, total, reset }
}
