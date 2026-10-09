// Set REACT_APP_API_URL in .env to override this value for another environment.
export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:4000/future-work-api";

export const API_URLS = {
  auth: {
    signup: `${API_BASE_URL}/auth/signup`,
    login: `${API_BASE_URL}/auth/login`,
    changePassword: `${API_BASE_URL}/auth/change-password`,
    me: `${API_BASE_URL}/auth/me`,
  },
  plans: {
    list: `${API_BASE_URL}/plans`,
  },
  subscriptions: {
    unsubscribe: `${API_BASE_URL}/subscriptions/unsubscribe`,
    validateIban: `${API_BASE_URL}/subscriptions/validate-iban`,
    assignPlan: `${API_BASE_URL}/subscriptions/assign-plan`,
    createPaymentSession: `${API_BASE_URL}/subscriptions/create-payment-session`,
    retryPaymentSession: `${API_BASE_URL}/subscriptions/retry-payment-session`,
    submitPayment: `${API_BASE_URL}/subscriptions/submit-payment`,
    verifyPayment: `${API_BASE_URL}/subscriptions/verify-payment`,
    paymentStatus: (sessionToken) =>
      `${API_BASE_URL}/subscriptions/payment-status/${sessionToken}`,
    myPlan: `${API_BASE_URL}/subscriptions/my-plan`,
    history: `${API_BASE_URL}/subscriptions/history`,
  },
  library: {
    list: `${API_BASE_URL}/library`,
    categories: `${API_BASE_URL}/library/categories`,
    items: `${API_BASE_URL}/library/items`,
  },
  user: {
    dashboard: `${API_BASE_URL}/user/dashboard`,
    profile: `${API_BASE_URL}/user/profile`,
  },
  classes: {
    list: `${API_BASE_URL}/classes`,
    create: `${API_BASE_URL}/classes`,
    update: (id) => `${API_BASE_URL}/classes/${id}`,
    remove: (id) => `${API_BASE_URL}/classes/${id}`,
    join: (id) => `${API_BASE_URL}/classes/${id}/join`,
    joinRedirect: (id, token) => `${API_BASE_URL}/classes/${id}/join/${token}`,
  },
};

