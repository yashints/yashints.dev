import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { SmallerContainer, ThemeContext } from 'Common'
import { MagicalButton, Wrapper, Flex } from './styles'
import config from 'Data'

export const Intro = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <Wrapper theme={theme} as={SmallerContainer}>
      <h1>Meet {config.shortName}</h1>
      <p>
        Also known as {config.defaultTitle}, a front-end lead engineer,
        international speaker, blogger, and hiker.
      </p>
      <Flex>
        <MagicalButton as={Link} to="#work">
          Work
        </MagicalButton>
        <MagicalButton as={Link} to="#popular">
          Popular articles
        </MagicalButton>
        <MagicalButton as={Link} to="/contact">
          Get In Touch
        </MagicalButton>
      </Flex>
    </Wrapper>
  )
}
