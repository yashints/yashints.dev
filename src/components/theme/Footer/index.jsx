import React, { useContext } from 'react'
import { Link } from 'gatsby'
import {
  Container,
  Logo,
  Twitter,
  GithubIcon,
  Linkedin,
  EmailIcon,
  RSS,
  ThemeContext,
} from 'Common'
import Copyrights from './Copyrights'
import {
  Wrapper,
  FooterContainer,
  FullContainer,
  List,
  Brand,
  StyledLogo,
  Social,
  Grow,
} from './styles'

import config from '../../../../data/config'

export const Footer = () => {
  const { theme } = useContext(ThemeContext)
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
      link: config.socialLinks.linkedin,
      icon: Linkedin,
      last: false,
    },
    {
      id: 3,
      name: 'Email',
      link: config.contact.email,
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
  ]
  return (
    <FooterContainer theme={theme}>
      <FullContainer theme={theme}>
        <Wrapper as={Container}>
          <List>
            <li>
              <Brand as={Link} to="/">
                <StyledLogo as={Logo} color="#fff" strokeWidth="2" />{' '}
                {config.defaultTitle}
              </Brand>
            </li>
          </List>
          <List>
            <li>
              <Link to="/about">About</Link>
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
                  rel="noopener noreferrer"
                  aria-label={`follow me on ${name}`}
                  href={link}
                  last={last}
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
  )
}
