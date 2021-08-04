import React, { Suspense, useRef } from 'react'

import { TIcon } from 'models/IconType'

import Keyboard from 'components/Keyboard'
import FormSearch from 'components/FormSearch'

import { LeftColumn, LeftSide, Main, ParentGrid, RightSide } from './styles'
import LeftColumnItem from './LeftColumnItem'

const letfColumnItems: TIcon[] = ['search', 'home']

const Layout = () => {
  const leftColumnRef = useRef<HTMLDivElement>(null)

  return (
    <ParentGrid>
      <LeftSide ref={leftColumnRef}>
        <LeftColumn>
          {letfColumnItems.map((item, index) => (
            <LeftColumnItem icon={item} key={index} />
          ))}
        </LeftColumn>
      </LeftSide>
      <Main>
        <Keyboard leftColumnRef={leftColumnRef} />
      </Main>
      <RightSide>
        <Suspense fallback={'Loading...'}>
          <FormSearch />
        </Suspense>
      </RightSide>
    </ParentGrid>
  )
}

export default Layout
