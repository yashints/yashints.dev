import React, { useContext } from 'react';
import { Link } from 'gatsby';
import {
  Container,
  Twitter,
  GithubIcon,
  Linkedin,
  EmailIcon,
  RSS,
  ThemeContext,
} from 'Common';
import { Copyrights } from './Copyrights';
import {
  Wrapper,
  FooterContainer,
  FullContainer,
  List,
  Brand,
  Social,
  Grow,
} from './styles';

import config from 'Data';

export const Footer = () => {
  const { theme } = useContext(ThemeContext);
  const social = [
    {
      id: 0,
      name: 'Twitter',
      link: config.socialLinks.twitter,
      icon: Twitter,
      last: false,
    },
    {
      id: 1,
      name: 'Github',
      link: config.socialLinks.github,
      icon: GithubIcon,
      last: false,
    },
    {
      id: 2,
      name: 'Linkedin',
      link: config.socialLinks.linkedIn,
      icon: Linkedin,
      last: false,
    },
    {
      id: 3,
      name: 'Email',
      link: `mailto:${config.contact.email}`,
      icon: EmailIcon,
      last: false,
    },
    {
      id: 4,
      name: 'RSS',
      link: config.siteRss,
      icon: RSS,
      width: 40,
      last: true,
    },
  ];
  return (
    <FooterContainer $theme={theme}>
      <FullContainer $theme={theme}>
        <Wrapper as={Container}>
          <List>
            <li>
              <Brand as={Link} to="/">
                {config.defaultTitle}
              </Brand>
            </li>
          </List>
          <List>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/speaking">Speaking</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
          </List>
          <List>
            <li>
              {social.map(({ id, name, link, icon, width, last }) => (
                <Social
                  key={id}
                  target="_blank"
                  title={name}
                  rel="noopener noreferrer"
                  aria-label={`follow me on ${name}`}
                  href={link}
                  $last={last}
                >
                  <Grow as={icon} width={width ? width : '48'} height="48" />
                </Social>
              ))}
            </li>
          </List>
        </Wrapper>
      </FullContainer>
      <Copyrights />
    </FooterContainer>
  );
};
