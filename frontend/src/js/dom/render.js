function getContentWrapper() {
    const contentWrapper = document.createElement("div");
    contentWrapper.id = "main-content"
    contentWrapper.classList.add("main-container")

    return contentWrapper;
}

function renderEvaluationResult(result) {
    const contentWrapper = getContentWrapper();

    const resultTitle = document.createElement("h2");
    resultTitle.classList.add("evaluation-title");
    resultTitle.textContent = "Evaluation Result:";
        
    const resultText = document.createElement("p");
    resultText.classList.add("evaluation-text");    
    resultText.textContent = JSON.stringify(result);

    contentWrapper.appendChild(resultTitle);
    contentWrapper.appendChild(resultText);

    return contentWrapper;
}

function renderEvaluationSetup() {
    const contentWrapper = getContentWrapper()

    const uploadCv = document.createElement("div");
    uploadCv.classList.add("file-input");

    const uploadCvInput = document.createElement("input");
    uploadCvInput.type = "file";
    uploadCvInput.classList.add("upload-cv")
    uploadCvInput.id = "upload-cv";

    const uploadCvLabel = document.createElement("label");
    uploadCvLabel.for = uploadCvInput.id;
    uploadCvLabel.textContent = "Upload CV"

    uploadCv.appendChild(uploadCvInput);
    uploadCv.appendChild(uploadCvLabel);
    
    const jobCriteriaInput = document.createElement("input");
    jobCriteriaInput.id = "job-criteria";
    jobCriteriaInput.placeholder = "Enter the job criteria"

    const evaluateBtn = document.createElement("button");
    evaluateBtn.id = "evaluate-cv";
    evaluateBtn.classList.add("evaluate-cv-btn");
    evaluateBtn.textContent = "Evaluate CV"

    contentWrapper.appendChild(uploadCv);
    contentWrapper.appendChild(jobCriteriaInput);
    contentWrapper.appendChild(evaluateBtn);

    return contentWrapper;
}

function renderPageHeader() {
    const headerWrapper = document.createElement("header");
    headerWrapper.classList.add("header-container");

    return headerWrapper;
}

function loadPage(renderPageContent) {
    document.body.replaceChildren();

    const header = renderPageHeader();
    const content = renderPageContent();

    document.body.appendChild(header);
    document.body.appendChild(content);
}

export { renderEvaluationSetup, renderEvaluationResult, loadPage }