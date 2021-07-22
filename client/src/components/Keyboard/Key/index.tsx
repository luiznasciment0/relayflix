import React from 'react'

import { KeyboardKey as TKeyboardKey } from '../keyboardKeys'
import { KeyboardKey as StyledKeyboardKey } from './styles'

type KeyboardKeyProps = {
  item: TKeyboardKey
  active: boolean
}

const KeyboardKey = ({ item, active }: KeyboardKeyProps) => {
  return <StyledKeyboardKey active={active}>{item.label}</StyledKeyboardKey>
}

export default KeyboardKey
