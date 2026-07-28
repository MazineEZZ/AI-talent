import { evaluateCV, uploadCV } from "../api/evaluation-service";
import { renderEvaluationContent, loadPage } from "../dom/render-hub.js";

function setupEventListener() {
    const content = document.querySelector("#content");
    
    content.addEventListener("click", (e) => {
        if (e.target.id === "evaluate-cv") {
            evaluateResults();
        }
    })
}

export { setupEventListener }