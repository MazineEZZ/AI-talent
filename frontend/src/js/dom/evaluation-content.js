import { createDOMElement, createContentComp } from "./render-content";

export function renderEvaluationContent() {
    const tabName = "evaluation";

    const { contentWrapper, header, body, footer } = createContentComp(tabName, "Evaluate CVs");

    // Body
    const form = document.createElement("form");

    const uploadSection = createDOMElement({name: "upload-section"});

    const uploadResumesInput = createDOMElement({
        type: "input",
        kind: "file",
        name: "upload-resumes",
        id: "upload-resumes"
    });
    uploadResumesInput.multiple = true;
    uploadResumesInput.accept = ".pdf";
    
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

    uploadSection.appendChild(uploadResumesInput);

    form.appendChild(uploadSection);
    form.appendChild(configSection);

    body.appendChild(form);

    contentWrapper.appendChild(header);
    contentWrapper.appendChild(body);
    contentWrapper.appendChild(footer);

    return contentWrapper;
}