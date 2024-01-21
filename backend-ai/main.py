import google.generativeai as palm
from langchain.prompts import PromptTemplate
from fastapi import FastAPI
import json
from fastapi.middleware.cors import CORSMiddleware

google_api_key="<GOOGLE_API_KEY_HERE>"
palm.configure(api_key=google_api_key)

origins = [
    "*"
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_credentials=True,
    allow_headers=["*"],
)


def generate_answer(question):
    """
    Generate answer for a given question
    """
    prompt = PromptTemplate(
        template="""You are acting as an expert on Python packages. 
        You are asked the following question. 
        Return the answer in a plain string format and not in markdown format.
        Question: {question}""", input_variables=["question"]
    )
    completion = palm.generate_text(
        model='models/text-bison-001',
        prompt=prompt.format(question=question),
        temperature=0.1
    )
    result = completion.result
    return result


def generate_follow_ups(question):
    """
    Generate follow up questions for a given question
    """
    prompt = PromptTemplate(
        template="""You are acting as an expert on Python packages. 
        You are asked the following question. 
        Suggest 3 follow up questions that the user may ask.
        Return strictly in the following format:
        {{
            "follow_up": ["follow_up_1", "follow_up_2", "follow_up_3"]
        }}
        Question: {question}
        """, input_variables=["question"]
    )
    completion = palm.generate_text(
        model='models/text-bison-001',
        prompt=prompt.format(question=question),
        temperature=0.1
    )
    result = completion.result
    result = result[result.find("{"):result.rfind("}")+1]
    return json.loads(result)



@app.get("/answer/")
def get_answer(question: str = "What are some benefits of using good Python packages."):
    """
    Get answer for a given question
    """
    answer = generate_answer(question)
    follow_ups = generate_follow_ups(question)
    return {"answer": answer, "follow_up": follow_ups['follow_up']}
    


@app.get("/generate_insights/")
def generate_insights(data):
    """
    Generate insights for a given data
    """
    prompt = PromptTemplate(
        template="""You are acting as an expert on Python packages. You are given 3 packages having low snyk score. Suggest 3 insights to increase repo health and replacements for these packages.
        Packages: {data}
        Return strictly only the following without any json prefix:
        {{
            "insights": ["insight_1", "insight_2", "insight_3"],
            "replacements": {{package_1: "replacement_1", package_2: "replacement_2", package_3: "replacement_3"}},
            "general_suggestions":["general_suggestion_1", "general_suggestion_2", "general_suggestion_3"],
            "other_suggestions":["other_suggestion_1", "other_suggestion_2", "other_suggestion_3"],
        }}
        """, input_variables=["data"]
    )
    completion = palm.generate_text(
        model='models/text-bison-001',
        prompt=prompt.format(data=data),
        temperature=0.1
    )
    result = completion.result
    
    result = result[result.find("{"):result.rfind("}")+1]
    
    return json.loads(result)

