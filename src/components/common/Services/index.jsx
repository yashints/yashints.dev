import React, { useState } from 'react';
import { ButtonLink } from 'Common';
import { Wrapper, Important, DIV, Summary, H3, Link } from './styles';

export const Services = () => {
  const [ppl, setPPLVisibility] = useState(false);
  const [agenda, setAgenda] = useState(false);
  const [howLong, setHowLong] = useState(false);
  const [content, setContent] = useState(false);
  const [nfp, setNFP] = useState(false);
  const [uni, setUniversity] = useState(false);
  return (
    <Wrapper>
      <H3>Courses</H3>
      <DIV>
        I've recently published my{' '}
        <Link
          href={
            'https://app.pluralsight.com/library/courses/web-performance-progressive-web-apps'
          }
        >
          <Important>Web performance for PWAs </Important>
          course on PluralSight
        </Link>
        . It's packed with practical examples, tips and tricks to equip you for
        your journey on web performance tuning. Make sure to check it out and
        leave your feedback once finished.
      </DIV>
      <H3>Workshops</H3>
      <Important>You and your team armed with my knowledge.</Important>
      <DIV>
        Coming with strong development and consulting background means I had the
        chance to work on many web applications from small to large commercial
        products. Because of this, I've seen far too many occasions where the
        application is suffering from poor performance and the users are not
        happy when interacting with it. So I've put together my{' '}
        <Important>Web Performance</Important> workshop which covers many areas
        from measuring and base lining to using modern Web APIs to be reactive
        to performance.
      </DIV>

      <DIV>
        The format and covered topics is flexible to your circumstances. We will
        work together to tailor the workshop to your needs and make sure you get
        the best outcome out of it.
      </DIV>

      <DIV>
        This workshop has received a great feedback and has helped individuals
        and companies to realise the importance of web performance and it's
        impact on UX.
      </DIV>
      <DIV>
        <ButtonLink
          to="/contact"
          linkText="Organise a Workshop"
          hasMargin={'true'}
          minwidth="100%"
        />
      </DIV>
      <H3>FAQ</H3>
      <Summary active={ppl} onClick={() => setPPLVisibility(!ppl)}>
        <Important>
          {!ppl && '⯈ '}
          {!!ppl && '⯆ '}
          How many people can attend?
        </Important>
      </Summary>
      {ppl && (
        <DIV>
          I don't charge by the number of people, however, I highly recommend
          you keep the number under 20. This will ensure that the workshop
          doesn't turn into a conference talk and everyone benefits by
          attending.
        </DIV>
      )}

      <Summary active={agenda} onClick={() => setAgenda(!agenda)}>
        <Important>
          {!agenda && '⯈ '}
          {!!agenda && '⯆ '}
          Can we see the agenda?
        </Important>
      </Summary>
      {agenda && (
        <DIV>
          Unfortunately not, but you're more than welcome to buy the slides and
          exercises as a separate package. If you decided to go ahead with the
          workshop, I will refund that amount.
        </DIV>
      )}

      <Summary active={howLong} onClick={() => setHowLong(!howLong)}>
        <Important>
          {!howLong && '⯈ '}
          {!!howLong && '⯆ '}
          How long is the workshop?
        </Important>
      </Summary>
      {howLong && (
        <DIV>
          A generic workshop is at least one day. Based on your circumstances it
          might be longer which adds to the charge. But I can't run it in less
          than one day since nothing substantial will come out of it.
        </DIV>
      )}

      <Summary active={content} onClick={() => setContent(!content)}>
        <Important>
          {!content && '⯈ '}
          {!!content && '⯆ '}
          Can we choose the content?
        </Important>
      </Summary>
      {content && (
        <DIV>
          Absolutely. This is why I offer a tailored workshop as well as the
          standard format. Of course the cost would be higher, but at least you
          benefit by having real life examples in the workshop based on your own
          products and applications, or by adding what's important for your
          team.
        </DIV>
      )}

      <Summary active={nfp} onClick={() => setNFP(!nfp)}>
        <Important>
          {!nfp && '⯈ '}
          {!!nfp && '⯆ '}
          What if we're a non-for-profit business?
        </Important>
      </Summary>
      {nfp && (
        <DIV>
          Glad you asked. I am happy to work with you to either find a sponsor
          or run the workshop for your team free of charge.
        </DIV>
      )}

      <Summary active={uni} onClick={() => setUniversity(!uni)}>
        <Important>
          {!uni && '⯈ '}
          {!!uni && '⯆ '}
          Do you work with universities?
        </Important>
      </Summary>
      {uni && (
        <DIV>
          Of course, I am happy to run this for your students and have a
          especial discount for that.
        </DIV>
      )}
    </Wrapper>
  );
};
