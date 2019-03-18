import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { SmallerContainer, ThemeContext } from 'Common'
import { MagicalButton, Wrapper, Flex } from './styles'
import config from 'Data'

export const Intro = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <Wrapper theme={theme} as={SmallerContainer}>
      <h1>Meet {config.legalName}</h1>
      <p>
        Also known as {config.defaultTitle}, front-end lead engineer,
        international speaker, blogger, and hiker.
      </p>
      <Flex>
        <MagicalButton
          href="https://docs.google.com/document/d/1yxCORtBMNxj_ukgOxoYQfRu3HTUqjtNXwcMajzcftF8"
          rel="noopener noreferrer"
          target="_blank"
        >
          View resume
        </MagicalButton>
        <MagicalButton as={Link} to="/contact">
          Get In Touch
        </MagicalButton>
      </Flex>
    </Wrapper>
  )
}
