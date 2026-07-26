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
    resultText.textContent = result;

    contentWrapper.appendChild(resultTitle);
    contentWrapper.appendChild(resultText);

    return contentWrapper;
}

function renderEvaluationSetup() {
    const contentWrapper = getContentWrapper()

    const uploadCvBtn = document.createElement("button");
    uploadCvBtn.classList.add("upload-cv-btn")
    uploadCvBtn.id = "upload-cv";
    uploadCvBtn.textContent = "Upload CV"
    
    const jobCriteriaInput = document.createElement("input");
    jobCriteriaInput.id = "job-criteria";
    jobCriteriaInput.placeholder = "Enter the job criteria"

    const evaluateBtn = document.createElement("button");
    evaluateBtn.id = "evaluate-cv";
    evaluateBtn.classList.add("evaluate-cv-btn");
    evaluateBtn.textContent = "Evaluate CV"

    contentWrapper.appendChild(uploadCvBtn);
    contentWrapper.appendChild(jobCriteriaInput);
    contentWrapper.appendChild(evaluateBtn);

    return contentWrapper;
}

function changePage(renderPageContent) {
    const header = renderPageHeader();
    const content = renderPageContent();

    document.body.appendChild(header);
    document.body.appendChild(content);
}

export { renderEvaluationSetup, renderEvaluationResult, changePage }