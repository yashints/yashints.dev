import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Container, ThemeContext } from 'Common'

import { Wrapper, Text } from './styles'

export const Details = () => {
  const { theme } = useContext(ThemeContext)
  return (
    <Wrapper as={Container}>
      <Text theme={theme}>
        He is an Azure Technical Trainer at
        <a target="_blank" href="microsoft.com">Microsoft</a>
        , who enjoys sharing his knowledge with the community,
        building stuff (mostly apps, but sometimes wooden projects) 
        and solve problems.
      </Text>
      <Text>
        He is passionate about everything cloud and web, and
        in his spare time, apart from some
        woodworking, reads, writes, and works
        on the latest and greatest web
        technologies and frameworks.
      </Text>
      <Text theme={theme}>
        Progressive web apps, WebAssembly, Client
        side web APIs, web performance, you name
        it. He is all in.
      </Text>
    </Wrapper>
  )
}
