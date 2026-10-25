import { NextResponse } from 'next/server';

const mockInput = {
    age: 28,
    blood_pressure: 120,
    blood_sugar: 95,
    heart_rate: 80,
    hemoglobin: 11.5,
    bmi: 26.0,
    previous_c_section: 0,
    number_of_pregnancies: 2,
    parity: 1,
    anc_visits: 5,
    fetal_heart_rate: 145,
    baby_position: 0,
    gestational_age: 38,
    preeclampsia: 0,
};

export async function GET() {
  return NextResponse.json({
    success: true,
    history: [
      { 
        timestamp: new Date().toISOString(), 
        prediction: "Caesarean Delivery", 
        risk: "High", 
        probability: 0.85,
        input_data: mockInput
      },
      { 
        timestamp: new Date(Date.now() - 86400000).toISOString(), 
        prediction: "Normal Delivery", 
        risk: "Low", 
        probability: 0.92,
        input_data: mockInput
      },
      { 
        timestamp: new Date(Date.now() - 172800000).toISOString(), 
        prediction: "Normal Delivery", 
        risk: "Low", 
        probability: 0.88,
        input_data: mockInput
      },
    ]
  });
}
