import React, { useContext } from 'react'
import { navigate } from 'gatsby'
import Img from 'gatsby-image'
import { ThemeContext } from 'Common'
import {
  Item,
  Post,
  ArticleContent,
  ArticleImg,
  ArticleTitle,
  Paragraph,
  Info,
  StyledSpan,
} from './styles'
import Util from 'Util'

export const CardPost = ({ node, landing }) => {
  const { theme } = useContext(ThemeContext)
  const postPath = Util.getPostPath(
    node.frontmatter.path,
    node.frontmatter.unformattedDate
  )
  return (
    <Item>
      <Post onClick={() => navigate(postPath)} theme={theme}>
        <ArticleImg landing={landing}>
          <Img fluid={node.frontmatter.thumbnail.childImageSharp.fluid} />
        </ArticleImg>
        <ArticleContent>
          <ArticleTitle theme={theme}>{node.frontmatter.title}</ArticleTitle>
          <Paragraph theme={theme}>{node.excerpt}</Paragraph>
          <Info theme={theme}>
            {node.frontmatter.date}
            <StyledSpan>{node.timeToRead} min</StyledSpan>
          </Info>
        </ArticleContent>
      </Post>
    </Item>
  )
}
