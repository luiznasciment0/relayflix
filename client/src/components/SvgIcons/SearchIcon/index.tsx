import React from 'react'

type Props = {
  fill?: string
  width?: string
  height?: string
}

const SearchIcon = ({
  fill = '#000000',
  width = '24px',
  height = '24px'
}: Props) => {
  return (
    <svg
      className="icon"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
    >
      <path d="M21.586,19.586L16,14h-2v2l5.586,5.586c0.552,0.552,1.448,0.552,2,0h0C22.138,21.034,22.138,20.138,21.586,19.586z" />
      <path
        fill="current"
        stroke="current"
        strokeMiterlimit="10"
        strokeWidth="2"
        d="M9 3A6 6 0 1 0 9 15A6 6 0 1 0 9 3Z"
      />
      <path
        fill="current"
        stroke="current"
        strokeMiterlimit="10"
        d="M13 13L15.5 15.5"
      />
    </svg>
  )
}

export default SearchIcon
