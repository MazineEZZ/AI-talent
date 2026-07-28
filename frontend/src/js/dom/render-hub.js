import { renderSidebar, renderEvaluationContent, createDOMElement } from "./render-content";

function loadPage(renderContent) {
    document.body.replaceChildren();

    const content = renderContent();

    document.body.appendChild(content);
}

function renderAppWrapper(currPage) {
    const appContainer = createDOMElement({
        name: "app-wrapper",
        id: "app-wrapper"
    }
    );

    const sidebar = renderSidebar();
    const content = currPage();

    appContainer.appendChild(sidebar);
    appContainer.appendChild(content);

    document.body.appendChild(appContainer);
}


export { renderSidebar, renderEvaluationContent, loadPage, renderAppWrapper }