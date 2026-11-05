import React from 'react';
import Link from '@docusaurus/Link';
import Home from '@theme-original/DocBreadcrumbs/Items/Home';
import useActiveSection from '@site/src/hooks/useActiveSection';

// Starts the breadcrumbs from the section: on mobile the sidebar is closed,
// so this is the only place that says which section a page belongs to.
export default function HomeWrapper(props) {
  const section = useActiveSection();
  if (!section) {
    return <Home {...props} />;
  }
  return (
    <li className="breadcrumbs__item">
      <Link className="breadcrumbs__link" to={section.href} data-section-breadcrumb>
        {section.label}
      </Link>
    </li>
  );
}
