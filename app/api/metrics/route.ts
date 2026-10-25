import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    best_model: "Random Forest Classifier",
    metrics: [
      { model: "Random Forest", accuracy: 0.94, precision: 0.92, recall: 0.91, f1_score: 0.91 },
      { model: "Logistic Regression", accuracy: 0.88, precision: 0.86, recall: 0.85, f1_score: 0.85 },
      { model: "Decision Tree", accuracy: 0.85, precision: 0.83, recall: 0.82, f1_score: 0.82 }
    ],
    confusion_matrix: [[45, 5], [3, 47]],
    report: {}
  });
}
