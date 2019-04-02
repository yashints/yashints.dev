import React, { useContext } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Container, ThemeContext } from 'Common'
import NavbarLinks from '../NavbarLinks'
import { Wrapper, Brand, BrandLogo } from './styles'

export default () => {
  const { theme } = useContext(ThemeContext)
  return (
    <StaticQuery
      query={graphql`
        query LogoImageQuery {
          Logo: imageSharp(fluid: { originalName: { regex: "/logo.png/" } }) {
            ...imageFields
          }
        }
      `}
      render={data => {
        return (
          <Wrapper as={Container}>
            <Brand as={Link} theme={theme} to="/">
              <BrandLogo>
                <Img
                  fluid={data.Logo.fluid}
                  alt="Yaser Adel Mehraban's headshot"
                />
              </BrandLogo>
              Yashints
            </Brand>
            <NavbarLinks desktop />
          </Wrapper>
        )
      }}
    />
  )
}
