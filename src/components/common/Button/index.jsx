import React, { useContext } from 'react'
import { ThemeContext } from 'Common'
import { Link } from 'gatsby'
import { LinkButton } from './styles'

export const ButtonLink = ({
  to,
  linkText,
  minwidth,
  hasMarginTop,
  hasMargin,
  external = false,
}) => {
  const { theme } = useContext(ThemeContext)
  return !external ? (
    <LinkButton
      as={Link}
      to={to}
      theme={theme}
      minwidth={minwidth}
      hasmargintop={hasMarginTop}
    >
      {linkText}
    </LinkButton>
  ) : (
    <LinkButton
      href={to}
      theme={theme}
      target="_blank"
      rel="noopener norefferer"
      minwidth={minwidth}
      hasmargintop={hasMarginTop}
    >
      {linkText}
    </LinkButton>
  )
}
