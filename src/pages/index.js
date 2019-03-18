import React from 'react'
import {
  Intro,
  Skills,
  Work,
  Services,
  Github,
  Popular,
} from 'Components/landing'
import { Layout, SEO } from 'Common'

export default () => (
  <Layout>
    <SEO title="Personal site" type="Organization" />
    <Intro />
    <Skills />
    <Work />
    <Services />
    <Github />
    <Popular />
  </Layout>
)
