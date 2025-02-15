import { ogImageRegex } from "../constants";

export async function getOpenGraphImage(url) {
  const corsUrl = `https://api.codetabs.com/v1/proxy?quest=${url}`;
  try {
    const response = await fetch(corsUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();
    const match = html.match(ogImageRegex);
    if (match && match[1]) {
      const image = match[1];
      return image;
    } else {
      throw new Error("Open Graph image not found");
    }
  } catch (error) {
    console.error(`Error fetching Open Graph image: ${error.message}`);
    throw error;
  }
}
