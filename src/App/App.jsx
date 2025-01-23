import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Profile } from "../components/Profile";
import { RepoCard } from "../components/RepoCard";
import { reposUrl, profileUrl } from "../constants";
import { Search } from "../components/Search";

function App() {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState();
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const fetchRepos = async () => {
    const response = await fetch(reposUrl);
    const data = await response.json();
    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setRepos(data);
  };

  useEffect(() => {
    fetch(profileUrl)
      .then((response) => response.ok && response.json())
      .then((json) => setProfile(json));

    fetchRepos();
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen gap-5 dark:bg-slate-800 dark:text-white">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow pt-20">
        <div className="flex flex-col items-center">
          {profile ? <Profile profile={profile} /> : <p>Loading...</p>}
          <Search repos={repos} setFilteredRepos={setFilteredRepos} />
        </div>
        <div className="flex-grow">
          {!repos.length ? <p>Loading...</p> : ""}
          {repos.length && filteredRepos.length === 0 ? (
            <p>No repositories found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 md:gap-10">
              {filteredRepos
                .slice(0, showAll ? repos.length : 6)
                .map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => setShowAll(!showAll)}
          className="p-2 px-5 transition-all duration-150 ease-in-out border-2 border-gray-800 rounded-full dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-800 hover:bg-gray-800 hover:text-white"
        >
          {showAll ? "Show less" : "Show more"}
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default App;
