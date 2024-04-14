import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { SocialShare, PageTitle, ThemeContext } from 'Common';
import Img from 'gatsby-image';
import CalendarIcon from 'Static/icons/calendar.svg';
import TimerIcon from 'Static/icons/stopwatch.svg';
import PayPalIcon from 'Static/icons/paypal.svg';
import CryptoIcon from 'Static/icons/bitcoin.svg';
import config from 'Data';
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
  DonateButton,
  DonateContainer,
} from './styles';

export const Post = ({ html, frontmatter, timeToRead, postPath }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ArticleWrapper theme={theme}>
      {frontmatter.img && (
        <ArticleImg>
          <img src={frontmatter.img.publicURL} />
        </ArticleImg>
      )}
      <PageTitle>{frontmatter.title}</PageTitle>
      <PageSubtitle>{frontmatter.subtitle}</PageSubtitle>
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
      {frontmatter.author !== config.legalName && (
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
      <Content dangerouslySetInnerHTML={{ __html: html }} />
      <SocialShare title={frontmatter.title} path={postPath} />
      <DonateContainer>
        <div>Support my work 👇🏽</div>
        <a
          className="btn-donate crypto"
          title="via Crypro Currency"
          href="https://commerce.coinbase.com/checkout/f305ab16-b8a6-460a-a517-af767ec3c0c7"
        >
          <img width="24px" src={CryptoIcon} /> Crypto
        </a>
        <form
          action="https://www.paypal.com/cgi-bin/webscr"
          method="post"
          target="_top"
        >
          <input type="hidden" name="cmd" value="_donations" />
          <input type="hidden" name="business" value="77G26DQHZZRRW" />
          <input type="hidden" name="currency_code" value="AUD" />
          <DonateButton>
            <img width="24px" src={PayPalIcon} />
            PayPal
          </DonateButton>
          <img
            alt=""
            border="0"
            src="https://www.paypal.com/en_AU/i/scr/pixel.gif"
            width="1"
            height="1"
          />
        </form>

        <script
          src="https://commerce.coinbase.com/v1/checkout.js?version=201807"
          async
          defer
        ></script>
      </DonateContainer>
      <LinksWrapper $theme={theme}>
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
    </ArticleWrapper>
  );
};
