import { appState } from "../global/state";
import { createDOMElement } from "./render-content";

function renderContentModal({name, id, title, text}) {
    const modal = appState.getModalWrapper();

    const dialog = createDOMElement({
        type: "dialog",
        name: `${name}-dialog`,
        id: `${id}-dialog`
    })

    const modalTitle = createDOMElement({
        type: "h2",
        name: `${name}-title`,
        classArr: ["title"],
        text: title
    })

    const modalText = createDOMElement({
        type: "p",
        name: `${name}-text`,
        classArr: ["text"],
        text: text
    })

    dialog.appendChild(modalTitle);
    dialog.appendChild(modalText);

    appState.currModal = dialog;

    modal.appendChild(dialog);
}

export { renderContentModal };