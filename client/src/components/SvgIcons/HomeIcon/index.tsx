import React from 'react'

type Props = {
  fill?: string
  width?: string
  height?: string
}

const HomeIcon = ({
  fill = '#000000',
  width = '24px',
  height = '24px'
}: Props) => (
  <svg
    fill={fill}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
  >
    <path d="M12 2.1L1 12 4 12 4 21 10 21 10 14 14 14 14 21 20 21 20 12 23 12z" />
  </svg>
)

export default HomeIcon
