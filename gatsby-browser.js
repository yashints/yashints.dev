export const onServiceWorkerUpdateReady = () => window.location.reload(true);
require('prismjs/themes/prism-solarizedlight.css');
require('prismjs/plugins/line-numbers/prism-line-numbers.css');
const config = require('./data/config');
let isInitialRoute = true;

export const onRouteUpdate = ({ location }) => {
  if (typeof window !== `undefined`) {
    window.scrollTo(0, 0);

    if (isInitialRoute) {
      isInitialRoute = false;
      return;
    }

    if (window.gtag && process.env.NODE_ENV === 'production') {
      window.gtag('config', config.googleAnalyticsID, {
        page_path: location.pathname + location.search + location.hash,
        send_page_view: true,
      });
    }
  }
};
