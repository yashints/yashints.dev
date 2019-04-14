import React, { useContext } from 'react'
import Disqus from 'disqus-react'
import { Link } from 'gatsby'
import { SocialShare, PageTitle, ThemeContext } from 'Common'
import config from 'Data'
import { ArticleWrapper, Back, Content, Comments, ArticleDate } from './styles'

export const Post = ({ html, frontmatter, timeToRead }) => {
  const { theme } = useContext(ThemeContext)
  const disqusShortName = `${config.defaultTitle.toLowerCase()}`
  const disqusConfig = {
    url: `${config.url}${frontmatter.fullPath}`,
    identifier: frontmatter.id,
    title: frontmatter.title,
  }
  return (
    <ArticleWrapper theme={theme}>
      <PageTitle>{frontmatter.title}</PageTitle>
      <ArticleDate>
        <i>{frontmatter.date} -</i>
        <i>{timeToRead} min read</i>
      </ArticleDate>
      <Content dangerouslySetInnerHTML={{ __html: html }} />
      <SocialShare {...frontmatter} />
      <Back>
        <Link to={frontmatter.next}>Previous article</Link>
      </Back>
      <Comments>
        <Disqus.DiscussionEmbed
          shortname={disqusShortName}
          config={disqusConfig}
        />
      </Comments>
    </ArticleWrapper>
  )
}
