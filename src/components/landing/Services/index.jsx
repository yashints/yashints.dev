import React, { useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Container, ThemeContext } from 'Common';
import { Service } from './Service';
import { Wrapper, Grid } from './styles';

export const query = graphql`
  query servicesQuery {
    services: allServicesYaml {
      edges {
        node {
          id
          title
          icon
          description
        }
      }
    }
  }
`;

export const Services = () => {
  const { theme } = useContext(ThemeContext);
  const { services } = useStaticQuery(query);
  return (
    <Wrapper id="interests" $theme={theme}>
      <Container>
        <h2>Interests</h2>
        <Grid>
          {services.edges.map(({ node }) => (
            <Service theme={theme} key={node.id} {...node} />
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};
