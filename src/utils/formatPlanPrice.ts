import type { Plan } from '../components/pricing/PricingCards';

export const formatPlanPrice = (plan: Pick<Plan, 'price' | 'currency'>) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: plan.currency || 'EUR',
    maximumFractionDigits: 2,
  }).format(Number(plan.price));

export const checkoutPathForPlan = (planId: number) => `/checkout/?plan=${planId}`;
