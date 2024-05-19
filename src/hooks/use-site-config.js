import { useStaticQuery, graphql } from 'gatsby';

const useSiteMetadata = () => {
  const result = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteTitle
          siteUrl
          siteCover
          siteLogo
          logo
          author
          authorAvatar
          authorDescription
          title
          socialLinks {
            twitter
            github
            linkedIn
            email
            youtube
            google
          }
          social {
            twitter
            linkedIn
            github
          }
          contact {
            email
          }
          foundingDate
        }
      }
    }
  `);
  return result.site.siteMetadata;
};

export default useSiteMetadata;
