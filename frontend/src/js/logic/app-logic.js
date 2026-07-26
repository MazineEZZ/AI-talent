import { setupEventListener } from "../events/event-listener.js"
import { loadPage, renderEvaluationResult, renderEvaluationSetup } from "../dom/render";

function initApp() {
    loadPage(renderEvaluationSetup);

    setupEventListener();
}

export { initApp };