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
    date: '2024-10',
    platform: 'slack' as Platform,
    event: 'Slack AI Assistant Launch',
    impact: 'positive'
  },
  {
    date: '2024-11',
    platform: 'discord' as Platform,
    event: 'Discord AI Channels Beta',
    impact: 'positive'
  },
  {
    date: '2024-12',
    platform: 'teams' as Platform,
    event: 'Teams Performance Update',
    impact: 'neutral'
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
    id: 'discord-ai-surge',
    title: 'Discord AI Channels Driving 12% Sentiment Spike',
    competitor: 'discord',
    trend: 'Discord users are raving about AI Channels - a 45-point sentiment jump in just 4 months',
    impact: 'threat',
    actionableRecommendation: 'Accelerate Slack AI feature rollout and improve discoverability. Users want AI to feel more "present" in conversations.',
    slackComparison: 'Slack AI sentiment +13 points, but Discord gaining faster. Risk: Discord could capture the "AI-first" workspace narrative.',
    priority: 'high'
  },
  {
    id: 'slack-pricing-concern',
    title: 'Pricing Concerns Creating Churn Risk',
    competitor: 'slack',
    trend: 'Slack pricing sentiment dropped 20 points - now at 40% negative. Small teams citing "too expensive" in 1,456 mentions.',
    impact: 'threat',
    actionableRecommendation: 'Launch a competitive free tier or introduce flexible team pricing. Discord and Teams offering more for less.',
    slackComparison: 'Teams pricing criticism at 55%, Discord praised for "free forever" model. Opportunity to reposition value.',
    priority: 'high'
  },
  {
    id: 'teams-performance-weakness',
    title: 'Teams Performance Issues = Slack Opportunity',
    competitor: 'teams',
    trend: 'Teams sentiment plummeting on performance (-15 points). 2,103 complaints about lag, crashes, and resource usage.',
    impact: 'opportunity',
    actionableRecommendation: 'Market Slack as the "fast & reliable" alternative. Create migration content targeting frustrated Teams users.',
    slackComparison: 'Slack performance sentiment neutral (65%) vs Teams negative (30%). Clear competitive advantage to amplify.',
    priority: 'medium'
  },
  {
    id: 'discord-community-strength',
    title: 'Discord Community Tools Leading Category',
    competitor: 'discord',
    trend: 'Discord community management sentiment at 88% - users love customization, moderation, and server flexibility.',
    impact: 'opportunity',
    actionableRecommendation: 'Invest in Slack Connect and community features. Add more customization options for channels and workspaces.',
    slackComparison: 'Slack lacks community-first features that power Discord. Could capture this segment with the right product pivot.',
    priority: 'medium'
  },
  {
    id: 'teams-integration-advantage',
    title: 'Teams Microsoft Integration Sticky but Limited',
    competitor: 'teams',
    trend: 'Teams Microsoft 365 integration sentiment stable at 78%. Enterprise users locked in but not enthusiastic.',
    impact: 'neutral',
    actionableRecommendation: 'Deepen integrations with Google Workspace, Salesforce, and other enterprise tools to create stickiness beyond Microsoft.',
    slackComparison: 'Slack can win by being the "best integrations platform" - more partners, better APIs, smoother workflows.',
    priority: 'low'
  }
];
