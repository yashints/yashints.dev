import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Container, ThemeContext } from 'Common'
import { Wrapper, Flex } from './styles'
import { MagicalButton } from '../../theme/shared-styles'
import config from 'Data'

export const Intro = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <Wrapper theme={theme} as={Container}>
      <h1>Meet {config.shortName}</h1>
      <p>
        Also known as {config.defaultTitle}, a front-end lead engineer,
        international speaker, blogger, and hiker.
      </p>
      <p>
        He is a lead consultant at
        <a href="https://readify.net" target="_blank">
          {' '}
          Readify
        </a>
        , spending most of his time on large scale web applications. From ASP
        classic to Progressive Web Apps and WebAssembly (you can guess his age
        at this point 😉) he's had a heck of a journey in the web development
        world so far.
      </p>
      <Flex>
        <MagicalButton as={Link} to="#interests">
          Interests
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
