import React, { useContext } from 'react'
import { ThemeContext } from 'Common'
import { H3, HR } from './styles'
import { Talk } from './Talk'

export const Speaking = ({ events }) => {
  const pastEvents = events.filter(x => x.node.postDate === 'past')
  const futureEvents = events.filter(x => x.node.postDate === 'future')

  const { theme } = useContext(ThemeContext)
  return (
    <div>
      <H3 theme={theme}>Future</H3>
      <HR />
      <Talk talks={futureEvents} theme={theme} />
      <H3 theme={theme}>Past</H3>
      <HR theme={theme} />
      <Talk talks={pastEvents} theme={theme} />
    </div>
  )
}
