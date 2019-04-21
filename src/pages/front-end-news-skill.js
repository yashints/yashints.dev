import React from 'react'
import styled from 'styled-components'
import {
  Layout,
  SEO,
  SmallerContainer,
} from 'Common'

export default () => (
  <Layout>
    <SEO
      location="/front-end-news-skill"
      type="Organization"
      title="Alexa skill privacy policy"
      description="This is the privacy policy for my Alexa app, front end news"
    />
    <Center as={SmallerContainer}>
      <h1 id="general">General</h1>
      <p>
        When you use one my skills you have to
        talk to Alexa. This voice input is sent to
        Amazon and us where we use it to
        understand what our skill should do for
        you. This is absolutely necessary for our
        service to give you an appropriate answer.
      </p>

      <p>
        If you use one of my skills you fully
        agree to both privacy policy and terms of
        use in this page.
      </p>

      <h1 id="privacy-policy">Privacy policy</h1>

      <p>
        This is to let you know that I (Yaser Adel
        Mehraban) protect your privacy and your
        data. please read this policy and my{' '}
        <a href="#terms-of-use">
          Alexa Skills Terms of Use
        </a>
        , as well as the{' '}
        <a href="https://www.amazon.com/gp/help/customer/display.html?nodeId=201809740">
          Alexa Terms of Use
        </a>{' '}
        and the{' '}
        <a href="https://www.amazon.com/privacy">
          Privacy Policies
        </a>{' '}
        by the Amazon Digital Services LLC (with
        its affiliates, “Amazon”).
      </p>

      <h2 id="data">Data</h2>
      <p>
        I never collect or share personal data
        with my skills.
      </p>

      <h1 id="terms-of-use">Terms of Use</h1>

      <h2 id="disclaimer">Disclaimer</h2>

      <p>
        My skills or parts of it may discontinue
        at any time or might contain errors. You
        use my skills on your own responsibility.
        Any information should not be seen as an
        advice since most of these are information
        gathered from different sources.
      </p>

      <h2 id="for-you">For You</h2>
      <p>
        I love developing Alexa Skills for you.
        And love to make things better by
        developing digital products and services.
      </p>

      <h1 id="updates">Updates</h1>
      <p>
        If and when one of my skills changes
        regarding storing any data from you
        interacting with the skill, this privacy
        policy will get updated. You can find a
        link to this policy on the description
        page of the skill in the Alexa App or in
        the Alexa Store. Your continued use of our
        skill after changes of the Privacy Policy
        or the skill itself will be seen as your
        acceptance of both.
      </p>
    </Center>
  </Layout>
)

const Center = styled.div`
  padding: 1rem 0;
`
