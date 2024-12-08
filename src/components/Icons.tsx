import React from "react"

interface Props {
  class: string
}
export const Arrow: React.FC<Props> = ({ class: className }) => {

  return (
    <svg className={`size-24 ${className}`} width="128" height="128" viewBox="0 0 24 24" fill="currentColor">
      <path fill="currentColor" d="M9.586 4L3 10.586a2 2 0 0 0 0 2.828L9.586 20a2 2 0 0 0 2.18.434l.145-.068A2 2 0 0 0 13 18.586V16h2a1 1 0 0 0 1-1V9l-.007-.117A1 1 0 0 0 15 8l-2-.001V5.414A2 2 0 0 0 9.586 4M21 8a1 1 0 0 1 .993.883L22 9v6a1 1 0 0 1-1.993.117L20 15V9a1 1 0 0 1 1-1m-3 0a1 1 0 0 1 .993.883L19 9v6a1 1 0 0 1-1.993.117L17 15V9a1 1 0 0 1 1-1" />
    </svg>
  )
}

export const Trash: React.FC<Props> = ({ class: className }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 7l16 0" />
      <path d="M10 11l0 6" />
      <path d="M14 11l0 6" />
      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
    </svg>
  )
}

export const Triangle: React.FC<Props> = ({ class: className }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 1.67a2.914 2.914 0 0 0 -2.492 1.403l-8.11 13.537a2.914 2.914 0 0 0 2.484 4.385h16.225a2.914 2.914 0 0 0 2.503 -4.371l-8.116 -13.546a2.917 2.917 0 0 0 -2.494 -1.408z" />
    </svg>
  )
}

export const Exit: React.FC<Props> = ({ class: className }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  )
}