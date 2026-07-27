import { evaluateCV, uploadCV } from "../api/evaluation-service";
import { renderEvaluationResult, loadPage } from "../dom/render";

async function evaluateResults() {
    const file = document.querySelector("#upload-cv").files[0];
    const jobCriteria = document.querySelector("#job-criteria").value;

    if (!file) {
        console.error("No file selected");
        return;
    }

    let result;
    try {
        result = await evaluateCV(jobCriteria, file);
    } catch (error) {
        console.error(error.message);
        return;
    }

    loadPage(() => renderEvaluationResult(result));
}

function setupEventListener() {
    const content = document.querySelector("#main-content");
    
    content.addEventListener("click", (e) => {
        if (e.target.id === "evaluate-cv") {
            evaluateResults();
        }
    })
}

export { setupEventListener }