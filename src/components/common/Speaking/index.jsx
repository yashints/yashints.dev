import React, { useContext } from 'react'
import { ThemeContext } from 'Common'
import { H3, HR, Wrapper } from './styles'
import { Talk } from './Talk'

export const Speaking = ({ events }) => {
  const pastEvents = events.filter(
    x => new Date(x.node.postDate) < new Date()
  )
  const futureEvents = events.filter(
    x => new Date(x.node.postDate) >= new Date()
  )

  const { theme } = useContext(ThemeContext)
  return (
    <Wrapper>
      <H3 theme={theme}>Future</H3>
      <HR />
      <Talk talks={futureEvents} theme={theme} />
      <H3 theme={theme}>Past</H3>
      <HR theme={theme} />
      <Talk talks={pastEvents} theme={theme} />
    </Wrapper>
  )
}
