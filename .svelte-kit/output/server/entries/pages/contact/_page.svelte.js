import { y as head, z as attr } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let formData = {
      name: "",
      email: "",
      company: "",
      phone: "",
      subject: "",
      message: ""
    };
    let submitting = false;
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Contact Us - CheckMe</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Get in touch with CheckMe. We're here to answer your questions about identity verification and fraud detection."/>`);
    });
    $$renderer2.push(`<div class="contact-page svelte-1bv7ezn"><section class="contact-hero svelte-1bv7ezn"><div class="container svelte-1bv7ezn"><h1 class="svelte-1bv7ezn">Get in Touch</h1> <p class="svelte-1bv7ezn">Have questions? We're here to help. Reach out to our team and we'll respond within 24 hours.</p></div></section> <section class="contact-content svelte-1bv7ezn"><div class="container svelte-1bv7ezn"><div class="contact-grid svelte-1bv7ezn"><div class="contact-form-section svelte-1bv7ezn"><h2 class="svelte-1bv7ezn">Send Us a Message</h2> `);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<form class="contact-form svelte-1bv7ezn"><div class="form-row svelte-1bv7ezn"><div class="form-group svelte-1bv7ezn"><label for="name" class="svelte-1bv7ezn">Name *</label> <input type="text" id="name"${attr("value", formData.name)} placeholder="John Doe" required class="svelte-1bv7ezn"/></div> <div class="form-group svelte-1bv7ezn"><label for="email" class="svelte-1bv7ezn">Email *</label> <input type="email" id="email"${attr("value", formData.email)} placeholder="john@example.com" required class="svelte-1bv7ezn"/></div></div> <div class="form-row svelte-1bv7ezn"><div class="form-group svelte-1bv7ezn"><label for="company" class="svelte-1bv7ezn">Company</label> <input type="text" id="company"${attr("value", formData.company)} placeholder="Your Company" class="svelte-1bv7ezn"/></div> <div class="form-group svelte-1bv7ezn"><label for="phone" class="svelte-1bv7ezn">Phone</label> <input type="tel" id="phone"${attr("value", formData.phone)} placeholder="+1 (555) 123-4567" class="svelte-1bv7ezn"/></div></div> <div class="form-group svelte-1bv7ezn"><label for="subject" class="svelte-1bv7ezn">Subject</label> `);
      $$renderer2.select({ id: "subject", value: formData.subject, class: "" }, ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`Select a subject`);
        });
        $$renderer3.option({ value: "general" }, ($$renderer4) => {
          $$renderer4.push(`General Inquiry`);
        });
        $$renderer3.option({ value: "sales" }, ($$renderer4) => {
          $$renderer4.push(`Sales &amp; Pricing`);
        });
        $$renderer3.option({ value: "support" }, ($$renderer4) => {
          $$renderer4.push(`Technical Support`);
        });
        $$renderer3.option({ value: "partnership" }, ($$renderer4) => {
          $$renderer4.push(`Partnership Opportunities`);
        });
        $$renderer3.option({ value: "investment" }, ($$renderer4) => {
          $$renderer4.push(`Investment Inquiry`);
        });
        $$renderer3.option({ value: "other" }, ($$renderer4) => {
          $$renderer4.push(`Other`);
        });
      });
      $$renderer2.push(`</div> <div class="form-group svelte-1bv7ezn"><label for="message" class="svelte-1bv7ezn">Message *</label> <textarea id="message" placeholder="Tell us how we can help..." rows="6" required class="svelte-1bv7ezn">`);
      const $$body = escape_html(formData.message);
      if ($$body) {
        $$renderer2.push(`${$$body}`);
      }
      $$renderer2.push(`</textarea></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button type="submit" class="btn btn-primary btn-lg svelte-1bv7ezn"${attr("disabled", submitting, true)}>`);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`📧 Send Message`);
      }
      $$renderer2.push(`<!--]--></button></form>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="contact-info-section svelte-1bv7ezn"><h2 class="svelte-1bv7ezn">Contact Information</h2> <div class="info-card svelte-1bv7ezn"><div class="info-icon svelte-1bv7ezn">📧</div> <div class="info-content svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Email</h3> <a href="mailto:hunter@checkme.com" class="svelte-1bv7ezn">hunter@checkme.com</a> <p class="svelte-1bv7ezn">We'll respond within 24 hours</p></div></div> <div class="info-card svelte-1bv7ezn"><div class="info-icon svelte-1bv7ezn">📞</div> <div class="info-content svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Phone</h3> <a href="tel:+15551234567" class="svelte-1bv7ezn">+1 (555) 123-4567</a> <p class="svelte-1bv7ezn">Mon-Fri, 9AM-6PM EST</p></div></div> <div class="info-card svelte-1bv7ezn"><div class="info-icon svelte-1bv7ezn">🌐</div> <div class="info-content svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Social Media</h3> <div class="social-links svelte-1bv7ezn"><a href="https://github.com/TrillionUnicorn/CheckMe" target="_blank" rel="noopener" class="svelte-1bv7ezn">GitHub</a> <a href="https://linkedin.com/company/checkme" target="_blank" rel="noopener" class="svelte-1bv7ezn">LinkedIn</a> <a href="https://twitter.com/checkme" target="_blank" rel="noopener" class="svelte-1bv7ezn">Twitter</a></div></div></div> <div class="info-card svelte-1bv7ezn"><div class="info-icon svelte-1bv7ezn">⏰</div> <div class="info-content svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Response Time</h3> <p class="svelte-1bv7ezn"><strong>General Inquiries:</strong> Within 24 hours</p> <p class="svelte-1bv7ezn"><strong>Sales:</strong> Within 4 hours</p> <p class="svelte-1bv7ezn"><strong>Support:</strong> Within 2 hours</p></div></div> <div class="info-card svelte-1bv7ezn"><div class="info-icon svelte-1bv7ezn">🏢</div> <div class="info-content svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Headquarters</h3> <p class="svelte-1bv7ezn">San Francisco, CA</p> <p class="svelte-1bv7ezn">United States</p></div></div></div></div></div></section> <section class="faq-section svelte-1bv7ezn"><div class="container svelte-1bv7ezn"><h2 class="svelte-1bv7ezn">Frequently Asked Questions</h2> <div class="faq-grid svelte-1bv7ezn"><div class="faq-item svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">How quickly can I get started?</h3> <p class="svelte-1bv7ezn">You can start verifying identities immediately after signing up. Our API is ready to use in minutes.</p></div> <div class="faq-item svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">What's your pricing model?</h3> <p class="svelte-1bv7ezn">We offer pay-per-use pricing starting at $0.10 per verification. Volume discounts available for enterprise customers.</p></div> <div class="faq-item svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Do you offer a free trial?</h3> <p class="svelte-1bv7ezn">Yes! All new accounts get 1,000 free verifications per month to test our platform.</p></div> <div class="faq-item svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Is my data secure?</h3> <p class="svelte-1bv7ezn">Absolutely. We're SOC 2 Type II certified and fully compliant with GDPR and CCPA regulations.</p></div> <div class="faq-item svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">What countries do you support?</h3> <p class="svelte-1bv7ezn">We currently support verification in 200+ countries with plans to expand to full global coverage.</p></div> <div class="faq-item svelte-1bv7ezn"><h3 class="svelte-1bv7ezn">Can I integrate with my existing system?</h3> <p class="svelte-1bv7ezn">Yes! We offer RESTful APIs, SDKs for popular languages, and pre-built integrations for major platforms.</p></div></div></div></section></div>`);
  });
}
export {
  _page as default
};
