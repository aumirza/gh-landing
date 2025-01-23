const username = import.meta.env.VITE_GITHUB_USERNAME;
export const reposUrl = `https://api.github.com/users/${username}/repos`;
export const profileUrl = `https://api.github.com/users/${username}`;

// const urlRegex = /https?:\/\/[^\s]+/
export const ogImageRegex =
  /<meta property="og:image" content="(https?:\/\/[^\s]+)" \/>/;
