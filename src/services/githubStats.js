export const calculateGitHubStats = (repos = [], profile = null) => {
  if (!repos.length || !profile) {
    return {
      stats: {
        public_repos: 0,
        followers: 0,
        following: 0,
        total_stars: 0,
      },
      languages: {},
      streak: {
        totalRepos: 0,
        currentStreak: 0,
        lastPush: null,
        daysSinceLastPush: 0,
      },
    };
  }

  // Calculate language stats with percentages
  const languages = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = {
        count: (acc[repo.language]?.count || 0) + 1,
        percentage: 0,
      };
    }
    return acc;
  }, {});

  // Calculate percentages
  const totalRepos = Object.values(languages).reduce(
    (sum, lang) => sum + lang.count,
    0
  );
  Object.values(languages).forEach((lang) => {
    lang.percentage = Math.round((lang.count / totalRepos) * 100);
  });

  // Calculate total stars
  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  // Calculate streak
  const pushDates = repos
    .map((repo) => new Date(repo.pushed_at))
    .sort((a, b) => b - a);

  const now = new Date();
  const lastPush = pushDates[0];
  const daysSinceLastPush = lastPush
    ? Math.floor((now - lastPush) / (1000 * 60 * 60 * 24))
    : 0;

  // Reset streak if no activity in last 24 hours
  const currentStreak = daysSinceLastPush <= 1 ? 1 : 0;

  return {
    stats: {
      public_repos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      total_stars: totalStars,
    },
    languages,
    streak: {
      totalRepos,
      currentStreak,
      lastPush: lastPush?.toISOString(),
      daysSinceLastPush,
    },
  };
};
