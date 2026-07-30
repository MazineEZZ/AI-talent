import { appState } from "../global/state";
import { renderSidebar, createDOMElement } from "./render-content";
import { renderCandidatesContent } from "./candidates-content";
import { renderEvaluationContent } from "./evaluation-content";
import { renderSettingsContent } from "./settings-content";
import { renderContentModal } from "./render-modals";

function renderAppWrapper() {
    const appWrapper = createDOMElement({
        name: "app-wrapper",
        id: "app-wrapper"
    });

    document.body.appendChild(appWrapper);
}

function renderModalWrapper() {
    const modalWrapper = createDOMElement({
        name: "modal-wrapper",
        id: "modal-wrapper"
    })

    document.body.appendChild(modalWrapper);
}

function getContentRenderer() {
    const tabId = appState.currTabId;
    if (tabId.includes("evaluation")) {
        return renderEvaluationContent();
    } else if (tabId.includes("candidates")) {
        return renderCandidatesContent();
    } else if (tabId.includes("settings")) {
        return renderSettingsContent();
    }
}

function toggleSelectedTab(sidebar, selectedTabId) {
    sidebar.querySelectorAll(".tab").forEach((tab) => {
        tab.classList.toggle(".selected", tab.id === selectedTabId);
    })
}

function refreshPage() {
    const appWrapper = appState.getAppWrapper();
    appWrapper.replaceChildren();

    const sidebar = renderSidebar();
    const content = getContentRenderer();
    
    toggleSelectedTab(sidebar, appState.currTabId);

    appWrapper.appendChild(sidebar);
    appWrapper.appendChild(content);
}

export { renderSidebar, renderEvaluationContent, refreshPage, renderAppWrapper, renderModalWrapper, renderContentModal }