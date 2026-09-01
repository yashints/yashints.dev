const React = require('react');
const config = require('./data/config');

exports.onRenderBody = ({ setHeadComponents }) => {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  setHeadComponents([
    React.createElement('script', {
      key: 'google-tag-script',
      async: true,
      src: `https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsID}`,
    }),
    React.createElement('script', {
      key: 'google-tag-config',
      dangerouslySetInnerHTML: {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${config.googleAnalyticsID}');
        `,
      },
    }),
  ]);
};
