// Wraps @theme-original/BlogSidebar/Content: each year of the blog sidebar is
// a collapsible <details>, open for the most recent year and for the year of
// the post being read. Public APIs only, so a Docusaurus upgrade that changes
// them fails the build instead of breaking the sidebar silently.
// Same file in Nebula.KB and MC-KB: keep the two copies identical.
import React from 'react';
import {useLocation} from '@docusaurus/router';
import {useThemeConfig} from '@docusaurus/theme-common';
import {groupBlogSidebarItemsByYear} from '@docusaurus/plugin-content-blog/client';
import Heading from '@theme/Heading';
import Content from '@theme-original/BlogSidebar/Content';
import styles from './styles.module.css';

const trimSlash = (path) => path.replace(/\/$/, '');

export default function ContentWrapper(props) {
  const {items, yearGroupHeadingClassName, ListComponent} = props;
  const {pathname} = useLocation();
  if (!useThemeConfig().blog.sidebar.groupByYear) {
    return <Content {...props} />;
  }
  return groupBlogSidebarItemsByYear(items).map(([year, yearItems], index) => (
    <details
      key={year}
      className={styles.yearGroup}
      open={
        index === 0 ||
        yearItems.some((item) => trimSlash(item.permalink) === trimSlash(pathname))
      }>
      <summary>
        <Heading as="h3" className={yearGroupHeadingClassName}>
          {year}
        </Heading>
      </summary>
      <ListComponent items={yearItems} />
    </details>
  ));
}
