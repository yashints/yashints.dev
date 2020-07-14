import React from 'react'
import { navigate } from 'gatsby'

import CalendarIcon from 'Static/icons/calendar.svg'
import VideoIcon from 'Static/icons/video.svg'
import SlidesIcon from 'Static/icons/powerpoint.svg'
import CodeIcon from 'Static/icons/coding.svg'
import LinkIcon from 'Static/icons/link.svg'

import {
  Wrapper,
  Card,
  CardHeader,
  CardDescription,
  CardActions,
  CardDate,
  CardLink,
} from './styles'

export const Talk = ({ talks, theme }) => {
  return (
    <Wrapper>
      {talks &&
        talks.map(
          (
            {
              node: {
                title,
                image,
                description,
                date,
                link,
                video,
                slides,
                code,
              },
            },
            i,
            arr
          ) => (
            <Card key={title + i} theme={theme}>
              <CardHeader theme={theme}>
                <a href={link} target="_blank">
                  <span>
                    {title}
                    <img
                      src={LinkIcon}
                      width="20px"
                      alt="link"
                    />
                  </span>
                </a>
              </CardHeader>
              <CardDescription>
                {description}
              </CardDescription>
              <CardDate>
                <img
                  src={CalendarIcon}
                  width="20px"
                  alt="Calendar"
                  title="Date"
                />
                {date}
              </CardDate>

              <CardActions>
                {code && (
                  <a
                    href={code}
                    target="_blank"
                    title="Code"
                  >
                    <img
                      src={CodeIcon}
                      width="20px"
                      alt="code"
                    />
                  </a>
                )}
                {slides && (
                  <a
                    href={slides}
                    target="_blank"
                    title="Slides"
                  >
                    <img
                      src={SlidesIcon}
                      width="20px"
                      alt="slides"
                    />
                  </a>
                )}
                {video && (
                  <a
                    href={video}
                    target="_blank"
                    title="Video"
                  >
                    <img
                      src={VideoIcon}
                      width="20px"
                      alt="video"
                    />
                  </a>
                )}
              </CardActions>
            </Card>
          )
        )}
      {!talks ||
        (!talks.length && (
          <div>Nothing for now</div>
        ))}
    </Wrapper>
  )
}
