export type SentimentType = 'positive' | 'neutral' | 'negative';
export type Platform = 'slack' | 'discord' | 'teams';

export interface TopicCluster {
  id: string;
  topic: string;
  sentiment: SentimentType;
  mentions: number;
  engagement: number;
  quotes: string[];
  trend: number[];
}

export interface PlatformData {
  platform: Platform;
  name: string;
  planetType: string;
  overallSentiment: number;
  sentimentChange: number;
  topics: TopicCluster[];
}

export const sentimentData: PlatformData[] = [
  {
    platform: 'slack',
    name: 'Slack',
    planetType: 'Primary Platform',
    overallSentiment: 72,
    sentimentChange: -8,
    topics: [
      {
        id: 'slack-ai',
        topic: 'AI Features',
        sentiment: 'positive',
        mentions: 1247,
        engagement: 0.85,
        quotes: [
          "Slack's AI feels sticky sweet — love it!",
          "The AI search is incredible, saves me hours",
          "Smart replies are surprisingly accurate"
        ],
        trend: [65, 68, 72, 75, 78, 82, 85]
      },
      {
        id: 'slack-perf',
        topic: 'Performance',
        sentiment: 'neutral',
        mentions: 892,
        engagement: 0.65,
        quotes: [
          "Loading times could be better",
          "Sometimes sluggish with large workspaces",
          "Mobile app needs optimization"
        ],
        trend: [70, 68, 65, 63, 65, 64, 65]
      },
      {
        id: 'slack-pricing',
        topic: 'Pricing',
        sentiment: 'negative',
        mentions: 1456,
        engagement: 0.92,
        quotes: [
          "Too expensive for small teams",
          "Free plan is too limited",
          "Hard to justify the cost"
        ],
        trend: [60, 55, 50, 48, 45, 43, 40]
      }
    ]
  },
  {
    platform: 'discord',
    name: 'Discord',
    planetType: 'Competitor Platform',
    overallSentiment: 84,
    sentimentChange: 12,
    topics: [
      {
        id: 'discord-ai',
        topic: 'AI Channels',
        sentiment: 'positive',
        mentions: 2341,
        engagement: 0.95,
        quotes: [
          "AI channels are a game-changer!",
          "Discord's AI integration is smooth",
          "Best AI features I've seen in any platform"
        ],
        trend: [50, 62, 75, 82, 88, 92, 95]
      },
      {
        id: 'discord-community',
        topic: 'Community Tools',
        sentiment: 'positive',
        mentions: 1823,
        engagement: 0.88,
        quotes: [
          "Community management is so easy",
          "Moderation tools are powerful",
          "Love the server customization"
        ],
        trend: [78, 80, 82, 84, 86, 88, 88]
      },
      {
        id: 'discord-ui',
        topic: 'Interface',
        sentiment: 'neutral',
        mentions: 734,
        engagement: 0.58,
        quotes: [
          "UI can be overwhelming for new users",
          "Wish it was more intuitive",
          "Takes time to learn all features"
        ],
        trend: [65, 64, 63, 62, 60, 59, 58]
      }
    ]
  },
  {
    platform: 'teams',
    name: 'Microsoft Teams',
    planetType: 'Competitor Platform',
    overallSentiment: 58,
    sentimentChange: -3,
    topics: [
      {
        id: 'teams-integration',
        topic: 'Microsoft Integration',
        sentiment: 'positive',
        mentions: 1567,
        engagement: 0.78,
        quotes: [
          "Perfect for Office 365 users",
          "Integration with Outlook is seamless",
          "Calendar features are great"
        ],
        trend: [75, 76, 77, 78, 78, 78, 78]
      },
      {
        id: 'teams-perf',
        topic: 'Performance',
        sentiment: 'negative',
        mentions: 2103,
        engagement: 0.89,
        quotes: [
          "So slow and laggy",
          "Crashes during important meetings",
          "Resource hog on my computer"
        ],
        trend: [45, 42, 40, 38, 35, 33, 30]
      },
      {
        id: 'teams-ui',
        topic: 'User Experience',
        sentiment: 'negative',
        mentions: 1834,
        engagement: 0.82,
        quotes: [
          "Cluttered interface",
          "Too many clicks to do simple things",
          "Confusing navigation"
        ],
        trend: [55, 52, 50, 48, 45, 43, 40]
      }
    ]
  }
];

