import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    features: {
      "Previous C-Section": 0.35,
      "Baby Position": 0.22,
      "Blood Pressure": 0.15,
      "Pre-eclampsia": 0.10,
      "Fetal Heart Rate": 0.08,
      "Blood Sugar": 0.05,
      "Age": 0.03,
      "Gestational Age": 0.02
    }
  });
}
