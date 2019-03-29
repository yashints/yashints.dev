import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Container, ThemeContext } from 'Common'

import { Wrapper, Text } from './styles'

export const Details = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <Wrapper as={Container}>
      <Text theme={theme}>
        Although it doesn’t look like it, Yaser is an almond croissant addict
        cleverly disguised as a successful web developer. Since it was
        relatively clear early on that it would be slightly more than difficult
        to make a living out of thin air and sitting in a café eating a
        croissant and drinking a cappuccino, he’s focused his energy on the web,
        which happily has proven itself to be a wonderful decision.
      </Text>
      <Text theme={theme}>
        Apart from that, he has a hunger for public speaking, hence a number of
        talks in big conferences like NDC and Voxxed Days around the world under
        his belt.
      </Text>
      <Text theme={theme}>
        Progressive web apps, WebAssembly, Payment API, Web Share API, web
        performance, you name it. He is all in.
      </Text>
    </Wrapper>
  )
}
