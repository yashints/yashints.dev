import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import CalendarIcon from 'Static/icons/calendar.svg';
import TimerIcon from 'Static/icons/stopwatch.svg';
import { ThemeContext } from 'Common';
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
  PublishInfo,
} from './styles';
import config from 'Data';
import Util from 'Util';

export const CardPost = ({ node, landing }) => {
  const { theme } = useContext(ThemeContext);
  const postPath = Util.getPostPath(
    !node.frontmatter.path ? node.frontmatter.title : node.frontmatter.path,
    node.frontmatter.unformattedDate
  );
  return (
    <Item>
      <Post theme={theme}>
        {node.frontmatter.thumbnail && (
          <ArticleImg landing={landing}>
            <GatsbyImage
              image={node.frontmatter.thumbnail.childImageSharp.gatsbyImageData}
              alt={node.frontmatter.title}
            />
          </ArticleImg>
        )}
        <ArticleContent>
          <ArticleTitle theme={theme}>
            <Link to={postPath} itemProp="url">
              {node.frontmatter.title}
            </Link>
          </ArticleTitle>
          <Paragraph
            theme={theme}
            dangerouslySetInnerHTML={{
              __html: node.html.split('<!--more-->')[0],
            }}
          />

          <Info theme={theme}>
            <PublishInfo>
              <StyledSpan>
                <img
                  src={CalendarIcon}
                  width="24px"
                  alt="Published"
                  title="Published on"
                />
                {node.frontmatter.date}
              </StyledSpan>
              <StyledSpan>
                <img
                  src={TimerIcon}
                  width="24px"
                  alt="Time to read"
                  title="Time to read"
                />
                {node.timeToRead} min
              </StyledSpan>
            </PublishInfo>
            <TagWrapper>
              {node.frontmatter.tags.slice(0, 3).map((tag) => (
                <Tag
                  theme={theme}
                  key={tag}
                  as={Link}
                  to={`/tags/${tag.replace(' ', '')}`}
                >
                  {tag}
                </Tag>
              ))}
            </TagWrapper>
            {node.frontmatter.author !== config.legalName && (
              <StyledSpan>Author: {node.frontmatter.author}</StyledSpan>
            )}

            <Link to={postPath}>Read more</Link>
          </Info>
        </ArticleContent>
      </Post>
    </Item>
  );
};
