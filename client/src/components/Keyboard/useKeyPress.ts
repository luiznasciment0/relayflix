import { useEffect } from 'react'

type KeyPress = {
  key: string
  action: () => void
}

const useKeyPress = ({ key, action }: KeyPress) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === key) action()
      document.removeEventListener('keydown', onKeyDown)
    }

    const onKeyUp = () => {
      document.addEventListener('keydown', onKeyDown, { once: true })
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('keyup', onKeyUp)
    }
  }, [action, key])
}

export default useKeyPress
