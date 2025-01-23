import React, { useCallback, useEffect, useState } from "react";
import { getOpenGraphImage } from "../utils/OpenGraph";
import { fetchReadme } from "../utils/fetchReadme";
import { extractImages } from "../utils/markdown";

export default function RepoImage({ repo }) {
  const [image, setImage] = useState(null);

  const getImage = useCallback(async () => {
    const readme = fetchReadme(repo.html_url);
    if (readme) {
      const images = extractImages(readme);
      if (images.length > 0) {
        return setImage(images[0]);
      }
    }
    const image = await getOpenGraphImage(repo.html_url);
    setImage(image);
  }, [repo.html_url]);

  useEffect(() => {
    if (!repo.html_url || image) return;
    getImage();
  }, [repo.html_url, image, getImage]);

  return image ? (
    <img className="w-full rounded-lg h-36" src={image} alt="" />
  ) : null;
}
