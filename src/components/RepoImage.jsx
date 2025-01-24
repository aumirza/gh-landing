import React, { useCallback, useEffect, useState } from "react";
import { fetchRepoImage } from "../utils/fetchRepoImage";

export default function RepoImage({ repo }) {
  const [image, setImage] = useState(null);

  const getImage = useCallback(async () => {
    const image = await fetchRepoImage(repo);
    setImage(image);
  }, [repo.html_url]);

  useEffect(() => {
    if (!repo.html_url || image) return;
    getImage();
  }, [repo.html_url, image, getImage]);

  return image ? (
    <img
      className="object-contain w-full h-full rounded-lg bg-slate-50"
      src={image}
      alt=""
    />
  ) : null;
}
