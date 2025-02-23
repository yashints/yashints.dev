import React from 'react';
import { Link } from 'gatsby';
import { Container, ButtonLink } from 'Common';
import { Wrapper, Flex, Box, BoxAttention } from './styles';
import config from 'Data';

export const Intro = () => {
  return (
    <Wrapper as={Container}>
      <h1>Meet {config.shortName}</h1>
      <Box>
        <p>
          Meet <b>Yas</b> — AKA “{config.siteTitle}”—the software whiz who codes
          with heart, travels the globe sprouting tech wisdom, and still finds
          time to hike and blog about it all.{' '}
        </p>
        <p>
          He’s not just mapping out cutting-edge solutions; he’s ensuring those
          solutions actually make people’s lives better. Almond croissants might
          be his kryptonite, but demystifying complex code for conference
          audiences? That’s where he truly shines. From dreamer in a café to
          top-tier tech maestro, Yas is proof that passion, communication, and a
          dash of pastry-fuelled creativity can change the world—one line of
          code at a time.
        </p>
        <Flex>
          <ButtonLink
            to="#interests"
            linkText="Interests"
            hasMargin={'true'}
            minwidth="200px"
          />
          <ButtonLink
            to="#popular"
            linkText="Popular articles"
            hasMargin={'true'}
            minwidth="200px"
          />
          <ButtonLink
            to="/speaking"
            linkText="Upcoming talks"
            hasMargin={'true'}
            minwidth="200px"
          />
          <ButtonLink
            as={Link}
            to="/contact"
            linkText="Get In Touch"
            hasMargin={'true'}
            minwidth="200px"
          />
        </Flex>
      </Box>
      <a
        href="https://www.amazon.com/author/yas"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BoxAttention>
          📖 Woohoo, my first book ever is now listed on Amazon. If you're
          interested in Azure Bicep, check it out.
        </BoxAttention>
      </a>
      <a
        href="https://app.pluralsight.com/library/courses/web-performance-progressive-web-apps"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BoxAttention>
          📽️ Checkout my Web performance for PWAs course on PluralSight.
        </BoxAttention>
      </a>
    </Wrapper>
  );
};
