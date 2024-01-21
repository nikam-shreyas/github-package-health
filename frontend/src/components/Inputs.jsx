import RollingLoader from "./RollingLoader";

export default function Inputs({
  username,
  setUsername,
  reponame,
  setReponame,
  branch,
  setBranch,
  fetchData,
  loading,
}) {
  return (
    <div className="container">
      <div className="input-container">
        <div class="circle-container">
          <div class="circle"></div>
          <div class="circle"></div>
          <div class="circle"></div>
        </div>
        <div className="header-container">
          <div className="sub-header">
            GitCheck was made with the idea that you should be able to check the
            health of your dependencies.
          </div>
          <div className="header">
            Git your Act together with{" "}
            <small>
              <i class="fa-brands fa-git-alt git-alt-icon"></i>
            </small>
            GitCheck!
          </div>
        </div>
        <div className="github-input-container">
          <label
            title="github-username"
            className="input-label"
            htmlFor="github-username"
          >
            <i class="fa-brands fa-github"></i>

            <input
              className="input"
              type="text"
              placeholder={username ? username : "IQTLabs"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          <label
            title="github-repo"
            className="input-label"
            htmlFor="github-repo"
          >
            <i class="fa-regular fa-bookmark"></i>
            <input
              className="input"
              type="text"
              placeholder={reponame ? reponame : "FakeFinder"}
              value={reponame}
              onChange={(e) => setReponame(e.target.value)}
              required
            />
          </label>

          <label
            title="github-branch"
            className="input-label"
            htmlFor="github-branch"
          >
            <i class="fa-solid fa-code-branch"></i>

            <input
              className="input"
              type="text"
              placeholder={branch ? branch : "main"}
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            />
          </label>
        </div>
        <button className="button check-button" onClick={fetchData}>
          Check Repository Health
        </button>
        {loading ? <RollingLoader /> : null}
      </div>
    </div>
  );
}
