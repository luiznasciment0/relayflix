import styled, { css } from 'styled-components'

type KeyboardKeyProps = {
  active: boolean
}

export const KeyboardKey = styled.div<KeyboardKeyProps>`
  ${({ active }) => css`
    padding-right: 1rem;
    padding-left: 1rem;
    height: 4rem;
    min-width: 4rem;
    max-width: fit-content;
    display: grid;
    place-items: center;
    background: ${active ? '#d3d3d33b' : '#000'};
    color: #fff;
    border: 1px solid #fff;
  `}
`
