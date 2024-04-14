export const onServiceWorkerUpdateReady = () => window.location.reload(true);
require('prismjs/themes/prism-solarizedlight.css');
require('prismjs/plugins/line-numbers/prism-line-numbers.css');

export const onRouteUpdate = () => {
  if (typeof window !== `undefined`) {
    window.scrollTo(0, 0);
  }
};
