import React from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Metadata from '@theme-original/DocItem/Metadata';
import useActiveSection from '@site/src/hooks/useActiveSection';

// Adds the section to the browser tab title and social cards: every module has
// a "Getting started" page, which is otherwise identical in a row of open tabs.
export default function MetadataWrapper(props) {
  const section = useActiveSection();
  const {metadata} = useDoc();
  return (
    <>
      <Metadata {...props} />
      {section && <PageMetadata title={`${metadata.title} - ${section.label}`} />}
    </>
  );
}
