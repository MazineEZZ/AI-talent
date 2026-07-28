import { capitalize } from "../utils/utilities";

function createDOMElement({type="div", kind="", name = "", text = "", classArr = [], id = ""}) {
    const element = document.createElement(type);
    classArr.forEach((className) => {
        element.classList.add(className);
    })
    
    if (kind) {
        element.type = kind;
    }

    if (name) {
        element.classList.add(name);
    }
    
    if (id) {
        element.id = id;
    }

    if (text) {
        element.textContent = text;
    }

    return element
}

function renderSidebar() {
    const sidebarWrapper = createDOMElement({
        name: "sidebar-wrapper",
        id: "sidebar"
    });

    // Header
    const header = createDOMElement({name:"header"});

    const profile = createDOMElement({name:"profile"});
    // TODO add a profile here later

    header.appendChild(profile);

    // Body
    const body = createDOMElement({name:"body"});

    const evaluationTab = createDOMElement({
        name:"evaluation",
        classArr: ["tab"],
        text: "Evaluation"
    })

    const candidatesTab = createDOMElement({
        name:"candidates",
        classArr: ["tab"],
        text: "Candidates"
    })
    
    body.appendChild(evaluationTab);
    body.appendChild(candidatesTab);

    // Footer
    const footer = createDOMElement({name:"footer"});

    const settingsTab = createDOMElement({
        name:"settings",
        classArr: ["tab"],
        text: "Settings"
    })

    footer.appendChild(settingsTab);

    sidebarWrapper.appendChild(header);
    sidebarWrapper.appendChild(body);
    sidebarWrapper.appendChild(footer);

    return sidebarWrapper;
}

function renderEvaluationContent() {
    const contentWrapper = createDOMElement({
        name:"content-wrapper", 
        id:"content"
    });

    const tabName = "evaluation";
    
    // Header
    const header = createDOMElement({name:"header"});

    const title = createDOMElement({
        name: `${tabName}-title`,
        text: "Evaluate CVs",
        classArr: ["title"]
    });

    header.appendChild(title);

    // Body
    const body = createDOMElement({name: "body"});

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

    // Footer
    const footer = createDOMElement({name:"footer"});

    const credits = createDOMElement({
        name:"credits",
        text: "credits"
    });

    footer.appendChild(credits);

    contentWrapper.appendChild(header);
    contentWrapper.appendChild(body);
    contentWrapper.appendChild(footer);

    return contentWrapper;
}

export { renderSidebar, renderEvaluationContent, createDOMElement };