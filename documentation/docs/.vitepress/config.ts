import {defineConfig} from 'vitepress';

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
  lang: 'en-US',
  title: 'Meterial Components',
  description: 'React Native powered Material UI Library.',
  themeConfig: {
    // nav: [
    //   {text: 'Get Started', link: '/installation'},

    //   // {
    //   //   text: 'Dropdown Menu',
    //   //   items: [
    //   //     { text: 'Item A', link: '/item-1' },
    //   //     { text: 'Item B', link: '/item-2' },
    //   //     { text: 'Item C', link: '/item-3' },
    //   //   ],
    //   // },

    //   // ...
    // ],

    search: {
      provider: "local",
    },
    sidebar: [
      {
        text: 'About',
        link: '/about',
      }, {
        text: 'Getting started',
        link: '/gettingStarted',
      },
      {
        text: 'Styles',
        items: [
           {text: 'Theme', link: 'styles/theme'},
           {text: 'Typography', link: 'styles/typography'},
        ],
        collapsed: true
      },
      {
        text: 'Components',
        items: [
          {
            text: 'Activity Indicators',
            items: [
              {text: 'Circular Activity Indicator', link: '/components/activity-indicators/circularActivityIndicator'},
              {text: 'Linear Activity Indicator', link: '/components/activity-indicators/linearActivityIndicator'}
            ],
            collapsed: true
          },
          {
            text: 'App Bars',
             items: [
              {text: 'Bottom App Bar', link: 'components/app-bars/bottomAppBar'},
              {text: 'Top App Bars', link: 'components/app-bars/topAppBar'}
            ],
            collapsed: true
          },
          {
            text: 'Badge',
            link: '/components/badge'
          }
        ],
        collapsed: true
      }
    ],
  },
});
