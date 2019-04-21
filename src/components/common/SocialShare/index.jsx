import React from 'react'
import {
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  RedditShareButton,
  TwitterIcon,
  TelegramIcon,
  LinkedinIcon,
  RedditIcon,
} from 'react-share'
import config from 'Data'
import { Wrapper } from './styles'

export const SocialShare = ({
  title,
  path,
  iconSize = 48,
}) => {
  console.warn(path)
  return (
    <Wrapper>
      <RedditShareButton
        url={`${config.url}${path}`}
        title={title}
      >
        <RedditIcon
          round
          size={iconSize}
          iconBgStyle={{ fill: '#333' }}
        />
      </RedditShareButton>
      <TwitterShareButton
        url={`${config.url}${path}`}
        via={config.social.twitter}
        title={title}
      >
        <TwitterIcon
          round
          size={iconSize}
          iconBgStyle={{ fill: '#333' }}
        />
      </TwitterShareButton>
      <LinkedinShareButton
        url={`${config.url}${path}`}
        title={title}
      >
        <LinkedinIcon
          round
          size={iconSize}
          iconBgStyle={{ fill: '#333' }}
        />
      </LinkedinShareButton>
    </Wrapper>
  )
}
