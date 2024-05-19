import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import logo from 'Static/icons/code.png';
import avatar from 'Static/me.jpg';
import social from 'Static/social/socialbg.jpg';

const GlobalPageStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Rubik', sans-serif;
  }
`;

const Wrapper = styled.div`
  width: ${(props) => props.width || 400}px;
  height: ${(props) => props.height || 200}px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  position: relative;
  box-shadow:
    0 3px 10px rgb(0 0 0 / 0.2),
    inset 0 0 0 5px rgba(0, 0, 0, 0.1);

  padding: 25px;
  &:before {
    background: url(${social});
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    opacity: 0.2;
    content: '';
    z-index: -1;
  }
`;

const Title = styled.h4`
  font-weight: 700;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const Avatar = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50px;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 0;
  grid-area: avatar;
`;

const Logo = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 50px;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 0;
  grid-area: logo;
  margin-left: 160px;
`;

const DateBox = styled.div`
  font-size: 0.6rem;
  color: grey;
  font-weight: 500;
  grid-area: date;
`;

const SubTitle = styled.div`
  display: grid;
  grid-template-columns: 3;
  grid-template-rows: 2;
  grid-template-areas:
    'avatar readtime logo'
    'avatar date logo';
  align-items: center;
  justify-content: start;
  gap: 0 10px;
`;

const ReadTime = styled.div`
  font-size: 0.7rem;
  font-weight: 600;
  grid-area: readtime;
`;

const BlogPostShareImage = (props) => {
  const post = props.data.post;
  const { width, height } = props.pageContext;
  const date = post.frontmatter.date;
  return (
    <Wrapper width={width} height={height}>
      <link
        href="https://fonts.googleapis.com/css?family=Rubik&display=swap"
        rel="stylesheet"
      />
      <GlobalPageStyle />

      <Title>{post.frontmatter.title}</Title>

      <SubTitle>
        <Avatar src={avatar} />
        <ReadTime>{post.timeToRead} min read</ReadTime>
        <DateBox>{date}</DateBox>
        <Logo src={logo} />
      </SubTitle>
    </Wrapper>
  );
};

export default BlogPostShareImage;

export const pageQuery = graphql`
  query postQuery($title: String) {
    post: markdownRemark(frontmatter: { title: { eq: $title } }) {
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        subtitle
        author
        gravatar
        thumbnail {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
        img: thumbnail {
          publicURL
        }
      }
    }
  }
`;
