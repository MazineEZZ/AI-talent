import { setupEventListener } from "../events/event-listener.js"
import { loadPage, renderEvaluationContent, renderSidebar, renderAppWrapper, refreshPage } from "../dom/render-hub.js";
import { appState } from "../global/state.js";

function initApp() {
    const defaultTab = "evaluation";
    appState.currTabId = `${defaultTab}-id`;

    renderAppWrapper();
    appState.getAppWrapper = () => document.querySelector(".app-wrapper");

    refreshPage();

    setupEventListener();
}

export { initApp };