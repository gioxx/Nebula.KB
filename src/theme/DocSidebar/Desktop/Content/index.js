import React from 'react';
import Link from '@docusaurus/Link';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import useActiveSection from '@site/src/hooks/useActiveSection';

// Keeps the section name above the page tree, visible while scrolling.
export default function ContentWrapper(props) {
  const section = useActiveSection();
  return (
    <>
      {section && (
        <Link className="sidebar-section" to={section.href} data-section-sidebar>
          {section.label}
        </Link>
      )}
      <Content {...props} />
    </>
  );
}
