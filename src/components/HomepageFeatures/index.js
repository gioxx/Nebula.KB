import Heading from '@theme/Heading';
import {useEffect, useRef, useState} from 'react';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

// Stroke icons (Lucide shapes, ISC license), drawn inline: no icon package needed.
const iconPaths = {
  mail: ['M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z', 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7'],
  fileSearch: ['M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', 'M14 2v6h6', 'M11.5 12a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z', 'M13.3 16.3 15 18'],
  shieldAlert: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M12 8v4', 'M12 16h.01'],
  trash: ['M3 6h18', 'M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6', 'M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2', 'M10 11v6', 'M14 11v6'],
  package: ['M16.5 9.4 7.55 4.24', 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z', 'M3.27 6.96 12 12.01l8.73-5.05', 'M12 22.08V12'],
  globe: ['M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z', 'M2 12h20', 'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z'],
  filter: ['M22 3H2l8 9.46V19l4 2v-8.54L22 3z'],
  wrench: ['M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z'],
  newspaper: ['M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2', 'M18 14h-8', 'M15 18h-5', 'M10 6h8v4h-8V6z'],
};

function Icon({name, className}) {
  return (
    <span className={className ?? styles.iconTile} aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {iconPaths[name].map((d) => <path key={d} d={d} />)}
      </svg>
    </span>
  );
}

const moduleCards = [
  {
    name: 'Automations',
    blurb: 'Reusable blocks for scripts and cloud integrations (Graph, mail, webhooks).',
    icon: require('@site/static/img/Nebula.Automations.png').default,
  },
  {
    name: 'Core',
    featured: true,
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
    icon: 'trash',
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
    icon: 'package',
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
    icon: 'globe',
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
    icon: 'filter',
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
  {name: 'E-mail Header Analyzer', to: '/message-header-analyzer', icon: 'mail', blurb: 'Inspect message headers entirely in your browser.'},
  {name: 'PSADT Log Viewer', to: '/psadt-log-viewer', icon: 'fileSearch', blurb: 'Inspect, filter and analyze PSADT style logs.'},
  {name: 'Quarantine E-mail Analyzer', to: '/quarantine-email-analyzer', icon: 'shieldAlert', blurb: 'Analyze quarantine email CSV files in the browser.'},
];

// UTC, so the server-rendered date matches the one rendered in the browser.
const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC'});

function InstallCommand({command}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = () => {
    navigator.clipboard?.writeText(command).then(() => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1500);
    }, () => {});
  };
  return (
    <div className={styles.install}>
      {/* One nowrap span per word: lines break only between words, never at the hyphens */}
      <code>
        {command.split(' ').map((word, i) => (
          <span key={i}>{i > 0 && ' '}<span className={styles.nowrap}>{word}</span></span>
        ))}
      </code>
      <button
        type="button"
        className={styles.copyButton}
        onClick={copy}
        aria-label={copied ? 'Copied' : `Copy: ${command}`}
        title={copied ? 'Copied' : 'Copy'}>
        {copied ? (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z" /></svg>
        )}
      </button>
    </div>
  );
}

function ModulesBand() {
  return (
    <section className={styles.modulesBand}>
      <div className="container">
        <div className={styles.modulesHeader}>
          <Heading as="h2">Nebula is available on PowerShell Gallery</Heading>
          <p>Install with one command. Designed to mix Core, Automations, Log and Tools where needed. Ready to go out of the box, or adapt to your needs.</p>
        </div>
        <div className={styles.fourColumns}>
          {moduleCards.map(({name, blurb, icon, featured}) => (
            <article key={name} className={featured ? `${styles.moduleCard} ${styles.featuredCard}` : styles.moduleCard}>
              <div className={styles.moduleTitle}>
                <img src={icon} alt="" className={styles.moduleLogo} />
                <Heading as="h3">{name}</Heading>
                {featured && <span className={styles.featuredBadge}>Flagship</span>}
              </div>
              <Link to={`https://www.powershellgallery.com/packages/Nebula.${name}`} className={styles.badge}>
                <img
                  src={`https://img.shields.io/powershellgallery/v/Nebula.${name}?label=PowerShell%20Gallery`}
                  alt={`Nebula.${name} version on the PowerShell Gallery`}
                  loading="lazy"
                />
              </Link>
              <p className={styles.moduleBlurb}>{blurb}</p>
              <InstallCommand command={`Install-Module Nebula.${name} -Scope CurrentUser`} />
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
          {projects.map(({name, slug, icon, tech, blurb, pages}) => (
            <article key={slug} className={styles.projectCard}>
              <div className={styles.projectTitle}>
                <Heading as="h3">
                  <Icon name={icon} />
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
          <Heading as="h2" className={styles.iconHeading}>
            <Icon name="wrench" className={styles.headingIcon} />
            Utilities in the browser
          </Heading>
          <ul className={styles.plainList}>
            {utilities.map(({name, to, icon, blurb}) => (
              <li key={to}>
                <Link to={to} className={styles.utilityCard}>
                  <Icon name={icon} />
                  <div className={styles.utilityText}>
                    <strong>{name}</strong>
                    <span>{blurb}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.blog}>
          <div className={styles.blogHeader}>
            <Heading as="h2" className={styles.iconHeading}>
              <Icon name="newspaper" className={styles.headingIcon} />
              From the blog
            </Heading>
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
