import styled from 'styled-components'

export const ParentGrid = styled.div`
  display: grid;
  padding: 3rem;
  grid-template-columns: auto 1fr 1fr;
`

export const LeftSide = styled.div`
  grid-column: 1 / 2;
  transition-duration: 0.3s;
  &:focus {
    background: #fff;
    svg {
      fill: #000;
      stroke: #000;
    }
  }
`

export const Main = styled.main`
  grid-column: 2 / 3;
  display: grid;
  place-items: center;
`

export const RightSide = styled.div`
  grid-column: 3 / 4;
  background: yellow;
`

export const LeftColumn = styled.div`
  padding: 1rem;
`
