const BASE_URL = "http://127.0.0.1:8000";

async function evaluateCV(files, jobCriteria) {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
        formData.append("files", file);
    })
    formData.append("job_criteria", jobCriteria);

    const options = {
        method: "POST",
        body: formData
    }
    
    const response = await fetch(`${BASE_URL}/evaluate`, options);
        
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Evaluation failed");
    }
    return response.json();
}

export { evaluateCV }