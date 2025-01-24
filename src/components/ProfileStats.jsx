import React from "react";
import { StatCard } from "./StatCard";
import LanguageChart from "./LanguageChart";
import { calculateGitHubStats } from "../services/githubStats";

function ProfileStats({ profile, repos }) {
  const githubStats = calculateGitHubStats(repos, profile);

  if (!profile || !repos.length) {
    return (
      <div className="flex flex-col w-full gap-6 px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-4 animate-pulse md:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 rounded-2xl dark:bg-slate-800"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard
          title="Total Repos"
          value={githubStats.stats.public_repos}
          icon="📦"
        />
        <StatCard
          title="Total Stars"
          value={githubStats.stats.total_stars}
          icon="⭐"
        />
        <StatCard
          title="Followers"
          value={githubStats.stats.followers}
          icon="🫂"
        />
        <StatCard
          title="Following"
          value={githubStats.stats.following}
          icon="➡️"
        />
      </div>

      <div className="items-center justify-center w-full">
        <LanguageChart languages={githubStats.languages} />
      </div>
    </div>
  );
}

export default ProfileStats;
