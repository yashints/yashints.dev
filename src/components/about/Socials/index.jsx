import React, { useContext } from 'react'
import { ThemeContext } from 'Common'
import config from 'Data'

// Dark icons
import twitter from 'Static/social/twitter.svg'
import linkedin from 'Static/social/linkedin.svg'
import github from 'Static/creative/github.svg'

// Light icons
import twitterWhite from 'Static/social/twitter-white.svg'
import linkedinWhite from 'Static/social/linkedin-white.svg'
import githubWhite from 'Static/creative/github-white.svg'
import SocialIcon from './SocialIcon'
import Envelope from 'Static/about/envelope.svg'
import Phone from 'Static/about/phone.svg'
import Marker from 'Static/about/marker.svg'
import EnvelopeWhite from 'Static/about/envelope-white.svg'
import PhoneWhite from 'Static/about/phone-white.svg'
import MarkerWhite from 'Static/about/marker-white.svg'

import {
  Wrapper,
  Title,
  Social,
  DetailsContainer,
  P,
  Img,
  Text,
} from './styles'

export const Socials = () => {
  const { theme } = useContext(ThemeContext)
  const socials = [
    {
      id: 0,
      name: 'Twitter',
      icon: theme === 'dark' ? twitterWhite : twitter,
      link: config.socialLinks.twitter,
    },
    {
      id: 1,
      name: 'Linkedin',
      icon: theme === 'dark' ? linkedinWhite : linkedin,
      link: config.socialLinks.linkedIn,
    },
  ]
  const creatives = [
    {
      id: 2,
      name: 'Github',
      icon: theme === 'dark' ? githubWhite : github,
      link: config.socialLinks.github,
    },
  ]
  return (
    <Wrapper>
      <DetailsContainer>
        <Title theme={theme}>Need to get in touch?</Title>
        <P theme={theme}>
          <Img src={theme === 'dark' ? EnvelopeWhite : Envelope} alt="email" />
          {config.contact.email}
        </P>
        <P theme={theme}>
          <Img src={theme === 'dark' ? MarkerWhite : Marker} alt="address" />
          {config.address.city}, {config.address.country}
        </P>
      </DetailsContainer>
      <DetailsContainer>
        <Title theme={theme}>Or on social media</Title>
        <Social>
          {socials.map(social => (
            <SocialIcon theme={theme} key={social.id} {...social} />
          ))}
          {creatives.map(creative => (
            <SocialIcon theme={theme} key={creative.id} {...creative} />
          ))}
        </Social>
      </DetailsContainer>
    </Wrapper>
  )
}
