import clusteringData from '@/data/clustering_results.json';

export interface ClusterData {
  cluster_id: number;
  label: string;
  size: number;
  venn_position: string;
  platform_sentiments: {
    Slack: { avg: number; count: number };
    discordapp: { avg: number; count: number };
    MicrosoftTeams: { avg: number; count: number };
  };
  keywords: Array<[string, number]>;
  examples: Array<{ text: string; sentiment_score: number }>;
}

export interface ComparisonInsight {
  category: 'universal' | 'competitor_strength' | 'slack_advantage' | 'discord_only' | 'teams_only';
  label: string;
  vennPosition: string;
  slackSentiment: number;
  discordSentiment: number;
  teamsSentiment: number;
  size: number;
  summary: string;
  color: string;
}

// Map platform names from data to display names
const platformMap = {
  Slack: 'slack',
  discordapp: 'discord',
  MicrosoftTeams: 'teams',
};

export function getClusterInsights(): ComparisonInsight[] {
  const clusters = Object.values(clusteringData.clusters) as any[] as ClusterData[];
  
  return clusters.map((cluster) => {
    const slackSent = cluster.platform_sentiments.Slack.avg;
    const discordSent = cluster.platform_sentiments.discordapp.avg;
    const teamsSent = cluster.platform_sentiments.MicrosoftTeams.avg;
    
    const category = determineCategory(cluster.venn_position, slackSent, discordSent, teamsSent);
    const summary = generateSummary(cluster, slackSent, discordSent, teamsSent);
    const color = getCategoryColor(category);
    
    return {
      category,
      label: cluster.label,
      vennPosition: cluster.venn_position,
      slackSentiment: slackSent,
      discordSentiment: discordSent,
      teamsSentiment: teamsSent,
      size: cluster.size,
      summary,
      color,
    };
  });
}

function determineCategory(
  vennPosition: string,
  slack: number,
  discord: number,
  teams: number
): ComparisonInsight['category'] {
  if (vennPosition === 'all_3') {
    return 'universal';
  } else if (vennPosition === 'discord_only') {
    return 'discord_only';
  } else if (vennPosition === 'teams_only') {
    return 'teams_only';
  } else if (slack > discord && slack > teams) {
    return 'slack_advantage';
  } else {
    return 'competitor_strength';
  }
}

function generateSummary(
  cluster: ClusterData,
  slack: number,
  discord: number,
  teams: number
): string {
  const totalComments = cluster.platform_sentiments.Slack.count + 
    cluster.platform_sentiments.discordapp.count + 
    cluster.platform_sentiments.MicrosoftTeams.count;
  
  const percentage = ((cluster.size / 4662) * 100).toFixed(0);
  
  if (cluster.venn_position === 'all_3') {
    return `${percentage}% of all feedback overlaps across platforms — sentiment ranges from ${Math.min(slack, discord, teams).toFixed(2)} to ${Math.max(slack, discord, teams).toFixed(2)}`;
  } else if (cluster.venn_position === 'discord_only') {
    return `Discord-exclusive discussions with ${discord.toFixed(2)} avg sentiment`;
  } else if (cluster.venn_position === 'teams_only') {
    return `Teams-specific feedback with ${teams.toFixed(2)} avg sentiment`;
  } else if (slack > discord + 0.1 && slack > teams + 0.1) {
    return `Slack outperforms with +${(slack - Math.max(discord, teams)).toFixed(2)} sentiment advantage`;
  } else if (discord > slack + 0.1 || teams > slack + 0.1) {
    const leader = discord > teams ? 'Discord' : 'Teams';
    const advantage = Math.max(discord, teams) - slack;
    return `${leader} shows ${advantage > 0 ? '+' : ''}${advantage.toFixed(2)} higher sentiment than Slack`;
  } else {
    return `Similar sentiment across platforms (${totalComments} comments)`;
  }
}

function getCategoryColor(category: ComparisonInsight['category']): string {
  switch (category) {
    case 'universal':
      return 'hsl(var(--slack))'; // Blended center
    case 'slack_advantage':
      return 'hsl(var(--success))';
    case 'competitor_strength':
      return 'hsl(var(--warning))';
    case 'discord_only':
      return 'hsl(var(--accent))';
    case 'teams_only':
      return 'hsl(var(--secondary))';
    default:
      return 'hsl(var(--muted))';
  }
}

export function getComparisonMetrics() {
  const clusters = Object.values(clusteringData.clusters) as any[] as ClusterData[];
  
  // Calculate average sentiments per platform
  let slackTotal = 0, slackCount = 0;
  let discordTotal = 0, discordCount = 0;
  let teamsTotal = 0, teamsCount = 0;
  
  clusters.forEach((cluster) => {
    const slack = cluster.platform_sentiments.Slack;
    const discord = cluster.platform_sentiments.discordapp;
    const teams = cluster.platform_sentiments.MicrosoftTeams;
    
    slackTotal += slack.avg * slack.count;
    slackCount += slack.count;
    
    discordTotal += discord.avg * discord.count;
    discordCount += discord.count;
    
    teamsTotal += teams.avg * teams.count;
    teamsCount += teams.count;
  });
  
  return {
    slack: slackCount > 0 ? slackTotal / slackCount : 0,
    discord: discordCount > 0 ? discordTotal / discordCount : 0,
    teams: teamsCount > 0 ? teamsTotal / teamsCount : 0,
    totalComments: clusteringData.metadata.total_comments,
    totalClusters: clusteringData.metadata.total_clusters,
  };
}

export function getSentimentDelta(platform: 'discord' | 'teams', cluster: ClusterData): string {
  const slackSent = cluster.platform_sentiments.Slack.avg;
  const competitorSent = platform === 'discord' 
    ? cluster.platform_sentiments.discordapp.avg 
    : cluster.platform_sentiments.MicrosoftTeams.avg;
  
  const delta = competitorSent - slackSent;
  
  if (Math.abs(delta) < 0.05) {
    return 'Similar sentiment to Slack';
  } else if (delta > 0) {
    return `+${delta.toFixed(2)} higher than Slack`;
  } else {
    return `${delta.toFixed(2)} lower than Slack`;
  }
}
