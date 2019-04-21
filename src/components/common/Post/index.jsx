import React, { useContext } from 'react'
import Disqus from 'disqus-react'
import { Link } from 'gatsby'
import {
  SocialShare,
  PageTitle,
  ThemeContext,
} from 'Common'
import Img from 'gatsby-image'
import CalendarIcon from 'Static/icons/calendar.svg'
import TimerIcon from 'Static/icons/stopwatch.svg'
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
  PageSubtitle,
  Author,
} from './styles'

export const Post = ({
  html,
  frontmatter,
  timeToRead,
  postPath,
}) => {
  const { theme } = useContext(ThemeContext)
  const disqusShortName = `${config.defaultTitle.toLowerCase()}`
  const disqusConfig = {
    url: `${config.url}${postPath}`,
    identifier: frontmatter.id,
    title: frontmatter.title,
  }

  return (
    <ArticleWrapper theme={theme}>
      {frontmatter.img && (
        <ArticleImg>
          <img src={frontmatter.img.publicURL} />
        </ArticleImg>
      )}
      <PageTitle>{frontmatter.title}</PageTitle>
      <PageSubtitle>
        {frontmatter.subtitle}
      </PageSubtitle>
      <ArticleDate>
        <img
          src={CalendarIcon}
          width="24px"
          height="24px"
          alt="Published"
          title="Published on"
        />
        <i>{frontmatter.date}</i>
        <img
          src={TimerIcon}
          width="24px"
          height="24px"
          alt="Time to read"
          title="Time to read"
        />
        <i>{timeToRead} min read</i>
      </ArticleDate>
      {frontmatter.author !==
        config.legalName && (
        <Author>
          <img
            width="48px"
            height="48px"
            src={frontmatter.gravatar}
            alt={frontmatter.author}
          />
          {frontmatter.author}
        </Author>
      )}
      <Content
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <SocialShare
        title={frontmatter.title}
        path={postPath}
      />
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
