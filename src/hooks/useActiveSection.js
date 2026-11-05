import {useActivePlugin, useActiveVersion} from '@docusaurus/plugin-content-docs/client';
import sections from '@site/src/data/docSections.json';

// The docs section being browsed, with the link to its main page in the active version.
export default function useActiveSection() {
  const pluginId = useActivePlugin()?.pluginId;
  const version = useActiveVersion(pluginId);
  const section = sections.find((item) => item.pluginId === pluginId);
  if (!section) {
    return null;
  }
  const mainDoc = version?.docs.find(({id}) => id === version.mainDocId);
  return {label: section.label, href: mainDoc?.path ?? version?.path};
}
