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
          Affectionately known in tech circles as {config.defaultTitle}, a
          <b> principal software engineer</b>, technologist, international
          speaker, author, blogger, and hiker.
        </p>
        <p>
          Not just a Principal Software Engineer but a visionary in front-end
          development, <b>Yas</b> brings a human touch to technology. His days
          are spent architecting elegant solutions that speak not only to
          machines but to the people using them. While he might jest about his
          weakness for <i>almond croissants</i>, he is serious about crafting
          code that makes a difference.
        </p>
        <p>
          His journey from café dreamer to tech leader was fueled by a passion
          for problem-solving and a dedication to excellence in the digital
          domain. Yas’s expertise isn’t confined to his desk. He’s a master
          communicator, sharing his knowledge and experiences on the world stage
          at conferences like NDC and Voxxed Days. His ability to demystify
          complex concepts and engage with his audience is what sets him apart
          as a mentor and innovator in the software engineering community.
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
        href="https://app.pluralsight.com/library/courses/vue-authentication-authorization/table-of-contents"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BoxAttention>
          📽️ Checkout my latest PluralSight course on Authentication and
          Authorization for VueJs apps.
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
