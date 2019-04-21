import React, { useContext } from 'react'
import {
  ThemeContext,
  Row,
  CardPost,
} from 'Common'
import { Link } from 'gatsby'
import { MagicalButton } from '../../theme/shared-styles'
import { Wrapper, Center } from './styles.js'

export const MostPopularPosts = ({ edges }) => {
  const { theme } = useContext(ThemeContext)
  return (
    <Wrapper theme={theme}>
      <Row>
        {edges.map(post => (
          <CardPost
            landing
            key={post.node.id}
            {...post}
          />
        ))}
      </Row>
      <Center>
        <MagicalButton as={Link} to="/blog/">
          See more
        </MagicalButton>
      </Center>
    </Wrapper>
  )
}
