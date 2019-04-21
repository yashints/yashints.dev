import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import NotFound from 'Static/404/404.gif'
import {
  Layout,
  SEO,
  SmallerContainer,
} from 'Common'

export default () => (
  <Layout>
    <SEO
      location="/404"
      type="Organization"
      title="404"
      description="404 page not found"
    />
    <Center as={SmallerContainer}>
      <img
        src={NotFound}
        alt="404 page not found"
      />
      <Link to="/">
        Go back home, it's much safer there...
      </Link>
    </Center>
  </Layout>
)

const Center = styled.div`
  padding: 1rem 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
