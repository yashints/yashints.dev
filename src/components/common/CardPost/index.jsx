import React, { useContext } from 'react'
import { Link } from 'gatsby'
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
  Tag,
  TagWrapper,
} from './styles'
import config from 'Data'
import Util from 'Util'

export const CardPost = ({ node, landing }) => {
  const { theme } = useContext(ThemeContext)
  const postPath = Util.getPostPath(
    node.frontmatter.path,
    node.frontmatter.unformattedDate
  )

  return (
    <Item>
      <Post theme={theme}>
        {node.frontmatter.thumbnail && (
          <ArticleImg landing={landing}>
            <Img fluid={node.frontmatter.thumbnail.childImageSharp.fluid} />
          </ArticleImg>
        )}
        <ArticleContent>
          <ArticleTitle theme={theme}>{node.frontmatter.title}</ArticleTitle>
          <Paragraph
            theme={theme}
            dangerouslySetInnerHTML={{
              __html: node.html.split('<!--more-->')[0],
            }}
          />
          <Info>
            <Info theme={theme}>
              {node.frontmatter.date}
              <StyledSpan>{node.timeToRead} min</StyledSpan>
              <TagWrapper>
                {node.frontmatter.tags.map(tag => (
                  <Tag theme={theme} key={tag}>
                    {tag}
                  </Tag>
                ))}
              </TagWrapper>
              {node.frontmatter.author !== config.legalName && (
                <StyledSpan>Author: {node.frontmatter.author}</StyledSpan>
              )}
            </Info>
            <Link to={postPath}>Read more</Link>
          </Info>
        </ArticleContent>
      </Post>
    </Item>
  )
}
