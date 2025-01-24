const memoryCache = new Map();

export const cacheKey = (repoUrl) => `img_cache_${repoUrl}`;
export const pathCacheKey = (repoUrl) => `img_path_${repoUrl}`;

export const getCache = (repoUrl) => {
  // Check memory first
  if (memoryCache.has(repoUrl)) {
    return memoryCache.get(repoUrl);
  }
  // Then check localStorage
  return localStorage.getItem(cacheKey(repoUrl));
};

export const getCachedPath = (repoUrl) => {
  return localStorage.getItem(pathCacheKey(repoUrl));
};

export const setCache = (repoUrl, imageData, imagePath) => {
  memoryCache.set(repoUrl, imageData);
  localStorage.setItem(cacheKey(repoUrl), imageData);
  localStorage.setItem(pathCacheKey(repoUrl), imagePath);
};

export const fetchAndCacheImage = async (imageUrl, repoUrl) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const base64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    setCache(repoUrl, base64, imageUrl);
    return base64;
  } catch (error) {
    console.error("Image caching failed:", error);
    return imageUrl;
  }
};
