import { evaluateCV } from "../api/evaluation-service";
import { renderEvaluationContent, refreshPage } from "../dom/render-hub.js";
import { appState } from "../global/state.js";

async function fetchEvaluationResult() {
    appState.files = document.querySelector("#upload-resumes").files;
    appState.jobCriteria = document.querySelector("#job-criteria").value;
    
    try {
        const result = await evaluateCV(appState.files, appState.jobCriteria);
        
        appState.results = result;
        console.log("Evaluation complete");
    } catch(err) {
        alert("Error: " + err.message);
    }
}

function setupEventListener() {
    const appWrapper = appState.getAppWrapper();
    
    appWrapper.addEventListener("click", (e) => {
        if (e.target.id === "evaluate-btn") {
            fetchEvaluationResult();
        }

        if (e.target.classList.contains("tab")) {
            appState.currTabId = e.target.id;
            refreshPage();
        }
    })
}

export { setupEventListener };