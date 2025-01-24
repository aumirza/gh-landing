export const Profile = ({ profile }) => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
        <img
          src={profile.avatar_url}
          alt={`${profile.name}'s avatar`}
          className="w-40 h-40 rounded-full ring-4 ring-slate-500 dark:ring-white"
        />
        <div className="flex flex-col items-center gap-4 md:items-start">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <a
              href={profile.html_url}
              className="transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1 className="text-3xl font-bold group-hover:text-blue-500 dark:group-hover:text-blue-400">
                {profile.name}
              </h1>
            </a>
            <h2 className="text-xl text-gray-600 dark:text-gray-400">
              @{profile.login}
            </h2>
          </div>
          {profile.bio && (
            <p className="text-lg text-center md:text-left text-gray-600 dark:text-gray-300 max-w-xl">
              {profile.bio}
            </p>
          )}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300">
            {profile.location && (
              <div className="flex items-center gap-2">
                <span>📍</span>
                <span>{profile.location}</span>
              </div>
            )}
            {profile.blog && (
              <a
                href={profile.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-500"
              >
                <span>🔗</span>
                <span>{profile.blog}</span>
              </a>
            )}
            {profile.twitter_username && (
              <a
                href={`https://twitter.com/${profile.twitter_username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-blue-500"
              >
                <span>🐦</span>
                <span>@{profile.twitter_username}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
