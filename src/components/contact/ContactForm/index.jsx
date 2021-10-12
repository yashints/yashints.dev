import React, { useContext } from 'react'
import {
  Form,
  FastField,
  ErrorMessage,
  withFormik,
} from 'formik'
import * as Yup from 'yup'
import Recaptcha from 'react-google-recaptcha'
import { navigate } from 'gatsby'
import {
  ThemeContext,
  EmailIcon,
  Twitter,
  Linkedin,
  SubmitButton,
} from 'Common'

import config from 'Data'

import {
  ContactWrapper,
  Wrapper,
  InputField,
  Center,
  Error,
  Text,
  Icon,
  StackedText,
} from './styles'

const ContactForm = ({
  errors,
  touched,
  setFieldValue,
  isSubmitting,
}) => {
  const { theme } = useContext(ThemeContext)
  return (
    <ContactWrapper theme={theme}>
      <Text>
        <p>
          I am usually available via email or
          Twitter. LinkedIn messaging is another
          way to reach me but I don't check it
          that often.
          <br />
          Or just use the contact form below,
          however, it might take a while before I
          can respond.
        </p>
      </Text>
      <hr />
      <StackedText>
        <Icon
          as={Twitter}
          width="32px"
          height="32px"
          color={
            theme === 'dark' ? '#fff' : '#000'
          }
        />
        Twitter:&nbsp;
        <a href={config.socialLinks.twitter}>
          @{config.social.twitter}
        </a>
      </StackedText>

      <Text>
        <div>
          I try to be active on Twitter, my DM is
          open and you can reach me anytime, if I
          don't respond to you soon, it might be
          because of two things.
        </div>
        <div>
          Either you're on a different timezone,
          or I am busy, but don't worry I will
          respond sooner or later.
        </div>
      </Text>

      <hr />
      <StackedText>
        <Icon
          as={EmailIcon}
          width="28px"
          height="28px"
          color={
            theme === 'dark' ? '#fff' : '#000'
          }
        />
        Email:&nbsp;
        <a href={config.socialLinks.email}>
          {config.contact.email}
        </a>
      </StackedText>

      <Text>
        <div>
          This is by far the most convenient way
          to contact me. I try to clear my inbox
          daily, so chances are high you will get
          your response soon.
        </div>
        <div>
          And I love to meet new people and grow
          my network with professionals like
          yourself 😉
        </div>
      </Text>

      <hr />
      <StackedText>
        <Icon
          as={Linkedin}
          width="32px"
          height="32px"
          color={
            theme === 'dark' ? '#fff' : '#000'
          }
        />
        LinkedIn:&nbsp;
        <a href={config.socialLinks.linkedIn}>
          {config.social.linkedIn}
        </a>
      </StackedText>

      <Text>
        <div>
          Not so responsive to messages in here,
          but I leave it here anyway just in case
          you're a LinkedIn addict 😏
        </div>
      </Text>
      <Form
        id="contactform"
        method="post"
        name="yashints"
        data-netlify="true"
        data-netlify-recaptcha="true"
        data-netlify-honeypot="bot-field"
      >
        <noscript>
          <p>
            This form won’t work with Javascript
            disabled
          </p>
        </noscript>
        <Wrapper>
          <label
            htmlFor="name"
            aria-label="please insert your name"
          >
            <InputField
              component="input"
              as={FastField}
              type="text"
              id="name"
              autoComplete="name"
              placeholder="Full name"
              error={
                touched.name && errors.name
                  ? 1
                  : 0
              }
              name="name"
            />
          </label>
          <ErrorMessage
            component={Error}
            name="name"
          />
        </Wrapper>
        <Wrapper>
          <label
            htmlFor="email"
            aria-label="please insert your email"
          >
            <InputField
              component="input"
              as={FastField}
              type="email"
              id="email"
              autoComplete="email"
              placeholder="Email"
              error={
                touched.email && errors.email
                  ? 1
                  : 0
              }
              name="email"
            />
          </label>
          <ErrorMessage
            component={Error}
            name="email"
          />
        </Wrapper>
        <Wrapper>
          <label
            htmlFor="message"
            aria-label="please insert your message"
          >
            <InputField
              component="textarea"
              as={FastField}
              id="message"
              error={
                touched.message && errors.message
                  ? 1
                  : 0
              }
              name="message"
              placeholder="Message"
              textarea="true"
            />
          </label>
          <ErrorMessage
            component={Error}
            name="message"
          />
        </Wrapper>
        <FastField
          component={Recaptcha}
          sitekey="6Lcb6zIUAAAAAEj8RMqt6lDxEOYIsjwcSOOWmhqR"
          name="recaptcha"
          onChange={value =>
            setFieldValue('recaptcha', value)
          }
        />
        <ErrorMessage
          component={Error}
          name="recaptcha"
        />
        <Center>
          <SubmitButton
            btnText="Send"
            disabled={isSubmitting}
          />
        </Center>
      </Form>
    </ContactWrapper>
  )
}

export default withFormik({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    message: '',
    recaptcha: '',
  }),
  validationSchema: () =>
    Yup.object().shape({
      name: Yup.string().required(
        'Name is required'
      ),
      email: Yup.string()
        .email('Please enter a valid email!')
        .required('Email is required!'),
      message: Yup.string().required(
        'Message is required'
      ),
      recaptcha: Yup.string().required(
        'Robots are not welcome yet!'
      ),
    }),
  handleSubmit: async (
    { name, email, message, recaptcha },
    { setSubmitting, resetForm }
  ) => {
    try {
      const encode = data => {
        return Object.keys(data)
          .map(
            key =>
              `${encodeURIComponent(
                key
              )}=${encodeURIComponent(data[key])}`
          )
          .join('&')
      }
      await fetch('/?no-cache=1', {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded',
        },
        body: encode({
          'form-name': 'yashints',
          name,
          email,
          message,
          'g-recaptcha-response': recaptcha,
        }),
      })
      setSubmitting(false)
      resetForm()
      navigate('/thanks/')
    } catch (err) {
      setSubmitting(false)
      alert(
        'Something went wrong, please try again!'
      ) // eslint-disable-line
    }
  },
})(ContactForm)
