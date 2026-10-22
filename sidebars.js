// @ts-check

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.

 @type {import('@docusaurus/plugin-content-docs').SidebarsConfig}
 */
const sidebars = {
  tutorialSidebar: [
    'intro',
    'im-nebula',
    'requirements',
    {type: 'link', label: 'Automations', href: '/Nebula/Automations/intro'},
    {type: 'link', label: 'Core', href: '/Nebula/Core/intro'},
    {type: 'link', label: 'Log', href: '/Nebula/Log/intro'},
    'Scripts',
    {type: 'link', label: 'Tools', href: '/Nebula/Tools/intro'},
  ],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
