export type ExerciseChartType = 'Squat' | 'Bench' | 'Deadlift';

export interface ChartBar {
  day: string;
  val: string;
  active?: boolean;
}

export const CHART_DATA: Record<ExerciseChartType, ChartBar[]> = {
  Squat: [
    { day: 'MON', val: '40%' },
    { day: 'TUE', val: '55%' },
    { day: 'WED', val: '50%' },
    { day: 'THU', val: '75%' },
    { day: 'FRI', val: '85%' },
    { day: 'SAT', val: '65%', active: true },
    { day: 'SUN', val: '10%' },
  ],
  Bench: [
    { day: 'MON', val: '60%' },
    { day: 'TUE', val: '45%' },
    { day: 'WED', val: '70%' },
    { day: 'THU', val: '55%' },
    { day: 'FRI', val: '90%', active: true },
    { day: 'SAT', val: '30%' },
    { day: 'SUN', val: '15%' },
  ],
  Deadlift: [
    { day: 'MON', val: '35%' },
    { day: 'TUE', val: '60%' },
    { day: 'WED', val: '45%' },
    { day: 'THU', val: '80%' },
    { day: 'FRI', val: '50%' },
    { day: 'SAT', val: '70%', active: true },
    { day: 'SUN', val: '20%' },
  ],
};

export const DEFAULT_CALORIE_TARGET = 2400;
export const DEFAULT_PROTEIN_TARGET = 180;
