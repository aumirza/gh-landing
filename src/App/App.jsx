import { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Profile } from "../components/Profile";
import { RepoCard } from "../components/RepoCard";
import { reposUrl, profileUrl } from "../constants";
import { Search } from "../components/Search";

export function App() {
  const [repos, setRepos] = useState([]);
  const [profile, setProfile] = useState();
  const [filteredRepos, setFilteredRepos] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetch(profileUrl)
      .then((response) => response.ok && response.json())
      .then((json) => setProfile(json));
    fetch(reposUrl)
      .then((response) => response.ok && response.json())
      .then((json) => setRepos(json));
  }, []);

  return (
    <div className="relative  dark:bg-slate-800 dark:text-white">
      <Header />
      <div className="pt-28 flex-col flex items-center">
        {profile ? <Profile profile={profile} /> : <p>Loading...</p>}
        <Search repos={repos} setFilteredRepos={setFilteredRepos} />
        {repos.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {filteredRepos.slice(0, showAll ? repos.length : 6).map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-center mt-5">
        <button
          onClick={() => setShowAll(!showAll)}
          className="border-2 border-gray-800 p-2 px-4 rounded-md"
        >
          {showAll ? "Show less" : "Show more"}
        </button>
      </div>
      <Footer />
    </div>
  );
}
