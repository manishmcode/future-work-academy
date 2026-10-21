import type { Plan } from '../components/pricing/PricingCards';

export const formatPlanPrice = (plan: Pick<Plan, 'price' | 'currency'>) =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: plan.currency || 'EUR',
    maximumFractionDigits: 2,
  }).format(Number(plan.price));

export const CHECKOUT_PATH = '/checkout/';
export const CHECKOUT_PLAN_STORAGE_KEY = 'futureworkacademy_checkout_plan';

export type CheckoutLocationState = { planId?: number };

export const rememberCheckoutPlan = (planId: number) => {
  sessionStorage.setItem(CHECKOUT_PLAN_STORAGE_KEY, String(planId));
};
