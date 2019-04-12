import React from 'react'
import { Layout, SEO, PageTitle, Container, Row } from 'Common'
import ContactForm from 'Components/contact/ContactForm'

export default () => (
  <Layout>
    <Container>
      <SEO title="Contact" type="Organization" location="/contact" />
      <PageTitle>Getting in touch</PageTitle>
      <Row>
        <ContactForm />
      </Row>
    </Container>
  </Layout>
)
