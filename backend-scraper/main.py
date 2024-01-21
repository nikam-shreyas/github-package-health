import requests
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from DataScraper import DataScraper

app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

def fetch_requirements(username, repo, branch="main"):
    
    url = f"https://api.github.com/repos/{username}/{repo}/git/trees/{branch}?recursive=1"
    
    # Get the list of files in the repo
    response = requests.get(url)

    # Get the list of requirements files
    requirements_files = []
    # Loop through the files and find the requirements files
    for file in response.json()["tree"]:
        if file["path"].endswith("requirements.txt"):
            requirements_files.append(file["path"])

    requirements = parse_requirements(requirements_files, username, repo, branch)
    return requirements


def parse_requirements(requirements_files, username, repo, branch="main"):
    requirements = {}
    for file in requirements_files:
        requirements_file = requests.get(f"https://raw.githubusercontent.com/{username}/{repo}/{branch}/{file}").text
        for requirement in requirements_file.split("\n"):
            if requirement!="":
                if requirement.find("=") != -1:
                    requirements[requirement[:requirement.find("=")]] = requirement[requirement.find("=")+2:]
                elif requirement.find(">") != -1:
                    requirements[requirement[:requirement.find(">")]] = requirement[requirement.find(">")+2:]
                elif requirement.find("<") != -1:
                    requirements[requirement[:requirement.find("<")]] = requirement[requirement.find("<")+2:]
                elif requirement.find("~") != -1:
                    requirements[requirement[:requirement.find("~")]] = requirement[requirement.find("~")+2:]
                else:
                    requirements[requirement.split()[0]] = ""

    return requirements


def parse_response(response):
    report_id = response.json()['reportId']
    python_scraper = DataScraper(report_id)
    data = python_scraper.build_data()
    return data


@app.get("/github/")
def get_github(username: str = "FakeFinder", repo: str="IQTLabs", branch: str="main"):
    requirements = fetch_requirements(username, repo, branch)
    if "err" in requirements:
        return requirements
    url = "<SNYK_API>"
    # create a request for the url and pass the requirements as a json object 
    # with the key as "dependencies"
    response = requests.post(url, json={"dependencies": requirements})
    return parse_response(response)



