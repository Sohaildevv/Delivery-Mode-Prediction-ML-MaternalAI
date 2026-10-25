const API_BASE = "/api";

export async function predictDelivery(payload: Record<string, any>) {
    const response = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    return response.json();
}

export async function getMetrics() {
    const response = await fetch(`${API_BASE}/metrics`);
    return response.json();
}

export async function getFeatureImportance() {
    const response = await fetch(`${API_BASE}/feature-importance`);
    return response.json();
}

export async function getHistory() {
    const response = await fetch(`${API_BASE}/history`);
    return response.json();
}

export async function uploadCsv(file: File) {
    const data = new FormData();
    data.append("file", file);
    const response = await fetch(`${API_BASE}/upload-csv`, {
        method: "POST",
        body: data,
    });
    return response.json();
}
