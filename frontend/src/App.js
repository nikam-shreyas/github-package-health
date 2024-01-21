import "./App.css";
import Visualization from "./components/Visualization.jsx";
import Inputs from "./components/Inputs.jsx";
import Ai from "./components/Chat.jsx";
import { useState } from "react";
import data from "./data/index.jsx";
import Insights from "./components/Insights.jsx";
import insights from "../src/data/insights.jsx";
import TopNav from "./components/TopNav.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const [username, setUsername] = useState("");
  const [reponame, setReponame] = useState("");
  const [branch, setBranch] = useState("");
  const [healthData, setHealthData] = useState(data);
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState(insights);
  const [insightsLoading, setInsightsLoading] = useState(false);

  async function getInsights() {
    setInsightsLoading(true);
    let data = healthData;
    data.sort((a, b) => (a.packageHealthScore > b.packageHealthScore ? 1 : -1));
    let lowest_packages = data.slice(0, 3);

    lowest_packages = lowest_packages.map((item) => item.title);
    fetch("http://127.0.0.1:8001/generate_insights/?data=" + lowest_packages)
      .then((response) => response.json())
      .then((data) => {
        setAiInsights(data);
        setInsightsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setInsightsLoading(false);
      });
  }

  async function fetchData() {
    setLoading(true);
    fetch(
      "http://127.0.0.1:8000/github/?username=" +
        username +
        "&repo=" +
        reponame +
        "&branch=" +
        branch
    )
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setHealthData(data);
        document.getElementById("visualization").scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div className="App">
      <TopNav />

      <Inputs
        username={username}
        setUsername={setUsername}
        reponame={reponame}
        setReponame={setReponame}
        branch={branch}
        setBranch={setBranch}
        fetchData={fetchData}
        loading={loading}
      />
      <Visualization data={healthData} />
      <div className="circle-container">
        <div
          className="circle"
          style={{
            left: "60rem",
            top: "-1rem",
          }}
        ></div>
      </div>

      <div className="insights-chat-container">
        <div className="row-container">
          <div className="ai-header">
            Harnessing the power of{"  "}
            <span className="purple-ai-header">
              {" "}
              AI{" "}
              <small>
                <i class="fa-solid fa-code-fork"></i>
              </small>
            </span>
          </div>
          <div className="column-container">
            <Insights
              aiInsights={aiInsights}
              getInsights={getInsights}
              insightLoader={insightsLoading}
            />
            <Ai />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
