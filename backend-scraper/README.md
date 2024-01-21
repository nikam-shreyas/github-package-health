# Backend Server for Analyzing Package Health from GitHub Repositories

## Overview

This backend server assesses the health of Python packages within a GitHub repository using Snyk's API. It fetches the `requirements.txt` file from a specified branch of a particular repository, analyzes dependencies, and reports their health status.

## Setup

1. **Install Requirements:**

   - Run `pip install -r requirements.txt` to install dependencies.
   - (Optional) Consider creating a virtual environment for isolation.

2. **Set API Keys:**
   - Replace `<SNYK_API>` and `<SNYK_REPORT_API>` placeholders in `main.py` with the endpoints.

## Running the Server

1. **Start Server:**

   - Run `uvicorn main:app --port 8000 --reload` to launch the server.
   - `--reload` enables automatic restarts for code changes.

2. **Important Note:**
   - The frontend application must communicate with the server on port 8000. Update the frontend configuration if you change the port.

## Usage

- The server exposes endpoints for:
  - Fetching requirements from a GitHub repository
  - Retrieving health data for analyzed packages
- Refer to API documentation within `main.py` for specific usage and examples.

## Contributing

- The current requirements parser for `sample_requirements.txt` needs improvement.
- I also need to write tests for checking if the Github repository has requirements.txt
- The code can also be extended for dependencies other that Python such as Node/GO/etc.
- Contributions to enhance this functionality are welcome!

## Additional Notes

- This server is intended for research and development purposes. Consider security implications for production deployments.
- Refer to the documentation of individual libraries for more advanced usage and configuration options.
