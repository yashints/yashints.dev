import React, { useContext } from 'react'
import { Link } from 'gatsby'
import {
  Container,
  ThemeContext,
  ButtonLink,
} from 'Common'
import { Wrapper, Flex, Box } from './styles'
import config from 'Data'

export const Intro = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <Wrapper theme={theme} as={Container}>
      <h1>Meet {config.shortName}</h1>
      <Box>
        <p>
          Also known as {config.defaultTitle}, a
          front-end lead engineer, international
          speaker, blogger, and hiker.
        </p>
        <p>
          Although it doesn’t look like it, Yas is
          an almond croissant addict cleverly
          disguised as a successful web developer
          😁. Since it was relatively clear early
          on that it would be slightly more than
          difficult to make a living while sitting
          in a café eating a croissant and
          drinking a cappuccino, he’s focused his
          energy on the web, which happily has
          proven itself to be a wonderful decision
          🙃.
        </p>
        <p>
          Apart from that, he is a keen public
          speaker, and has spoken in many meetups
          and conferences like NDC and Voxxed Days
          around the world.
        </p>
        <Flex>
          <ButtonLink
            to="#interests"
            linkText="Interests"
            hasMargin={'true'}
            minwidth="200px"
          />
          <ButtonLink
            to="#popular"
            linkText="Popular articles"
            hasMargin={'true'}
            minwidth="200px"
          />
          <ButtonLink
            to="/speaking"
            linkText="Upcoming talks"
            hasMargin={'true'}
            minwidth="200px"
          />
          <ButtonLink
            as={Link}
            to="/contact"
            linkText="Get In Touch"
            hasMargin={'true'}
            minwidth="200px"
          />
        </Flex>
      </Box>
    </Wrapper>
  )
}
