const BASE_URL = "http://127.0.0.1:8000";

async function evaluateCV(jobCriteria, file) {
    const formData = new FormData();
    formData.append("file", file);
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