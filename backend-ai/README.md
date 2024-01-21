# Backend Server for PALM Answer Requests

## Overview

This backend server serves as a bridge between your frontend application and Google's PALM model for generating text responses to prompts. It's built with Python using the following libraries:

- `google.generativeai` for interacting with PALM
- `langchain` for language model chaining
- `fastapi` for building the server
- `uvicorn` for running the server

## Setup

1. **Install Requirements:**

   - Run `pip install -r requirements.txt` to install the necessary libraries.
   - Optionally, create a virtual environment for isolated dependencies.

2. **Obtain Google API Key:**

   - Acquire a valid API key for accessing PALM: [Makersuite](https://makersuite.google.com/app/apikey)

3. **Set API Key:**
   - Replace `<Google_API_KEY>` in `main.py` with your obtained API key.

## Running the Server

1. **Start Server:**

   - Run `uvicorn main:app --reload --port 8001` in your terminal.
   - The `--reload` flag enables automatic restarts for code changes.

2. **Important Note:**
   - The frontend application needs to communicate with the server on port 8001. If you change the port, update the frontend configuration accordingly.

## Usage

- The server exposes an endpoint for receiving prompts and returning PALM-generated responses.
- Refer to the API documentation within the `main.py` file for specific usage details and examples.

## Additional Notes

- This server is designed for research and development purposes. Consider security implications for production deployments.
- Refer to the documentation of individual libraries for more advanced usage and configuration options.
- I have not performed testing or error handling for the responses of PALM. You are welcome to contribute to the repository.
