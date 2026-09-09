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
          Meet <b>Yas</b>, AKA "{config.siteTitle}", a GenAI guru and Principal
          Software Engineer at Atlassian who spends his days bringing calm to
          the glorious madness of the developer loop and shipping AI-powered
          features in Jira.
        </p>
        <p>
          He likes sharp architecture, helpful automation, boringly reliable
          systems, and the tiny product details that make engineers quietly say
          "oh, nice". Almond croissants remain a serious vulnerability, but so
          does a messy workflow begging for a clever AI nudge.
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
