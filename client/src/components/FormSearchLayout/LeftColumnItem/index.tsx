import React from 'react'

import SearchIcon from 'components/SvgIcons/SearchIcon'
import HomeIcon from 'components/SvgIcons/HomeIcon'
import { TIcon } from 'models/IconType'

type Props = {
  icon: TIcon
}

const LeftColumnItem = ({ icon }: Props) => {
  const itemMap: { [key: string]: { icon: JSX.Element; label: string } } = {
    search: {
      icon: <SearchIcon fill="#fff" />,
      label: 'Busca'
    },
    home: {
      icon: <HomeIcon fill="#fff" />,
      label: 'Inicio'
    }
  }

  return <div>{itemMap[icon].icon}</div>
}

export default LeftColumnItem
