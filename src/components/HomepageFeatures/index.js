import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'PowerShell-first',
    Svg: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-brand-powershell"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4.887 20h11.868c.893 0 1.664-.665 1.847-1.592l2.358-12c.212-1.081-.442-2.14-1.462-2.366a1.784 1.784 0 0 0-.385-.042h-11.868c-.893 0-1.664.665-1.847 1.592l-2.358 12c-.212 1.081.442 2.14 1.462 2.366c.127.028.256.042.385.042z" />
        <path d="M9 8l4 4l-6 4" />
        <path d="M12 16h3" />
      </svg>
    ),
    description: (
      <>
        Native <code>powershell</code> highlighting, task-oriented snippets, and examples you can paste into your terminal.
      </>
    ),
  },
  {
    title: 'Modular by design',
    Svg: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-box"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
        <path d="M12 12l8 -4.5" />
        <path d="M12 12l0 9" />
        <path d="M12 12l-8 -4.5" />
      </svg>
    ),
    description: (
      <>
        Independent modules, each with its own main functions and ad hoc developed code.
        You choose which ones to use based on your needs.
      </>
    ),
  },
  {
    title: 'Secure defaults',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Lorem Ipsum.
      </>
    ),
  },
  {
    title: 'Open',
    Svg: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-brand-github"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
      </svg>
    ),
    description: (
      <>
        Lorem Ipsum.
      </>
    ),
  }
];

function Feature({ Svg, title, description }) {
  return (
    <article className="nebula-card">
      <div className={styles.titleWithIcon}>
        <Svg className={styles.titleIcon} role="img" aria-label={title} />
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
      </div>
      <p>{description}</p>
    </article>
  );
}

export default function HomepageFeatures() {
  return (
    <section className="container" style={{ padding: '2rem 0 4rem' }}>
      <div className="nebula-features">
        {FeatureList.map((props, idx) => (
          <Feature key={idx} {...props} imageRight={idx % 2 === 1} />
        ))}
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Heading as="h2">Quick peek</Heading>
        <pre>
          <code className="language-powershell">{`# Install Nebula.Core
Install-Module Nebula.Core -Scope CurrentUser

# Explore commands
Get-Command -Module Nebula.* | Format-Table -AutoSize

# Connect and run a task
$session = Connect-Nebula -Tenant "contoso" -Auth DeviceCode
Invoke-NBTask -Name "Sync:Inventory" -WhatIf
`}</code>
        </pre>
      </div>
    </section>
  );
}
