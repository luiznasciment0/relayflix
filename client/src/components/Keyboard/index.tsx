import { useSearch } from 'context/searchContext'
import React, { useEffect, useState } from 'react'
import KeyboardKey from './Key'

import { keyboardKeys } from './keyboardKeys'
import { Keyboard as StyledKeyboard, SearchValue } from './styles'
import useKeyPress from './useKeyPress'

type Props = {
  leftColumnRef: React.RefObject<HTMLDivElement>
}

const rowLength = 6

const Keyboard = ({ leftColumnRef }: Props) => {
  const [inputValue, setInputValue] = useState('')
  const [cursor, setCursor] = useState(0)
  const { setSearchValue } = useSearch()

  const currentItem = keyboardKeys[cursor]
  const rightItemsLength = rowLength - currentItem?.positionInRow
  const leftItemsLength = currentItem?.positionInRow - 1

  useEffect(() => {
    setSearchValue(inputValue)
  }, [inputValue, setSearchValue])

  useKeyPress({
    key: 'ArrowDown',
    action: () => {
      setCursor((prevState) => {
        const nextPosition = prevState + rightItemsLength + leftItemsLength + 1
        const exceededArray = nextPosition > keyboardKeys.length - 1

        return exceededArray ? keyboardKeys.length - 1 : nextPosition
      })
    }
  })

  useKeyPress({
    key: 'ArrowUp',
    action: () => {
      setCursor((prevState) => {
        const nextPosition = prevState - rightItemsLength - leftItemsLength - 1
        const exceededArray = nextPosition < 1

        return exceededArray ? 0 : nextPosition
      })
    }
  })

  useKeyPress({
    key: 'ArrowRight',
    action: () => {
      setCursor((prevState) =>
        prevState < keyboardKeys.length - 1 ? prevState + 1 : prevState
      )
    }
  })

  useKeyPress({
    key: 'ArrowLeft',
    action: () => {
      if (currentItem?.positionInRow === 1) {
        leftColumnRef.current?.focus()
        return
      }
      setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState))
    }
  })

  useKeyPress({
    key: 'Enter',
    action: () => {
      const currentValue = currentItem?.value
      const isBackspace = currentValue === 'backspace'
      setInputValue((prevState) => {
        if (isBackspace) {
          return String(prevState).slice(0, -1)
        }
        return `${prevState + currentValue}`
      })
    }
  })

  return (
    <div>
      <SearchValue>{inputValue}</SearchValue>
      <StyledKeyboard>
        {keyboardKeys.map((item, index) => (
          <KeyboardKey key={index} active={index === cursor} item={item} />
        ))}
      </StyledKeyboard>
    </div>
  )
}

export default Keyboard
