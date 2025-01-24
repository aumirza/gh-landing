import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Profile } from "../components/Profile";
import { RepoCard } from "../components/RepoCard";
import { Search } from "../components/Search";
import ProfileStats from "../components/ProfileStats";
import { Pagination } from "../components/Pagination";
import Sort from "../components/Sort";
import { fetchAllRepos, fetchProfile } from "../utils/api";

function App() {
  const ITEMS_PER_PAGE = 6;
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState();
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [sortBy, setSortBy] = useState("updated");
  const [sortOrder, setSortOrder] = useState("desc");

  const initializeData = async () => {
    const profileData = await fetchProfile();
    setProfile(profileData);

    const reposData = await fetchAllRepos();
    setRepos(reposData);
    setFilteredRepos(reposData);
  };

  useEffect(() => {
    initializeData();
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen gap-5 dark:bg-slate-800 dark:text-white">
      <Header />
      <div className="container flex flex-col items-center justify-center flex-grow max-w-6xl gap-8 px-4 pt-20 mx-auto mt-5 md:mt-10">
        <div className="w-full max-w-3xl mx-auto">
          {profile ? <Profile profile={profile} /> : <p>Loading...</p>}
        </div>
        <div className="w-full max-w-4xl mx-auto">
          <ProfileStats profile={profile} repos={repos} />
        </div>
        <div className="flex flex-col items-center justify-center w-full max-w-4xl gap-4 mx-auto sm:flex-row">
          <div className="flex items-center justify-center w-full sm:flex-1">
            <Search
              repos={repos}
              setFilteredRepos={setFilteredRepos}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          </div>
          <Sort
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </div>
        {/* <div className="flex items-center justify-center w-full sm:flex-1">
          <p className="text-lg text-center">
            Showing {filteredRepos.length} repos
          </p>
        </div> */}
        <div className="w-full max-w-6xl mx-auto">
          {!repos.length ? (
            <p className="text-center">Loading...</p>
          ) : filteredRepos.length === 0 ? (
            <p className="text-lg text-center">No repositories found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 auto-rows-fr md:grid-cols-2 lg:grid-cols-3">
              {filteredRepos
                .slice(0, pageCount * ITEMS_PER_PAGE)
                .map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
          )}
        </div>
      </div>
      <Pagination
        itemsLength={filteredRepos.length}
        pageCount={pageCount}
        setPageCount={setPageCount}
        itemsPerPage={ITEMS_PER_PAGE}
      />
      <Footer />
    </div>
  );
}

export default App;
