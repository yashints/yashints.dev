import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Container } from 'Common';
import { Service } from './Service';
import { Wrapper, Grid } from './styles';

const query = graphql`
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
  const { services } = useStaticQuery(query);
  return (
    <Wrapper id="interests">
      <Container>
        <h2>Interests</h2>
        <Grid>
          {services.edges.map(({ node }) => (
            <Service key={node.id} {...node} />
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};
