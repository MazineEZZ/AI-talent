import { appState } from "../global/state";
import { createDOMElement } from "./render-content";

function renderModalCore(name, id, title) {
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

    return {modal, dialog, modalTitle};
}

function renderContentModal({name, id, title, text}) {
    const {modal, dialog, modalTitle} = renderModalCore(name, id, title);

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

    dialog.showModal();
}

function renderPDFViewerModal(file) {
    const {modal, dialog, modalTitle} = renderModalCore("pdf-preview", "pdf-preview", "PDF Preview:");

    const fileURL = URL.createObjectURL(file);

    const header = createDOMElement({
        name: "header"
    });

    const closeBtn = createDOMElement({
        type: "button",
        classArr: ["close-modal-btn"],
        text: "Close Preview"
    });
    
    closeBtn.addEventListener("click", () => {
        dialog.close();
        URL.revokeObjectURL(fileURL); 
        dialog.remove();
    });

    const iframe = createDOMElement({
        type: "iframe",
        name: "pdf-preview-frame",
        id: "pdf-preview-frame"
    });
    iframe.src = fileURL;

    header.appendChild(modalTitle);
    header.appendChild(closeBtn);

    dialog.appendChild(header);
    dialog.appendChild(iframe);

    appState.currModal = dialog;

    modal.appendChild(dialog);

    dialog.showModal();
}

export { renderContentModal, renderPDFViewerModal };