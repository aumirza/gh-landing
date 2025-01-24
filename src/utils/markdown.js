export function extractImages(markdown) {
  // Match both Markdown and HTML images in a single regex
  const combinedRegex = /(?:!\[.*?\]\((.*?)\)|<img.*?src="(.*?)".*?>)/g;
  const images = [];
  let match;

  while ((match = combinedRegex.exec(markdown)) !== null) {
    // match[1] will contain Markdown URL, match[2] will contain HTML URL
    const imageUrl = match[1] || match[2];
    images.push(imageUrl);
  }

  return images;
}
