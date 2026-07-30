import { evaluateResumes, getCandidates } from "../api/evaluation-service";
import { renderEvaluationContent, refreshPage, renderContentModal } from "../dom/render-hub.js";
import { appState } from "../global/state.js";

async function fetchEvaluationResult() {
    appState.files = document.querySelector("#upload-resumes").files;
    appState.jobCriteria = document.querySelector("#job-criteria").value;
    appState.allowModalClose = false;
    
    try {
        const response = await evaluateResumes(appState.files, appState.jobCriteria);
        changeModalContent(response.message);
        
        const results = await getCandidates();
        
        appState.results = results;
    } catch(err) {
        changeModalContent("Error: " + err.message);
    } finally {
        appState.allowModalClose = true;
    }
}

function getEvaluationResult() {
    renderContentModal({
                id: "evaluation",
                name: "evaluation",
                title: "Info",
                text: "Evaluation under process..."
            });
    openModal(appState.currModal);

    fetchEvaluationResult();
}

function changeModalContent(text) {
    const modal = appState.currModal;

    modal.querySelector(".text").textContent = text;
}

function handleKeyDown(event) {
    if (event.key === "Escape" && !appState.allowModalClose) {
        event.preventDefault();
        return;
    }
    appState.getModalWrapper().replaceChildren();
}

function openModal(modal) {
    modal.showModal();

    window.removeEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
}

function setupEventListener() {
    const appWrapper = appState.getAppWrapper();
    const modalWrapper = appState.getModalWrapper();
    
    appWrapper.addEventListener("click", (e) => {
        if (e.target.id === "evaluate-btn") {
            getEvaluationResult();
        }

        if (e.target.classList.contains("tab")) {
            appState.currTabId = e.target.id;
            refreshPage();
        }
    })

    modalWrapper.addEventListener("click", (e) => {

    })
}

export { setupEventListener };