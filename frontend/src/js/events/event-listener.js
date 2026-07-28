import { evaluateCV } from "../api/evaluation-service";
import { renderEvaluationContent, loadPage } from "../dom/render-hub.js";
import { appState } from "../global/state.js";

async function fetchEvaluationResult() {
    appState.files = document.querySelector("#upload-resumes").files;
    appState.jobCriteria = document.querySelector("#job-criteria").value;

    try {
        const result = await evaluateCV(appState.files, appState.jobCriteria);

        alert(JSON.stringify(result));
    } catch(err) {
        alert("Error: " + err.message);
    }
}

function setupEventListener() {
    const content = document.querySelector("#content");
    
    content.addEventListener("click", (e) => {
        if (e.target.id === "evaluate-btn") {
            fetchEvaluationResult();
        }
    })
}

export { setupEventListener }