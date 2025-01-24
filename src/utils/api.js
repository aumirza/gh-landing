import { reposUrl, profileUrl } from "../constants";

// Cache helper functions
const getCache = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, expires } = JSON.parse(cached);
  if (expires && new Date().getTime() > expires) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
};

const setCache = (key, data, expiryHours = 24) => {
  const expires = new Date().getTime() + expiryHours * 60 * 60 * 1000;
  localStorage.setItem(key, JSON.stringify({ data, expires }));
};

export const fetchAllRepos = async () => {
  const cachedRepos = getCache("repos");
  if (cachedRepos) {
    return cachedRepos;
  }

  let page = 1;
  let allRepos = [];
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(`${reposUrl}?page=${page}&per_page=100`);
    const repos = await response.json();

    if (repos.length === 0) {
      hasMore = false;
    } else {
      allRepos = [...allRepos, ...repos];
      page++;
    }
  }

  setCache("repos", allRepos, 24); // 24 hours expiry
  return allRepos;
};

export const fetchProfile = async () => {
  const cachedProfile = getCache("profile");
  if (cachedProfile) {
    return cachedProfile;
  }

  const response = await fetch(profileUrl);
  if (response.ok) {
    const json = await response.json();
    setCache("profile", json, 168); // Cache for one week (168 hours)
    return json;
  }
  return null;
};
