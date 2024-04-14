import React, { useContext } from 'react';
import { ButtonLink, ThemeContext } from 'Common';
import { Wrapper, Tags, Box } from './styles';

import { Talk } from './Talk';

export const Speaking = ({ events }) => {
  const { theme } = useContext(ThemeContext);
  const pastEvents = events.filter(
    (x) => new Date(x.node.postDate) < new Date()
  );
  let futureEvents = events.filter(
    (x) => new Date(x.node.postDate) >= new Date()
  );

  if (futureEvents && futureEvents.length) {
    futureEvents = futureEvents.sort((a, b) => {
      return new Date(a.node.postDate) - new Date(b.node.postDate);
    });
  }

  return (
    <Wrapper>
      <Box>
        <p>
          Having spoken at many conferences and meetups, sharing my knowledge
          with development community is something I am hugely passionate about.
          If you’re running an event and would like me to speak, I have prepared{' '}
          <a href="#info">some information for you</a>.
        </p>
        <p>
          As well as speaking at development conferences, I can (and indeed do)
          speak at private engagements for companies and their staff. If you are
          a company who would like a tech talk to be delivered on-site to a
          private audience, please do get in touch.
        </p>
        <p>
          I've also put together{' '}
          <a href="#bio">a package of what organisers usually need</a> for you
          to make our job a bit easier.
        </p>
      </Box>
      <br />
      <h3>Topics I've frequently talked about</h3>
      <Tags $theme={theme}>
        <span>Web technologies</span>
        <span>Web Performance</span>
        <span>PWAs</span>
        <span>Web Assembly</span>
        <span>Accessibility</span>
        <span>DevTools</span>
        <span>JavaScript and AI (Tensorflow.js)</span>
      </Tags>
      <br />
      <h3 id="upcoming">Future Events</h3>
      <Talk talks={futureEvents} />
      <br />
      <h3>Past Events</h3>
      <Talk talks={pastEvents} />
      <br />
      <h3 id="info">Request to Speak</h3>
      <Box>
        <p>
          I would absolutely love to speak at your conference! However, there
          are a few questions which if you answer, makes the whole process
          easier for both parties. If you could{' '}
          <a href="/contact/#contactform">fire me an email</a> answering as many
          of the below as possible, I’d be really grateful. If you don’t have
          answers to any of those just yet, please don’t worry, this is just a
          rough starting point, not a test. Please also remember that{' '}
          <strong>there is no right or wrong answer</strong> to any of these
          questions.
        </p>
        <ul>
          <li>
            <strong>When and where is your conference?</strong> I've{' '}
            <a
              href="https://www.google.com/search?q=melbourne+oslo+distance"
              rel="noopener noreferrer"
            >
              travelled 15,976 km{' '}
            </a>
            to give a talk; I’m not afraid of distance.
          </li>
          <li>
            <strong>How many attendees do you expect to have?</strong> Rough
            number or previous sizes are OK.
          </li>
          <li>
            <strong>What kind of audience do you have?</strong> It helps to know
            what the audience will be like (e.g. mainly front-end developers,
            full-stack, etc.).
          </li>
          <li>
            <strong>Which other speakers have you approached?</strong> It helps
            to be aware of any other speakers who run the risk of delivering
            similar talks.
          </li>
          <li>
            <strong>How long does the talk need to be?</strong> Do you have a
            set talk duration? 30-45 minutes is usually ideal.
          </li>
          <li>
            <strong>Do you have any specific AV limitations?</strong> I prefer
            to use headset or lapel microphone, and would definitely rather use
            my own laptop to present from.
          </li>
          <li>
            <strong>Do you cover speaker expenses?</strong> Flights, hotels,
            train journeys, etc.
          </li>
          <li>
            <strong>What kind of talk would you like?</strong> I usually give
            technical talks (Web technologies, performance, etc.), but am open
            to discussing other topics.
          </li>
          <li>
            <strong>Do you require a brand new talk?</strong> Writing talks
            takes a lot of time and effort: forewarned is forearmed.
          </li>
          <li>
            <strong>When can I start publicising your event?</strong> Do you
            want to keep the lineup quiet for a while, or can I add your event
            to my speaking list immediately?
          </li>
          <li>
            <strong>How much does a ticket cost for attendees?</strong> I like
            to have a rough idea of the cost of the event if possible.
          </li>
          <li>
            <strong>Do you plan to compensate speakers?</strong> It'd be great
            if you could compensate me for my time which helps me keep doing
            what I do. However, this is not a must.
          </li>
          <li>
            <strong>
              Have you checked for a clash with my upcoming events?
            </strong>{' '}
            If your event is close to one of my upcoming events, and is not
            nearby, chances are I won't be able to commit.{' '}
            <a href="#upcoming">You can see my current schedule here</a>.
          </li>
        </ul>
      </Box>
      <h3>What’s in It for You?</h3>
      <Box>
        Apart from helping to promote and publicise the event, I will endeavour
        to make myself available to attendees for the entire duration of the
        event, try to attend all surrounding social activities, will deliver a
        quality talk of practical relevance, and hold myself to a high standard.
        <ButtonLink
          to="mailto:me@yashints.dev"
          linkText="Sounds OK? Get in touch!"
          hasMarginTop="20px"
          hasMargin={'true'}
          minwidth="200px"
          external={true}
        />
      </Box>

      <br />
      <br />
      <h3 id="bio">Bio</h3>
      <Box>
        <p>
          Although it doesn’t look like it, Yaser is an almond croissant addict
          cleverly disguised as a successful web developer. Since it was
          relatively clear early on that it would be slightly more than
          difficult to make a living out of thin air, he’s focused his energy on
          the web, which happily has proven itself to be a wonderful decision.
        </p>
        <ul>
          <li>
            <strong>Name:</strong> Yaser Adel Mehraban
          </li>
          <li>
            <strong>Tagline:</strong> AKA Yashints, a front-end lead engineer,
            international speaker, blogger, and a hiker.
          </li>
          <li>
            <strong>Designation:</strong> Azure Technical Trainer
          </li>
          <li>
            <strong>Company:</strong> Microsoft
          </li>
          <li>
            <strong>Headshot:</strong>{' '}
            <a
              href="https://i.imgur.com/OUm2uCD.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              And here is a link to a high res headshot.
            </a>
          </li>
        </ul>
      </Box>
    </Wrapper>
  );
};