export const timelineEvents = [
  {
    date: '2025-10-18',
    platform: 'discord' as Platform,
    event: 'Discord AI Copilot Launch - 95% positive sentiment',
    impact: 'positive'
  },
  {
    date: '2025-10-24',
    platform: 'discord' as Platform,
    event: 'Discord announces Forever Free AI - viral on social media',
    impact: 'positive'
  },
  {
    date: '2025-10-25',
    platform: 'teams' as Platform,
    event: 'Teams Global Outage - 4 hours, 2M+ users affected',
    impact: 'negative'
  },
  {
    date: '2025-10-22',
    platform: 'discord' as Platform,
    event: 'Discord Enterprise Beta launched - targeting Slack users',
    impact: 'positive'
  },
  {
    date: '2025-10-24',
    platform: 'teams' as Platform,
    event: 'Teams Copilot Update - mixed reception, performance issues',
    impact: 'neutral'
  },
  {
    date: '2025-10-20',
    platform: 'discord' as Platform,
    event: 'Discord Canvas feature released - collaborative docs',
    impact: 'positive'
  }
];

export interface CompetitiveInsight {
  id: string;
  title: string;
  competitor: Platform;
  trend: string;
  impact: 'opportunity' | 'threat' | 'neutral';
  actionableRecommendation: string;
  slackComparison: string;
  priority: 'high' | 'medium' | 'low';
}

export const competitiveInsights: CompetitiveInsight[] = [
  {
    id: 'discord-ai-launch',
    title: 'Discord Just Released AI Copilot (Last Week)',
    competitor: 'discord',
    trend: 'Discord launched AI Copilot 7 days ago - already seeing 2,341 mentions with 95% positive sentiment. Users migrating from Slack for "better AI experience".',
    impact: 'threat',
    actionableRecommendation: 'URGENT: Counter-launch with enhanced Slack AI features this month. Discord capturing "AI-first" narrative directly from our user base.',
    slackComparison: 'Slack losing 8% sentiment this week as users compare AI features. Discord AI rated 95% vs Slack AI 85%. Churn risk in tech-forward teams.',
    priority: 'high'
  },
  {
    id: 'discord-pricing-attack',
    title: 'Discord Announced "Forever Free AI" Yesterday',
    competitor: 'discord',
    trend: 'Discord announced unlimited free AI access 24 hours ago. Social media erupting with Slack price comparisons. 1,456 mentions of Slack being "too expensive".',
    impact: 'threat',
    actionableRecommendation: 'CRITICAL: Immediate pricing response needed. Consider limited free AI tier or match Discord offering to prevent mass exodus.',
    slackComparison: 'Slack pricing at 40% negative sentiment while Discord praised. Already seeing 12% uptick in Slack-to-Discord migration searches.',
    priority: 'high'
  },
  {
    id: 'teams-outage-recent',
    title: 'Teams Major Outage This Morning (4 Hours)',
    competitor: 'teams',
    trend: 'Teams suffered 4-hour global outage today affecting 2M+ users. Twitter flooded with complaints. Sentiment crashed 15 points in 12 hours.',
    impact: 'opportunity',
    actionableRecommendation: 'IMMEDIATE: Launch targeted "Switch to Slack" campaign while sentiment is low. Offer free migration support for Teams users.',
    slackComparison: 'Perfect moment to highlight Slack 99.9% uptime. Teams users actively seeking alternatives RIGHT NOW. Window closes in 48-72 hours.',
    priority: 'high'
  },
  {
    id: 'discord-enterprise-push',
    title: 'Discord Enterprise Beta (Launched 3 Days Ago)',
    competitor: 'discord',
    trend: 'Discord quietly launched Enterprise Beta with advanced security and compliance. 823 mentions from IT decision-makers testing it as "Slack alternative".',
    impact: 'threat',
    actionableRecommendation: 'Strengthen enterprise messaging - emphasize Slack security track record and enterprise features Discord lacks. Target CIOs directly.',
    slackComparison: 'Discord entering enterprise space for first time. Could undercut Slack pricing while offering comparable features. Monitor beta feedback closely.',
    priority: 'high'
  },
  {
    id: 'teams-copilot-update',
    title: 'Teams Copilot Update Released Yesterday',
    competitor: 'teams',
    trend: 'Teams pushed Copilot enhancement yesterday but user reception mixed. 734 mentions with only 58% positive - "still laggy" complaints persist.',
    impact: 'opportunity',
    actionableRecommendation: 'Capitalize on Teams AI disappointment. Position Slack AI as "actually fast and reliable" - run comparison campaigns.',
    slackComparison: 'Teams Copilot rated 58% while Slack AI at 85%. Clear advantage but need to amplify messaging before next Teams update.',
    priority: 'medium'
  },
  {
    id: 'discord-canvas-feature',
    title: 'Discord Canvas (Collaborative Docs) - 5 Days Old',
    competitor: 'discord',
    trend: 'Discord Canvas launched 5 days ago bringing real-time docs to channels. 1,823 users praising it as "Notion meets Slack but better".',
    impact: 'threat',
    actionableRecommendation: 'Slack lacks native collaborative docs feature. Consider partnership or acquisition to match Discord Canvas functionality.',
    slackComparison: 'Discord adding features Slack users have requested for years. Risk of positioning Discord as "more complete platform".',
    priority: 'medium'
  }
];
