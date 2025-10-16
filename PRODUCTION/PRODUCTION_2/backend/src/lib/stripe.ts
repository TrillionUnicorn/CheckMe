/**
 * Stripe Payment Integration
 * Handles subscriptions, payments, and webhooks
 */

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-10-28.acacia',
});

// Pricing plans
export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    verifications: 1000,
    features: ['All core features', 'Community support', 'API access'],
  },
  starter: {
    name: 'Starter',
    price: 49,
    priceId: process.env.STRIPE_STARTER_PRICE_ID || 'price_starter',
    verifications: 5000,
    features: ['5,000 verifications/month', '$0.10 each additional', 'Email support'],
  },
  professional: {
    name: 'Professional',
    price: 199,
    priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_professional',
    verifications: 20000,
    features: ['20,000 verifications/month', '$0.08 each additional', 'Priority support'],
  },
  enterprise: {
    name: 'Enterprise',
    price: null,
    verifications: null,
    features: ['Unlimited verifications', 'Custom pricing', 'Dedicated support', 'SLA'],
  },
};

/**
 * Create checkout session for subscription
 */
export async function createCheckoutSession(
  userId: string,
  plan: 'starter' | 'professional',
  successUrl: string,
  cancelUrl: string
): Promise<{ sessionId: string; url: string }> {
  const priceId = PLANS[plan].priceId;

  if (!priceId) {
    throw new Error('Invalid plan');
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    client_reference_id: userId,
    metadata: {
      userId,
      plan,
    },
  });

  return {
    sessionId: session.id,
    url: session.url || '',
  };
}

/**
 * Create customer portal session
 */
export async function createPortalSession(
  customerId: string,
  returnUrl: string
): Promise<{ url: string }> {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return { url: session.url };
}

/**
 * Get subscription details
 */
export async function getSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.retrieve(subscriptionId);
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.cancel(subscriptionId);
}

/**
 * Update subscription
 */
export async function updateSubscription(
  subscriptionId: string,
  newPriceId: string
): Promise<Stripe.Subscription> {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  return await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: newPriceId,
      },
    ],
  });
}

/**
 * Create usage record for metered billing
 */
export async function recordUsage(
  subscriptionItemId: string,
  quantity: number
): Promise<Stripe.UsageRecord> {
  return await stripe.subscriptionItems.createUsageRecord(subscriptionItemId, {
    quantity,
    timestamp: Math.floor(Date.now() / 1000),
    action: 'increment',
  });
}

/**
 * Handle webhook events
 */
export async function handleWebhook(
  payload: string | Buffer,
  signature: string
): Promise<{ event: Stripe.Event; handled: boolean }> {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err: any) {
    throw new Error(`Webhook signature verification failed: ${err.message}`);
  }

  let handled = false;

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // Update user subscription in database
      console.log('Checkout completed:', session.id);
      handled = true;
      break;

    case 'customer.subscription.created':
      const subscription = event.data.object as Stripe.Subscription;
      // Activate subscription in database
      console.log('Subscription created:', subscription.id);
      handled = true;
      break;

    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object as Stripe.Subscription;
      // Update subscription in database
      console.log('Subscription updated:', updatedSubscription.id);
      handled = true;
      break;

    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription;
      // Deactivate subscription in database
      console.log('Subscription deleted:', deletedSubscription.id);
      handled = true;
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      // Record successful payment
      console.log('Payment succeeded:', invoice.id);
      handled = true;
      break;

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object as Stripe.Invoice;
      // Handle failed payment
      console.log('Payment failed:', failedInvoice.id);
      handled = true;
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return { event, handled };
}

/**
 * Get customer by email
 */
export async function getCustomerByEmail(email: string): Promise<Stripe.Customer | null> {
  const customers = await stripe.customers.list({ email, limit: 1 });
  return customers.data[0] || null;
}

/**
 * Create customer
 */
export async function createCustomer(
  email: string,
  name?: string,
  metadata?: Record<string, string>
): Promise<Stripe.Customer> {
  return await stripe.customers.create({
    email,
    name,
    metadata,
  });
}

export default {
  createCheckoutSession,
  createPortalSession,
  getSubscription,
  cancelSubscription,
  updateSubscription,
  recordUsage,
  handleWebhook,
  getCustomerByEmail,
  createCustomer,
  PLANS,
};

