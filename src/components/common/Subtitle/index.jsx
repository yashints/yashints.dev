import React, { useContext } from 'react'
import { ThemeContext } from 'Common'
import { StyledSubtitle } from './styles'

export const Subtitle = ({ id, children, active }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <StyledSubtitle id={id} theme={theme} active={active}>
      {children}
    </StyledSubtitle>
  )
}
