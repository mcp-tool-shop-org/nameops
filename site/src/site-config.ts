import type { SiteConfig } from '@mcptoolshop/site-theme';

export const config: SiteConfig = {
  title: 'nameops',
  description: 'Name clearance orchestrator — batch runs, publish, and PR automation for the clearance-opinion-engine',
  logoBadge: 'N',
  brandName: 'nameops',
  repoUrl: 'https://github.com/mcp-tool-shop-org/nameops',
  footerText: 'MIT Licensed — built by <a href="https://github.com/mcp-tool-shop-org" style="color:var(--color-muted);text-decoration:underline">mcp-tool-shop-org</a>',

  hero: {
    badge: 'Orchestrator',
    headline: 'Clearance runs,',
    headlineAccent: 'fully automated.',
    description: 'Turn a name list into batch clearance runs, published artifacts, and human-readable PR summaries — in a single command.',
    primaryCta: { href: '#quickstart', label: 'Quick start' },
    secondaryCta: { href: '#how-it-works', label: 'How it works' },
    previews: [
      {
        label: 'Run',
        code: 'node src/run.mjs \\\n  --out artifacts \\\n  --profile data/profile.json \\\n  --names data/names.txt',
      },
      {
        label: 'PR body',
        code: '# After the run:\nnode src/build-pr-body.mjs artifacts\n# → artifacts/pr-body.md (tier summaries, collision cards, cost stats)',
      },
      {
        label: 'Output',
        code: 'artifacts/\n  metadata.json      # run date, duration, counts\n  pr-body.md         # ready to paste into a GitHub PR\n  batch/             # raw COE output\n  published/<slug>/  # report.html, summary.json, run.json',
      },
    ],
  },

  sections: [
    {
      kind: 'features',
      id: 'how-it-works',
      title: 'What nameops does',
      subtitle: 'Three steps. One command. Structured output for downstream automation.',
      features: [
        {
          title: 'Batch clearance',
          desc: 'Feeds every name in names.txt to the COE CLI in a single batch run. Handles concurrency, cache, and timeout via profile.json — no flags to memorize.',
        },
        {
          title: 'Publish & validate',
          desc: 'For each name slug, publishes per-artifact directories and a runs.json index, then validates the full output with coe validate-artifacts.',
        },
        {
          title: 'PR-ready output',
          desc: "Generates a Markdown PR body with tier summaries, collision cards, and cost stats — structured for the marketing repo's scheduled automation to consume directly.",
        },
      ],
    },
    {
      kind: 'data-table',
      id: 'profile',
      title: 'Profile fields',
      subtitle: 'All COE flags live in data/profile.json. Edit once, run anywhere.',
      columns: ['Field', 'COE flag', 'Default'],
      rows: [
        ['channels', '--channels', 'all'],
        ['org', '--org', 'mcp-tool-shop-org'],
        ['dockerNamespace', '--dockerNamespace', 'mcptoolshop'],
        ['hfOwner', '--hfOwner', 'mcptoolshop'],
        ['risk', '--risk', 'conservative'],
        ['concurrency', '--concurrency', '3'],
        ['maxAgeHours', '--max-age-hours', '168 (7 days)'],
        ['variantBudget', '--variantBudget', '12'],
        ['maxRuntimeMinutes', 'workflow timeout', '15'],
      ],
    },
    {
      kind: 'code-cards',
      id: 'quickstart',
      title: 'Quick start',
      cards: [
        {
          title: '1. Install the clearance engine',
          code: 'npm install -g @mcptoolshop/clearance-opinion-engine',
        },
        {
          title: '2. Add your names',
          code: '# data/names.txt — one name per line, # for comments\nnameops\nclearance-kit\nbrandwave',
        },
        {
          title: '3. Run the pipeline',
          code: 'node src/run.mjs --out artifacts --profile data/profile.json --names data/names.txt',
        },
        {
          title: '4. Build the PR body',
          code: 'node src/build-pr-body.mjs artifacts\n# → artifacts/pr-body.md',
        },
      ],
    },
    {
      kind: 'features',
      id: 'design',
      title: 'Design principles',
      subtitle: 'An orchestrator, not a service.',
      features: [
        {
          title: 'No runtime dependencies',
          desc: 'nameops has no runtime dependencies beyond Node.js and the COE CLI. It orchestrates; it does not own data.',
        },
        {
          title: 'Schedule lives in the marketing repo',
          desc: 'Per project rules, nameops owns the logic. The marketing repo owns the schedule, opening PRs with the generated artifacts automatically.',
        },
        {
          title: 'Tested pipeline logic',
          desc: 'Unit tests cover profile loading, flag mapping, PR body generation, and pipeline orchestration. Run npm test before any change.',
        },
      ],
    },
  ],
};
