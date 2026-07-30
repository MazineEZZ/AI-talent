import { appState } from "../global/state";
import { createDOMElement, createContentComp } from "./render-content";

function renderUploadedFiles() {
    const uploadedFiles = appState.uploadedFiles;
    
    const cardContainer = createDOMElement({
        name: "file-card-container",
    })
    
    if (!uploadedFiles) {
        return cardContainer;
    }
    

    Array.from(uploadedFiles).forEach((file) => {
        const fileCard = createDOMElement({
            name: "file-card",
        })
    
        const filePreview = createDOMElement({
            name: "file-preview",
        })
    
        const fileName = createDOMElement({
            type: "p",
            name: "file-name",
            text: file.name
        })
    
        fileCard.appendChild(filePreview);
        fileCard.appendChild(fileName);        
        
        cardContainer.appendChild(fileCard);
    })

    return cardContainer;
}

function renderUploadSection() {
    const uploadSection = createDOMElement({name: "upload-section"});

    // Uploaded Files
    const cardContainer = renderUploadedFiles().childNodes;
    
    // Upload Files
    const uploadResumesId = "upload-resumes";
    const uploadResumesContainer = createDOMElement({
        type: "p"
    })

    const uploadResumesLabel = createDOMElement({
        type: "label",
        name: uploadResumesId + "-label",
        text: "+"
    })
    uploadResumesLabel.htmlFor = uploadResumesId;

    const uploadResumesInput = createDOMElement({
        type: "input",
        kind: "file",
        name: uploadResumesId + "-input",
        id: uploadResumesId
    });
    uploadResumesInput.multiple = true;
    uploadResumesInput.accept = ".pdf";

    uploadResumesContainer.appendChild(uploadResumesLabel);
    uploadResumesContainer.appendChild(uploadResumesInput);

    if (cardContainer) {
        Array.from(cardContainer).forEach((card) => {
            uploadSection.appendChild(card);
        })
    }
    uploadSection.appendChild(uploadResumesContainer);

    return uploadSection;
}

export function renderEvaluationContent() {
    const tabName = "evaluation";

    const { contentWrapper, header, body, footer } = createContentComp(tabName, "Evaluate CVs");

    // Body
    const form = document.createElement("form");

    /// Upload Section
    const uploadSection = renderUploadSection();

    /// Config Section
    const configSection = createDOMElement({name:"config-section"});

    const jobCriteriaId = "job-criteria";
    const jobCriteriaContainer = createDOMElement({
        type: "p"
    })
    
    const jobCriteriaLabel = createDOMElement({
        type: "label",
        name: jobCriteriaId + "-label",
        text: "Job Criteria:"
    })
    jobCriteriaLabel.htmlFor = jobCriteriaId;

    const jobCriteriaInput = createDOMElement({
        type: "input",
        kind: "text",
        name: jobCriteriaId + "-input",
        id: jobCriteriaId
    })
    jobCriteriaInput.placeholder = "Enter job criteria (i.e, experience, languages, etc...)";

    jobCriteriaContainer.appendChild(jobCriteriaLabel);
    jobCriteriaContainer.appendChild(jobCriteriaInput);

    const paramsContainer = createDOMElement({
        name:"param",
        classArr: ["container"],
    })

    const evaluateBtn = createDOMElement({
        type: "button",
        kind: "button",
        name: "evaluate-btn",
        id: "evaluate-btn",
        text: "Evaluate"
    });
    
    configSection.appendChild(jobCriteriaContainer);
    configSection.appendChild(paramsContainer);
    configSection.appendChild(evaluateBtn);

    form.appendChild(uploadSection);
    form.appendChild(configSection);

    body.appendChild(form);

    contentWrapper.appendChild(header);
    contentWrapper.appendChild(body);
    contentWrapper.appendChild(footer);

    return contentWrapper;
}