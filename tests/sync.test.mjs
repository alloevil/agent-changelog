import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  detectTag,
  formatChangelogData,
  groupByMonth,
  parseFeatures,
  releaseToChangelogEntry,
} from '../scripts/sync.mjs';

// ── detectTag ──

describe('detectTag', () => {
  it('maps Breaking to Breaking', () => {
    assert.equal(detectTag('Breaking'), 'Breaking');
  });

  it('maps Changes to 新功能', () => {
    assert.equal(detectTag('Changes'), '新功能');
  });

  it('maps Fixes to 修复', () => {
    assert.equal(detectTag('Fixes'), '修复');
  });

  it('defaults unknown sections to 新功能', () => {
    assert.equal(detectTag('Other'), '新功能');
    assert.equal(detectTag(''), '新功能');
  });
});

// ── parseFeatures ──

describe('parseFeatures', () => {
  it('returns empty array for null/undefined body', () => {
    assert.deepEqual(parseFeatures(null), []);
    assert.deepEqual(parseFeatures(undefined), []);
    assert.deepEqual(parseFeatures(''), []);
  });

  it('parses standard OpenClaw release format', () => {
    const body = `### Changes
- New skill system: allows custom tool integration
- Browser automation: added snapshot action

### Fixes
- Fix memory leak in session manager
- Fix cron job not firing on schedule`;

    const features = parseFeatures(body);
    assert.equal(features.length, 4);
    assert.equal(features[0].tag, '新功能');
    assert.equal(features[0].title, 'New skill system');
    assert.equal(features[1].tag, '新功能');
    assert.equal(features[2].tag, '修复');
    assert.equal(features[2].title, 'Fix memory leak in session manager');
    assert.equal(features[3].tag, '修复');
  });

  it('parses Breaking section', () => {
    const body = `### Breaking
- Removed deprecated API endpoint /v1/old
- Changed config format from YAML to JSON`;

    const features = parseFeatures(body);
    assert.equal(features.length, 2);
    assert.equal(features[0].tag, 'Breaking');
    assert.equal(features[1].tag, 'Breaking');
  });

  it('handles Chinese colon separator for title extraction', () => {
    const body = `### Changes
- 浏览器自动化：新增快照功能，支持页面状态捕获`;

    const features = parseFeatures(body);
    assert.equal(features.length, 1);
    assert.equal(features[0].title, '浏览器自动化');
  });

  it('handles bullet items with * instead of -', () => {
    const body = `### Changes
* First item
* Second item`;

    const features = parseFeatures(body);
    assert.equal(features.length, 2);
    assert.equal(features[0].detail, 'First item');
    assert.equal(features[1].detail, 'Second item');
  });

  it('skips HTML comments', () => {
    const body = `<!-- This is a comment -->
### Changes
- Real feature`;

    const features = parseFeatures(body);
    assert.equal(features.length, 1);
    assert.equal(features[0].detail, 'Real feature');
  });

  it('handles continuation lines', () => {
    const body = `### Changes
- Feature title
  More detail here
  Even more detail`;

    const features = parseFeatures(body);
    assert.equal(features.length, 1);
    assert.ok(features[0].detail.includes('More detail here'));
    assert.ok(features[0].detail.includes('Even more detail'));
  });

  it('truncates title at 40 chars when no separator', () => {
    const longText = 'A'.repeat(60);
    const body = `### Changes
- ${longText}`;

    const features = parseFeatures(body);
    assert.ok(features[0].title.length <= 40);
  });

  it('sets summary from detail when not explicitly set', () => {
    const body = `### Changes
- Short text`;

    const features = parseFeatures(body);
    assert.equal(features[0].summary, 'Short text');
  });
});

// ── releaseToChangelogEntry ──

describe('releaseToChangelogEntry', () => {
  it('converts a release object to changelog entry', () => {
    const release = {
      tag_name: 'v1.2.3',
      published_at: '2026-03-15T10:00:00Z',
      body: `### Changes\n- New feature`,
    };

    const entry = releaseToChangelogEntry(release);
    assert.equal(entry.version, 'v1.2.3');
    assert.equal(entry.date, '2026-03-15');
    assert.equal(entry.features.length, 1);
  });

  it('prepends v to version if missing', () => {
    const release = {
      tag_name: '1.0.0',
      published_at: '2026-01-01T00:00:00Z',
      body: '',
    };

    assert.equal(releaseToChangelogEntry(release).version, 'v1.0.0');
  });

  it('falls back to created_at when published_at is missing', () => {
    const release = {
      tag_name: 'v1.0.0',
      created_at: '2026-01-01T00:00:00Z',
      body: '',
    };

    assert.equal(releaseToChangelogEntry(release).date, '2026-01-01');
  });
});

// ── groupByMonth ──

describe('groupByMonth', () => {
  it('groups entries by year-month', () => {
    const entries = [
      { version: 'v1.0.0', date: '2026-03-15', features: [] },
      { version: 'v1.1.0', date: '2026-03-20', features: [] },
      { version: 'v2.0.0', date: '2026-04-01', features: [] },
    ];

    const months = groupByMonth(entries);
    assert.equal(months.length, 2);
    assert.equal(months[0].monthId, '2026-04'); // newest first
    assert.equal(months[0].releases.length, 1);
    assert.equal(months[1].monthId, '2026-03');
    assert.equal(months[1].releases.length, 2);
  });

  it('formats month labels in Chinese', () => {
    const entries = [{ version: 'v1.0.0', date: '2026-01-01', features: [] }];

    const months = groupByMonth(entries);
    assert.equal(months[0].month, '2026 年 1 月');
  });
});

// ── formatChangelogData ──

describe('formatChangelogData', () => {
  it('produces valid JS-parseable output', () => {
    const months = [
      {
        month: '2026 年 3 月',
        monthId: '2026-03',
        releases: [
          {
            version: 'v1.0.0',
            date: '2026-03-15',
            features: [
              {
                title: 'New feature',
                tag: '新功能',
                summary: 'New feature added',
                detail: 'New feature: does something cool',
                summaryZh: null,
              },
            ],
          },
        ],
      },
    ];

    const output = formatChangelogData(months);
    // Should be valid JS that can be eval'd
    const data = new Function(`return ${output}`)();
    assert.equal(data.length, 1);
    assert.equal(data[0].monthId, '2026-03');
    assert.equal(data[0].releases[0].version, 'v1.0.0');
    assert.equal(data[0].releases[0].features[0].title, 'New feature');
  });
});
