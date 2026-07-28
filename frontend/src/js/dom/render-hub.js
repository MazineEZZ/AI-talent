import { appState } from "../global/state";
import { renderSidebar, createDOMElement } from "./render-content";
import { renderCandidatesContent } from "./candidates-content";
import { renderEvaluationContent } from "./evaluation-content";
import { renderSettingsContent } from "./settings-content";

function renderAppWrapper() {
    const appContainer = createDOMElement({
        name: "app-wrapper",
        id: "app-wrapper"
    });

    document.body.appendChild(appContainer);
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

export { renderSidebar, renderEvaluationContent, refreshPage, renderAppWrapper }