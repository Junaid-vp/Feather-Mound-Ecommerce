// ============================================================================
// 📌 PolicyAccordion.jsx — Premium Black & White
// ============================================================================

import React, { useEffect, useState } from "react";
import { 
  Shield, 
  FileText, 
  RefreshCw, 
  ChevronDown,
  CheckCircle,
  XCircle,
  Lock,
  Mail,
  ShoppingBag,
  Check,
  X,
  ArrowRight
} from "lucide-react";

const PolicyAccordion = () => {
  const [openSection, setOpenSection] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const policies = [
    {
      id: "privacy",
      icon: <Shield className="w-5 h-5" />,
      title: "Privacy Policy",
      subtitle: "Your data security is our priority",
      content: {
        intro: "At FEATHER MOUND, we value your privacy and are committed to protecting your personal information.",
        points: [
          "We collect details such as your name, email address, phone number, delivery address, and payment-related information to process your orders smoothly.",
          "Your personal data is never sold, rented, or shared with third parties, except when required to complete payments, shipping, or comply with legal obligations.",
          "We use secure systems to protect your data from unauthorized access."
        ],
        uses: [
          "Process and deliver your orders",
          "Communicate order updates and support responses",
          "Improve our website and shopping experience"
        ],
        agreement: "By using our website, you agree to the collection and use of information as described in this Privacy Policy."
      }
    },
    {
      id: "terms",
      icon: <FileText className="w-5 h-5" />,
      title: "Terms & Conditions",
      subtitle: "Our commitment to transparent service",
      content: {
        intro: "By accessing or purchasing from FEATHER MOUND, you agree to follow the terms and conditions mentioned below.",
        points: [
          "All products listed on our website are subject to availability.",
          "Prices, product details, and offers may change without prior notice.",
          "Orders once placed cannot be modified after confirmation.",
          "FEATHER MOUND reserves the right to cancel orders in case of pricing errors, stock issues, or suspected fraud.",
          "All website content, including images, logos, and text, belongs to FEATHER MOUND and must not be copied or used without permission."
        ],
        agreement: "Continued use of our website confirms your acceptance of these terms."
      }
    },
    {
      id: "returns",
      icon: <RefreshCw className="w-5 h-5" />,
      title: "Returns & Exchanges",
      subtitle: "Hassle-free 7-day return policy",
      content: {
        intro: "At FEATHER MOUND, we offer a 7-day return or exchange policy after delivery for your convenience.",
        eligible: [
          "Requests must be made within 7 days from the date of delivery",
          "Product must be unused, unwashed, and in original condition",
          "Original packaging, tags, and invoice must be intact"
        ],
        notEligible: [
          "Products damaged due to misuse or negligence",
          "Items returned after 7 days of delivery",
          "Customized or discounted items (if applicable)"
        ],
        process: "Once we receive and inspect the returned product, approved refunds will be processed to the original payment method within a few business days.",
        contact: "For return or exchange requests, please contact our support team with your order details."
      }
    }
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-8" data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full border border-gray-900 flex items-center justify-center">
              <Lock className="w-8 h-8 text-gray-900" />
            </div>
          </div>
          <h1 className="text-3xl font-light tracking-wide text-gray-900 mb-3">
            FEATHER MOUND POLICIES
          </h1>
          <p className="text-gray-500 text-sm font-light tracking-wide">
            Transparent policies for your peace of mind
          </p>
        </div>

        {/* Policies Accordion */}
        <div className="space-y-4">
          {policies.map((policy) => {
            const isOpen = openSection === policy.id;

            return (
              <div
                key={policy.id}
                className="border border-gray-200 bg-white"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setOpenSection(isOpen ? null : policy.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 border ${
                      isOpen ? 'border-gray-900' : 'border-gray-200'
                    }`}>
                      {policy.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-light tracking-wide text-gray-900">
                        {policy.title}
                      </h3>
                      <p className="text-xs text-gray-500 font-light mt-1">
                        {policy.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Accordion Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-[2000px]" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-100 pt-6">
                      {/* Intro */}
                      <p className="text-gray-600 text-sm mb-6">
                        {policy.content.intro}
                      </p>

                      {/* Points List */}
                      {policy.content.points && (
                        <div className="mb-6">
                          <ul className="space-y-3">
                            {policy.content.points.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <div className="w-1 h-1 rounded-full bg-gray-900 mt-2 flex-shrink-0"></div>
                                <span className="text-gray-600 text-sm">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Uses List (Privacy) */}
                      {policy.content.uses && (
                        <div className="mb-6">
                          <h4 className="text-sm font-light text-gray-900 mb-3 tracking-wide">
                            WE USE YOUR INFORMATION ONLY TO:
                          </h4>
                          <div className="space-y-2">
                            {policy.content.uses.map((use, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-2 p-3 border border-gray-100"
                              >
                                <CheckCircle className="w-4 h-4 text-gray-600" />
                                <span className="text-sm text-gray-600">{use}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Eligible/Not Eligible (Returns) */}
                      {policy.content.eligible && (
                        <div className="mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Eligible */}
                            <div className="p-4 border border-gray-100">
                              <div className="flex items-center gap-2 mb-3">
                                <Check className="w-4 h-4 text-gray-900" />
                                <h4 className="text-sm font-light text-gray-900 tracking-wide">
                                  ELIGIBLE FOR RETURN OR EXCHANGE:
                                </h4>
                              </div>
                              <ul className="space-y-2">
                                {policy.content.eligible.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <div className="w-1 h-1 rounded-full bg-gray-900 mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-600 text-xs">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Not Eligible */}
                            <div className="p-4 border border-gray-100">
                              <div className="flex items-center gap-2 mb-3">
                                <X className="w-4 h-4 text-gray-900" />
                                <h4 className="text-sm font-light text-gray-900 tracking-wide">
                                  NOT ELIGIBLE:
                                </h4>
                              </div>
                              <ul className="space-y-2">
                                {policy.content.notEligible.map((item, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <div className="w-1 h-1 rounded-full bg-gray-900 mt-2 flex-shrink-0"></div>
                                    <span className="text-gray-600 text-xs">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Process (Returns) */}
                      {policy.content.process && (
                        <div className="mb-4 p-3 border border-gray-100 bg-gray-50">
                          <p className="text-sm text-gray-600">{policy.content.process}</p>
                        </div>
                      )}

                      {/* Contact (Returns) */}
                      {policy.content.contact && (
                        <div className="mb-4 p-3 border border-gray-200 bg-gray-900">
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="w-4 h-4 text-white" />
                            <h4 className="text-sm font-light text-white tracking-wide">
                              NEED ASSISTANCE?
                            </h4>
                          </div>
                          <p className="text-sm text-gray-300">{policy.content.contact}</p>
                        </div>
                      )}

                      {/* Agreement */}
                      {policy.content.agreement && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <p className="text-xs text-gray-900 font-light">
                            {policy.content.agreement}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-base font-light text-gray-900 mb-2 tracking-wide">
                QUESTIONS ABOUT OUR POLICIES?
              </h3>
              <p className="text-sm text-gray-500">
                Our support team is available to clarify any policy-related questions.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="mailto:support@feathermound.com"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors text-sm font-light tracking-wide"
              >
                <Mail className="w-4 h-4" />
                CONTACT SUPPORT
              </a>
              <a
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-900 hover:border-gray-900 transition-colors text-sm font-light tracking-wide"
              >
                <ShoppingBag className="w-4 h-4" />
                SHOP NOW
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 font-light tracking-wide">
            © {new Date().getFullYear()} FEATHER MOUND. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PolicyAccordion;