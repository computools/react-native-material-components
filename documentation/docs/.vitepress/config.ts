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
        link: '/getting_started',
      },
      {
        text: 'Styles',
        items: [
           {text: 'Theme', link: 'styles/theme'},
           {text: 'Typography', link: 'styles/typography'},
        ],
      },
      {
        text: 'Components',
        items: [
          {
            text: 'Activity Indicators',
            items: [
              {text: 'Circular Activity Indicator', link: '/components/activity-indicators/circular_activity_indicator'},
              {text: 'Linear Activity Indicator', link: '/components/activity-indicators/linear_activity_indicator'}
            ],
            collapsed: true
          },
          {
            text: 'App Bars',
             items: [
              {text: 'Bottom App Bar', link: 'components/app-bars/bottom_app_bar'},
              {text: 'Top App Bars', link: 'components/app-bars/top_app_bar'}
            ],
            collapsed: true
          },
          {
            text: 'Badge',
            link: '/components/badge'
          },
          {
            text: 'Buttons',
             items: [
              {text: 'Common Buttons', link: 'components/buttons/common_buttons'},
              {text: 'Icon Buttons', link: 'components/buttons/icon_buttons'},
              {text: 'FAB', link: 'components/buttons/fab'},
              {text: 'Segmented Button', link: 'components/buttons/segmented_button'}
            ],
            collapsed: true
          },
          {
            text: 'Cards',
            link: '/components/cards'
          },
          {
            text: 'Chips',
            link: '/components/chips'
          },
          {
            text: 'Controls',
             items: [
              {text: 'Checkbox', link: 'components/controls/checkbox'},
              {text: 'Radio Button', link: 'components/controls/radio_button'},
              {text: 'Switch', link: 'components/controls/switch'},
            ],
            collapsed: true
          },
           {
            text: 'Dialogs',
            link: '/components/dialogs'
          },
           {
            text: 'Divider',
            link: '/components/divider'
          },
        ],
      }
    ],
  },
});
