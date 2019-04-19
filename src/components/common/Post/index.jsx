import React, { useContext } from 'react'
import Disqus from 'disqus-react'
import { Link } from 'gatsby'
import { SocialShare, PageTitle, ThemeContext } from 'Common'
import Img from 'gatsby-image'
import config from 'Data'
import {
  ArticleWrapper,
  Back,
  Content,
  Comments,
  ArticleDate,
  ArticleImg,
  Next,
  LinksWrapper,
} from './styles'

export const Post = ({ html, frontmatter, timeToRead }) => {
  const { theme } = useContext(ThemeContext)
  const disqusShortName = `${config.defaultTitle.toLowerCase()}`
  const disqusConfig = {
    url: `${config.url}${frontmatter.fullPath}`,
    identifier: frontmatter.id,
    title: frontmatter.title,
  }
  console.log(frontmatter.img)
  return (
    <ArticleWrapper theme={theme}>
      {frontmatter.img && (
        <ArticleImg>
          <img src={frontmatter.img.publicURL} />
        </ArticleImg>
      )}
      <PageTitle>{frontmatter.title}</PageTitle>
      <ArticleDate>
        <i>{frontmatter.date} -</i>
        <i>{timeToRead} min read</i>
      </ArticleDate>
      <Content dangerouslySetInnerHTML={{ __html: html }} />
      <SocialShare {...frontmatter} />
      <LinksWrapper theme={theme}>
        <Back>
          {frontmatter.nextPost && (
            <Link to={frontmatter.nextPost}>
              <span>👈🏻</span> Previous article
            </Link>
          )}
        </Back>
        <Next>
          {frontmatter.previousPost && (
            <Link to={frontmatter.previousPost}>
              Next article <span>👉🏻</span>
            </Link>
          )}
        </Next>
      </LinksWrapper>
      <Comments>
        <Disqus.DiscussionEmbed
          shortname={disqusShortName}
          config={disqusConfig}
        />
      </Comments>
    </ArticleWrapper>
  )
}
