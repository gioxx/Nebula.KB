import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

const moduleCards = [
  {
    name: 'Automations',
    blurb: 'Reusable blocks for scripts and cloud integrations (Graph, mail, webhooks).',
    icon: require('@site/static/img/Nebula.Automations.png').default,
  },
  {
    name: 'Core',
    blurb: 'A PowerShell module that goes beyond your workstation. It will make your Microsoft 365 life easier.',
    icon: require('@site/static/img/Nebula.Core.png').default,
  },
  {
    name: 'Log',
    blurb: 'A lightweight and configurable logging module for PowerShell scripts.',
    icon: require('@site/static/img/Nebula.Log.png').default,
  },
  {
    name: 'Tools',
    blurb: 'Everyday functions and utilities for PowerShell.',
    icon: require('@site/static/img/Nebula.Tools.png').default,
  },
];

const projects = [
  {
    name: 'Clean Mail Automation',
    slug: 'clean-mail-automation',
    tech: 'Docker',
    blurb: 'IMAP mailbox cleanup that deletes emails older than a retention period, with multi-mailbox support, cron scheduling, a web status page and optional Telegram notifications.',
    pages: [
      ['Deployment', 'deployment'],
      ['Configuration', 'configuration'],
      ['Usage', 'usage'],
      ['Troubleshooting', 'troubleshooting'],
    ],
  },
  {
    name: 'IntuneWinAppUtil GUI',
    slug: 'intunewinapputilgui',
    tech: 'PowerShell · WPF',
    blurb: "GUI around Microsoft's IntuneWinAppUtil.exe for packaging Win32 apps, with PSAppDeployToolkit/MSI auto-detection and Intune detection-rule helpers.",
    pages: [
      ['Installation', 'installation'],
      ['Packaging', 'packaging'],
      ['Configuration', 'configuration'],
      ['Detection helpers', 'detection-helpers'],
      ['Troubleshooting', 'troubleshooting'],
    ],
  },
  {
    name: 'Microsoft 365 Tenant Checker',
    slug: 'm365-tenant-checker',
    tech: 'Flask',
    blurb: 'Quickly verify whether a domain belongs to a Microsoft 365 tenant, via API and a minimal web UI.',
    pages: [
      ['API', 'api'],
      ['Deployment', 'deployment'],
    ],
  },
  {
    name: 'Spam-Digest',
    slug: 'spam-digest',
    tech: 'Docker',
    blurb: 'Daily digest of IMAP spam folders, with optional AI triage, blocklist/allowlist rules and web pages to rescue, trust or delete emails.',
    pages: [
      ['Deployment', 'deployment'],
      ['Configuration', 'configuration'],
      ['Digest and AI', 'digest-and-ai'],
      ['Web pages', 'web-pages'],
      ['Troubleshooting', 'troubleshooting'],
    ],
  },
];

const utilities = [
  {name: 'E-mail Header Analyzer', to: '/message-header-analyzer', blurb: 'Inspect message headers entirely in your browser.'},
  {name: 'PSADT Log Viewer', to: '/psadt-log-viewer', blurb: 'Inspect, filter and analyze PSADT style logs.'},
  {name: 'Quarantine E-mail Analyzer', to: '/quarantine-email-analyzer', blurb: 'Analyze quarantine email CSV files in the browser.'},
];

// UTC, so the server-rendered date matches the one rendered in the browser.
const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'});

function ModulesBand() {
  return (
    <section className={styles.modulesBand}>
      <div className="container">
        <div className={styles.modulesHeader}>
          <Heading as="h2">Nebula is available on PowerShell Gallery</Heading>
          <p>Install with one command. Designed to mix Core, Automations, Log and Tools where needed. Ready to go out of the box, or adapt to your needs.</p>
        </div>
        <div className={styles.twoColumns}>
          {moduleCards.map(({name, blurb, icon}) => (
            <article key={name} className={styles.moduleCard}>
              <div className={styles.moduleTitle}>
                <img src={icon} alt="" className={styles.moduleLogo} />
                <Heading as="h3">{name}</Heading>
              </div>
              <Link to={`https://www.powershellgallery.com/packages/Nebula.${name}`} className={styles.badge}>
                <img
                  src={`https://img.shields.io/powershellgallery/v/Nebula.${name}?label=PowerShell%20Gallery`}
                  alt={`Nebula.${name} version on the PowerShell Gallery`}
                  loading="lazy"
                />
              </Link>
              <p className={styles.moduleBlurb}>{blurb}</p>
              <code className={styles.install}>{`Install-Module Nebula.${name} -Scope CurrentUser`}</code>
              <div className={styles.moduleLinks}>
                <Link to={`/Nebula/${name}/intro`}>Docs</Link>
                <Link to={`https://www.powershellgallery.com/packages/Nebula.${name}`}>Gallery</Link>
                <Link to={`https://github.com/gioxx/Nebula.${name}`}>GitHub</Link>
              </div>
            </article>
          ))}
        </div>
        <p className={styles.scriptsLine}>
          Plus <Link to="/Nebula/Scripts">Nebula.Scripts</Link>: standalone scripts for Entra, Exchange, Intune and more, each published on the PowerShell Gallery.
        </p>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <Heading as="h2">Beyond the modules</Heading>
        <p className={styles.lead}>Side projects with their own documentation in this KB. Open source, like everything else here.</p>
        <div className={styles.twoColumns}>
          {projects.map(({name, slug, tech, blurb, pages}) => (
            <article key={slug} className={styles.projectCard}>
              <div className={styles.projectTitle}>
                <Heading as="h3">
                  <Link to={`/Projects/${slug}`}>{name}</Link>
                </Heading>
                <span className={styles.tech}>{tech}</span>
              </div>
              <p>{blurb}</p>
              <ul className={styles.chips}>
                {pages.map(([label, page]) => (
                  <li key={page}>
                    <Link to={`/Projects/${slug}/${page}`}>{label}</Link>
                  </li>
                ))}
              </ul>
              <Link to={`/Projects/${slug}`} className={styles.readMore}>Read the docs →</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function UtilitiesAndBlog() {
  const {posts = []} = usePluginData('latest-blog-posts') ?? {};
  return (
    <section className={styles.tintBand}>
      <div className={`container ${styles.split}`}>
        <div className={styles.utilities}>
          <Heading as="h2">Utilities in the browser</Heading>
          <ul className={styles.plainList}>
            {utilities.map(({name, to, blurb}) => (
              <li key={to}>
                <Link to={to} className={styles.utilityCard}>
                  <strong>{name}</strong>
                  <span>{blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.blog}>
          <div className={styles.blogHeader}>
            <Heading as="h2">From the blog</Heading>
            <Link to="/blog">All posts →</Link>
          </div>
          <ul className={styles.postList}>
            {posts.map(({title, permalink, date}) => (
              <li key={permalink}>
                <time dateTime={date}>{formatDate(date)}</time>
                <Link to={permalink}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default function HomepageFeatures() {
  return (
    <>
      <ModulesBand />
      <ProjectsSection />
      <UtilitiesAndBlog />
    </>
  );
}
