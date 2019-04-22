import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { Container, ThemeContext } from 'Common';
import { Wrapper, Flex } from './styles';
import { MagicalButton } from '../../theme/shared-styles';
import config from 'Data';

export const Intro = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Wrapper theme={theme} as={Container}>
      <h1>Meet {config.shortName}</h1>
      <p>
        Also known as {config.defaultTitle}, a
        front-end lead engineer, international
        speaker, blogger, and hiker.
      </p>
      <p>
        Although it doesn’t look like it, Yaser is
        an almond croissant addict cleverly
        disguised as a successful web developer
        😁. Since it was relatively clear early on
        that it would be slightly more than
        difficult to make a living while sitting
        in a café eating a croissant and drinking
        a cappuccino, he’s focused his energy on
        the web, which happily has proven itself
        to be a wonderful decision 🙃.
      </p>
      <p>
        Apart from that, he is keen public
        speaker, and has spoken in big conferences
        like NDC and Voxxed Days around the world.
      </p>
      <Flex>
        <MagicalButton as={Link} to="#interests">
          Interests
        </MagicalButton>
        <MagicalButton as={Link} to="#popular">
          Popular articles
        </MagicalButton>
        <MagicalButton as={Link} to="/speaking">
          Upcoming talks
        </MagicalButton>
        <MagicalButton as={Link} to="/contact">
          Get In Touch
        </MagicalButton>
      </Flex>
    </Wrapper>
  );
};
