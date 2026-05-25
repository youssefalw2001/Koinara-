export type BehaviorInput = {
  clickCount: number;
  minutesSincePost: number;
  returnVisits: number;
  submittedHandle: boolean;
  clickedPayment: boolean;
};

export function calculateBehavioralScore(input: BehaviorInput) {
  let score = 0;

  score += Math.min(input.clickCount * 8, 30);

  if (input.minutesSincePost <= 2) score += 30;
  else if (input.minutesSincePost <= 10) score += 20;
  else if (input.minutesSincePost <= 60) score += 10;

  score += Math.min(input.returnVisits * 10, 25);

  if (input.submittedHandle) score += 10;
  if (input.clickedPayment) score += 5;

  return Math.min(score, 100);
}

export function getBehaviorLabel(score: number) {
  if (score >= 80) return 'Repeat Observer';
  if (score >= 60) return 'High Interest';
  if (score >= 35) return 'Curious';
  return 'Low Signal';
}
