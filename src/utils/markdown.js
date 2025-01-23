export function extractImages(markdown) {
  const imageRegex = /!\[.*?\]\((.*?)\)/g; // Match Markdown image syntax
  const images = [];
  let match;

  while ((match = imageRegex.exec(markdown)) !== null) {
    images.push(match[1]); // Extract image URL
  }

  //   raw.githubusercontent.com/{owner}/{repo}/{branch}/{path_to_image}

  https: return images;
}
