import { getOpenGraphImage } from "./OpenGraph";
import { fetchReadme } from "./fetchReadme";
import { extractImages } from "./markdown";
import { getCache, getCachedPath, fetchAndCacheImage } from "./imageCache";

export async function fetchRepoImage(repo) {
  // Check cache first
  const cached = getCache(repo.html_url);
  if (cached) return cached;

  // Check path cache
  const cachedPath = getCachedPath(repo.html_url);
  if (cachedPath) {
    return fetchAndCacheImage(cachedPath, repo.html_url);
  }

  // Fetch new image
  const readme = await fetchReadme(repo.html_url);
  if (readme) {
    const images = extractImages(readme);
    if (images.length > 0) {
      let imageUrl = images[0];
      if (!imageUrl.startsWith("http")) {
        imageUrl = `https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/${repo.default_branch}/${imageUrl}`;
      }
      return fetchAndCacheImage(imageUrl, repo.html_url);
    }
  }

  const ogImage = await getOpenGraphImage(repo.html_url);
  if (ogImage) {
    return fetchAndCacheImage(ogImage, repo.html_url);
  }
  return null;
}
