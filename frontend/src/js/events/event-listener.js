import { renderEvaluationResult, loadPage } from "../dom/render";


async function evaluateResults() {
    const file_name = document.querySelector("#upload-cv").dataset.path;
    const job_criteria = document.querySelector("#job-criteria").value;

    const url = "http://127.0.0.1:8000/evaluate/"

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ job_criteria, file_name })
    }
    
    let evaluationResult;
    try {
        const response = await fetch(url, options)
        
        evaluationResult = await response.json();
    } catch(error) {
        console.error(error.message);
        return;
    }
    
    const renderPage = () => renderEvaluationResult(evaluationResult);
    loadPage(renderPage);
}

function setupEventListener() {
    const content = document.querySelector("#main-content");
    
    content.addEventListener("click", (e) => {
        if (e.target.id === "evaluate-cv") {
            evaluateResults()
        }
    })
}

export { setupEventListener }