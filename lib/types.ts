export type PredictionInput = {
    age: number;
    blood_pressure: number;
    blood_sugar: number;
    heart_rate: number;
    hemoglobin: number;
    bmi: number;
    previous_c_section: number;
    number_of_pregnancies: number;
    parity: number;
    anc_visits: number;
    fetal_heart_rate: number;
    baby_position: number;
    gestational_age: number;
    preeclampsia: number;
};

export type PredictionResponse = {
    success: boolean;
    data: {
        prediction: string;
        probability: number;
        risk: string;
        label: number;
        input_data: PredictionInput;
    };
};

export type MetricItem = {
    model: string;
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
};

export type MetricsResponse = {
    success: boolean;
    best_model: string;
    metrics: MetricItem[];
    confusion_matrix: number[][];
    report: Record<string, any>;
};

export type HistoryItem = {
    timestamp: string;
    input_data: PredictionInput;
    prediction: string;
    probability: number;
    risk: string;
};

export type HistoryResponse = {
    success: boolean;
    history: HistoryItem[];
};

export type FeatureImportanceResponse = {
    success: boolean;
    features: Record<string, number>;
};
