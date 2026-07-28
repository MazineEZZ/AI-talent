import { setupEventListener } from "../events/event-listener.js"
import { loadPage, renderEvaluationContent, renderSidebar, renderAppWrapper } from "../dom/render-hub.js";
import { appState } from "../global/state.js";

function initApp() {
    appState.currPage = renderEvaluationContent;

    renderAppWrapper(appState.currPage);

    setupEventListener();
}

export { initApp };