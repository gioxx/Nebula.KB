// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nebula.KB',
  tagline: 'Flawed by design, just like my code.',
  favicon: 'img/Nebula_Icon_Header.svg',
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },
  url: 'https://kb.gioxx.org',
  baseUrl: '/',
  organizationName: 'gioxx',
  projectName: 'Nebula.KB',
  onBrokenLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    localeConfigs: {
      en: {
        htmlLang: 'en-GB',
      },
      it: {
        label: 'Italiano',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        // blog: {
        //   showReadingTime: true,
        //   feedOptions: {
        //     type: ['rss', 'atom'],
        //     xslt: true,
        //   },
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        //   // Useful options to enforce blogging best practices
        //   onInlineTags: 'warn',
        //   onInlineAuthors: 'warn',
        //   onUntruncatedBlogPosts: 'warn',
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Nebula:KB',
        logo: {
          alt: 'Nebula.KB Site Logo',
          src: 'img/Nebula_Icon_Header.svg',
        },
        items: [
          // {
          //   type: 'docSidebar',
          //   sidebarId: 'tutorialSidebar',
          //   position: 'left',
          //   label: 'Docs',
          // },
          {
            to: '/docs/nebula-automations/intro',
            label: 'Automations',
            position: 'left'
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            to: 'https://gioxx.org',
            label: 'Blog',
            target: '_self',
          },
          { type: 'localeDropdown', position: 'right' },
          {
            href: 'https://github.com/gioxx/Nebula.KB',
            label: 'Nebula.KB on GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Modules',
            items: [
              {
                label: 'Nebula.Core',
                to: '/docs/intro',
              },
              {
                label: 'Nebula.Automations',
                to: '/docs/nebula-automations/intro',
              },
              {
                label: 'Nebula.Log',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Tools',
            items: [
              {
                label: 'Nebula.Scripts',
                to: '/docs/intro',
              },
              {
                label: 'PSADT Log Viewer',
                to: '/psadt-log-viewer',
              },
            ],
          },
          {
            title: 'Stay in touch',
            items: [
              {
                label: 'Contacts',
                href: 'https://gfsolone.com/#seguimi',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/gioxx/',
              },
            ],
          },
          {
            title: 'Thanks to',
            items: [
              {
                html: '<small>Microsoft, for the <a href="https://commons.wikimedia.org/wiki/File:PowerShell-Avatar_128.svg">PowerShell Avatar</a>, <a href="https://tabler.io/icons">Tabler Icons</a> and <a href="https://techicons.dev/">tech icons</a> for icons and SVG files.</small>',
              }
            ],
          },
        ],
        // copyright: `Copyright © ${new Date().getFullYear()} Gioxx. Built with Docusaurus.`,
        copyright: `<div style="color:var(--ifm-color-gray-300); padding-bottom: 9px; text-align: left;">All trademarks mentioned belong to their respective owners; third- party trademarks, product names, trade names, corporate names and companies mentioned may be trademarks of their respective owners or registered trademarks of other companies and have been used for explanatory purposes only and for the benefit of the owner, without any intention of infringing on existing copyright laws.</div>
        
        ${new Date().getFullYear()} — Lovingly developed by the usually-on-vacation brain cell of Gioxx ❤️ — Flawed by design, just like my code 🚮`
      },
      prism: {
        additionalLanguages: ['powershell'],
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
