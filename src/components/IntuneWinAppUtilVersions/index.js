import {useEffect, useState} from 'react';

// Kept up to date by a weekly workflow of the IntuneWinAppUtilGUI repository; the GUI reads the same file.
const SOURCE = 'https://raw.githubusercontent.com/gioxx/IntuneWinAppUtilGUI/main/Tools/IntuneWinAppUtilVersions.json';
const GITHUB_COPY = 'https://github.com/gioxx/IntuneWinAppUtilGUI/blob/main/Tools/IntuneWinAppUtilVersions.md';

export default function IntuneWinAppUtilVersions() {
  const [state, setState] = useState({status: 'loading'});

  useEffect(() => {
    let cancelled = false;
    fetch(SOURCE, {cache: 'no-cache'})
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data.releases) || !data.releases.length) throw new Error('the list is empty');
        if (!cancelled) setState({status: 'ready', data});
      })
      .catch((error) => {
        if (!cancelled) setState({status: 'error', message: error.message});
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === 'loading') {
    return <p>Loading the version list…</p>;
  }
  if (state.status === 'error') {
    return (
      <div className="alert alert--warning" role="alert">
        The version list could not be loaded ({state.message}). The same list is on{' '}
        <a href={GITHUB_COPY}>GitHub</a>.
      </div>
    );
  }

  const {data} = state;
  const updated = data.updated ? new Date(data.updated).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'}) : null;
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Release</th>
            <th>IntuneWinAppUtil.exe FileVersion</th>
          </tr>
        </thead>
        <tbody>
          {data.releases.map(({release, fileVersion}, index) => (
            <tr key={release}>
              <td>
                <a href={`${data.source}/releases/tag/${release}`}>{release}</a>
                {index === 0 && <strong> (latest)</strong>}
              </td>
              <td>
                <code>{fileVersion}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {updated && <p><small>List last regenerated on {updated}.</small></p>}
    </>
  );
}
