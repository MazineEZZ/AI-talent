import { evaluateResumes, getCandidates } from "../api/evaluation-service";
import { renderEvaluationContent, refreshPage, renderContentModal } from "../dom/render-hub.js";
import { renderPDFViewerModal } from "../dom/render-modals.js";
import { appState } from "../global/state.js";

async function fetchEvaluationResult() {
    appState.jobCriteria = document.querySelector("#job-criteria").value;
    appState.allowModalClose = false;
    
    try {
        const response = await evaluateResumes(appState.uploadedFiles, appState.jobCriteria);
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
                title: "Evaluation Breakdown",
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
    appState.currModal.remove();
}

function openModal(modal) {
    modal.showModal();

    window.removeEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
}

function removeUploadedFile(target) {
    const fileId = target.dataset.id.split("-")[1];
    appState.uploadedFiles.splice(fileId, 1);
    refreshPage();
}

function toggleElements(btn, ...elements) {
    if (btn.classList.contains("closed")) {
        btn.classList.remove("closed");
        elements.forEach((elmnt) => elmnt.classList.remove("closed"));
    } else {
        btn.classList.add("closed");
        elements.forEach((elmnt) => elmnt.classList.add("closed"));
    }
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

        if (e.target.classList.contains("remove-file-btn")) {
            removeUploadedFile(e.target);
        }

        if (e.target.classList.contains("file-preview")) {
            const fileId = e.target.dataset.id.split("-")[1];
            renderPDFViewerModal(appState.uploadedFiles[fileId]);
        }

        if (e.target.id === "toggle-sidebar") {
            const sidebar = document.getElementById("sidebar");
            const content = document.getElementById("content");

            toggleElements(e.target, sidebar, content);
        }
    })

    appWrapper.addEventListener("change", (e) => {
        if (e.target.id === "upload-resumes") {
            appState.uploadedFiles.push(...e.target.files);

            if (appState.uploadedFiles.length > 0) {
                refreshPage();
            }

        }
    })

    modalWrapper.addEventListener("click", (e) => {

    })
}

export { setupEventListener };