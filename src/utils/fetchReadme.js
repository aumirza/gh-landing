export async function fetchReadme(repoUrl) {
  const [owner, repo] = repoUrl.split("/").slice(-2);
  const url = `https://api.github.com/repos/${owner}/${repo}/readme`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3.raw", // Fetch raw README content
      },
    });

    if (!response.ok)
      throw new Error(`Error fetching README: ${response.statusText}`);
    const markdown = await response.text();
    return markdown;
  } catch (error) {
    console.error(error);
    return null;
  }
}
