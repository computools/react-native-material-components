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
        text: 'Style',
        items: [
           {text: 'Theme', link: '/theme'},
           {text: 'Typography', link: '/typography'},
        ],
        collapsed: true
      },
      {
        text: 'Components',
        items: [
          {
            text: 'Activity Indicators',
            items: [
              {text: 'Circular Activity Indicator', link: '/circularActivityIndicator'},
              {text: 'Linear Activity Indicator', link: '/linearActivityIndicator'}
            ],
            collapsed: true
          },
        ],
        collapsed: true
      }
    ],
  },
});
