'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    description: 'Perfect for trying out our tools',
    features: [
      '10 requests per day',
      'Access to basic tools',
      'Community support',
      'Export with watermark',
    ],
    limitations: [
      'File size limit: 5MB',
      'No batch processing',
      'No API access',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: { monthly: 6, yearly: 60 },
    description: 'For professionals who need more',
    features: [
      '500 requests per day',
      'Access to all tools',
      'Priority support',
      'No watermarks',
      'File size limit: 100MB',
      'Batch processing',
      '90 days history',
      'Export to multiple formats',
    ],
    cta: '14-Day Free Trial',
    popular: true,
  },
  {
    name: 'Team',
    price: { monthly: 29, yearly: 290 },
    description: 'For teams and organizations',
    features: [
      'Unlimited requests',
      'All Pro features',
      'Team workspace (5 members)',
      'Unlimited file size',
      'Advanced batch processing',
      '1 year history',
      'API access',
      'Priority queue',
      'Custom branding',
      'SSO support',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Enterprise',
    price: { monthly: null, yearly: null },
    description: 'Custom solutions for large organizations',
    features: [
      'Everything in Team',
      'Unlimited team members',
      'Dedicated support',
      'Custom integrations',
      'SLA guarantee',
      'On-premise deployment option',
      'Advanced security features',
      'Custom development',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const calculateSavings = (monthlyPrice: number) => {
    const yearlyEquivalent = monthlyPrice * 12;
    const yearlyPrice = monthlyPrice * 10; // 2 months free
    const savings = Math.round(((yearlyEquivalent - yearlyPrice) / yearlyEquivalent) * 100);
    return savings;
  };

  return (
    <div className="container px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Simple,{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            transparent pricing
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Choose the perfect plan for your needs. All plans include a 14-day free trial.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="mb-12 flex items-center justify-center gap-4">
        <span
          className={cn(
            'text-sm font-medium',
            billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          Monthly
        </span>
        <button
          onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          role="switch"
          aria-checked={billingCycle === 'yearly'}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-primary transition-transform',
              billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </button>
        <span
          className={cn(
            'text-sm font-medium',
            billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'
          )}
        >
          Yearly
        </span>
        {billingCycle === 'yearly' && (
          <span className="ml-2 rounded-full bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-600 dark:text-green-400">
            Save 17%
          </span>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              'relative flex flex-col rounded-lg border bg-card p-6 shadow-sm',
              plan.popular && 'border-primary shadow-lg ring-2 ring-primary/20'
            )}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>

            <div className="mb-6">
              {plan.price.monthly !== null ? (
                <>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold">
                      ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                    </span>
                    <span className="ml-2 text-muted-foreground">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && plan.price.monthly > 0 && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      ${plan.price.monthly}/month billed annually
                    </p>
                  )}
                </>
              ) : (
                <div className="text-4xl font-bold">Custom</div>
              )}
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600 dark:text-green-400" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={cn(
                'w-full rounded-md px-4 py-2 text-sm font-medium transition-colors',
                plan.popular
                  ? 'bg-primary text-primary-foreground shadow hover:bg-primary/90'
                  : 'border bg-background hover:bg-accent'
              )}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mx-auto mt-20 max-w-3xl">
        <h2 className="mb-8 text-center text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="mb-2 font-semibold">Can I switch plans anytime?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! You can upgrade or downgrade your plan at any time. Changes take effect
              immediately, and we'll prorate the difference.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">What payment methods do you accept?</h3>
            <p className="text-sm text-muted-foreground">
              We accept all major credit cards (Visa, MasterCard, American Express) and PayPal for
              annual plans.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">Is there a free trial?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Pro and Team plans include a 14-day free trial. No credit card required to start.
            </p>
          </div>
          <div>
            <h3 className="mb-2 font-semibold">What happens to my data if I cancel?</h3>
            <p className="text-sm text-muted-foreground">
              Your data is retained for 30 days after cancellation. You can export it at any time
              during this period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
