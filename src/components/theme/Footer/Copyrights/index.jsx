import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { SmallerContainer, GithubIcon, ThemeContext } from 'Common';
import gatsbyIcon from 'Static/footer/gatsby.svg';
import netlifyIcon from 'Static/footer/netlify.svg';
import { Wrapper, Links, Item } from './styles';
import config from 'Data';

export const Copyrights = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Wrapper as={SmallerContainer} $theme={theme}>
      <div>
        All illustrations used are from{' '}
        <a href="https://iconscout.com/" target="_blank" rel="noreferrer">
          iconscout
        </a>
      </div>
      <Links>
        ©{' '}
        <Item
          as={Link}
          to="/"
          aria-label={`Copyright to ${config.defaultTitle}`}
        >
          {config.defaultTitle}
        </Item>{' '}
        2016-{`${new Date().getFullYear()} `}- Built with
        <a
          href="https://www.gatsbyjs.org"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Built with GatsbyJs"
        >
          <Item src={gatsbyIcon} $img alt="Gatssby js" />
        </a>
        Open sourced on
        <a
          href={config.siteGithubRepo}
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Open Sourced on Github"
        >
          <Item
            as={GithubIcon}
            img
            width="24"
            height="24"
            color={theme === 'dark' ? '#fff' : '#000'}
          />
        </a>
        deployed on
        <a
          href="https://www.netlify.com"
          rel="noopener noreferrer"
          target="_blank"
          aria-label="Hosted on Netlify"
        >
          <Item src={netlifyIcon} $img alt="Netlify" />
        </a>
      </Links>
    </Wrapper>
  );
};
