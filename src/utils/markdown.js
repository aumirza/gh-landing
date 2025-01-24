export function extractImages(markdown) {
  // images can be in html or mardown format
  const imageRegex = /!\[.*?\]\((.*?)\)/g; // Match Markdown image syntax
  const htmlImageRegex = /<img.*?src="(.*?)".*?>/g; // Math Html img

  const images = [];
  let match;

  while ((match = imageRegex.exec(markdown)) !== null) {
    let imageUrl = match[1];
    images.push(imageUrl); // Extract image URL
  }

  while ((match = htmlImageRegex.exec(markdown)) !== null) {
    let imageUrl = match[1];
    images.push(imageUrl); // Extract image URL
  }

  return images;
}
