export const sortRepos = (repos, sortBy, sortOrder) => {
  return [...repos].sort((a, b) => {
    const dateA = new Date(a[sortBy + "_at"]);
    const dateB = new Date(b[sortBy + "_at"]);
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });
};
