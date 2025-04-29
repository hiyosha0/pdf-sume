import { delay } from "motion/react";
import { isDev } from "./helpers";

export const pricingPlans = [
  {
    name: "Basic",
    price: 1.99,
    items: [
      "5 PDF summeries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_00g7uHfQl6ZZ7jq7st" // Test mode basic plan
      : "", // Live mode basic plan
    priceId: "price_1RFVSYIrXk7nKM4ogjagfdJ4",
  },
  {
    name: "Pro",
    price: 3.99,
    items: [
      "Unlimited PDF summeries",
      "priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_cN216j5bH4RR8nucMM" // Test mode pro plan
      : "", // Live mode pro plan
    priceId: "price_1RFVSYIrXk7nKM4oltL4JXDE",
  },
];

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};
