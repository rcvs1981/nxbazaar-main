"use client";

import { useState } from "react";
import { GoPlus, GoDash } from "react-icons/go";

const faqData = [
  {
    id: 1,
    question: "How to place an order with Limi Commerce",
    answer:
      "To place an order on Limi Commerce: Step 1: Browse and select the desired product(s). Step 2: Click on Add to Cart. Step 3: Review the items in your shopping cart and make any necessary adjustments. Step 4: Proceed to checkout and enter your delivery information. Step 5: Select a payment method and complete the payment process. Step 6: Confirm your order and wait for delivery.",
  },
  {
    id: 2,
    question: "What payment methods are accepted?",
    answer:
      "Limi Commerce offers multiple payment options, including Pay on Delivery (cash, Mobile Money, Mastercard, or Visa), Limi CommercePay, and Vouchers.",
  },
  {
    id: 3,
    question: "How to track my orders",
    answer:
      "To track your order: Step 1: Log in to your Jumia account. Step 2: Go to the 'MY ORDERS' section. Step 3: Click on 'See Details', then 'Status History'. You'll see the current status of your order and estimated delivery time.",
  },
  {
    id: 4,
    question: "How to cancel items or orders",
    answer:
      "Step 1: Log in to your Jumia account. Step 2: Go to your 'ORDERS' page. Step 3: Click 'See Details' for the order. Step 4: Select the item to cancel and click 'Cancel Item'. Some items may not be eligible for cancelation.",
  },
  {
    id: 5,
    question: "What is the return and refund policy?",
    answer:
      "Returns: You can request a return within 14 days for official items, and 7 days for others. Refunds: Processed to your MTN number or original payment method within 8 working days after approval.",
  },
  {
    id: 6,
    question: "How to report an issue or contact customer support",
    answer:
      "Contact support via live chat, phone (0312531805), or the HELP CENTER on the website. Support is available Mon–Fri (8am–8pm) and weekends (8am–7pm).",
  },
  {
    id: 8,
    question: "How do I add my phone number and address to my account?",
    answer:
      "Step 1: Log in. Step 2: Go to 'MY ACCOUNT'. Step 3: Click 'Add/Edit' in 'Address Book'. Step 4: Fill in your phone number and address. Step 5: Save changes.",
  },
  {
    id: 9,
    question: "How can I get started with Limi Commerce's services?",
    answer:
      "Simply contact us through our website, and our team will guide you through the next steps.",
  },
];

export default function Faq() {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-primaryColor dark:bg-white transition-colors duration-300">
      <div className="max-w-7xl px-4 py-20 mx-auto md:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Left Section */}
          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-semibold tracking-tight text-white dark:text-black">
              Frequently asked questions and answers
            </h2>
            <p className="mt-4 text-base text-zinc-300 dark:text-zinc-700">
              Answers to commonly asked questions about our services and
              packages.
            </p>
          </div>

          {/* Right Section */}
          <div className="lg:col-span-2">
            {faqData.map((faq) => (
              <div
                key={faq.id}
                className="border-b border-white/10 dark:border-black/10 py-4"
              >
                <button
                  onClick={() => handleToggle(faq.id)}
                  className="flex items-center justify-between w-full text-left text-white dark:text-black hover:text-secondaryColor font-semibold text-lg focus:outline-none"
                  aria-expanded={activeAccordion === faq.id}
                  aria-controls={`faq-${faq.id}`}
                >
                  <span>{faq.question}</span>
                  {activeAccordion === faq.id ? (
                    <GoDash className="w-5 h-5" />
                  ) : (
                    <GoPlus className="w-5 h-5" />
                  )}
                </button>
                {activeAccordion === faq.id && (
                  <div
                    id={`faq-${faq.id}`}
                    className="mt-2 text-base text-zinc-200 dark:text-zinc-800 transition-all"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
