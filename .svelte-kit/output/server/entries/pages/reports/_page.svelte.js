import { y as head, z as attr, F as ensure_array_like, G as attr_class, J as stringify } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/context.js";
[
  {
    id: "report-001",
    type: "domain",
    target: "fake-apple-store.com",
    status: "scam",
    description: "Phishing site impersonating Apple Store. Steals credit card information during fake purchases.",
    timestamp: new Date(Date.now() - 15 * 60 * 1e3).toISOString(),
    // 15 minutes ago
    upvotes: 23,
    downvotes: 1,
    reporter: {
      id: "user-security-expert",
      reputation: 95,
      verified: true
    }
  },
  {
    id: "report-002",
    type: "phone",
    target: "+1-555-SCAM-123",
    status: "scam",
    description: "Robocall claiming to be from IRS demanding immediate payment. Threatens arrest if not paid.",
    timestamp: new Date(Date.now() - 45 * 60 * 1e3).toISOString(),
    // 45 minutes ago
    upvotes: 18,
    downvotes: 0,
    reporter: {
      id: "user-concerned-citizen",
      reputation: 78,
      verified: true
    }
  },
  {
    id: "report-003",
    type: "company",
    target: "TechSolutions Pro LLC",
    status: "verified",
    description: "Legitimate IT consulting company. Provided excellent service for our office network setup.",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1e3).toISOString(),
    // 2 hours ago
    upvotes: 12,
    downvotes: 0,
    reporter: {
      id: "user-business-owner",
      reputation: 88,
      verified: true
    }
  },
  {
    id: "report-004",
    type: "email",
    target: "winner@lottery-scam.org",
    status: "scam",
    description: "Lottery scam email claiming I won $500,000. Asks for personal information and bank details.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1e3).toISOString(),
    // 3 hours ago
    upvotes: 31,
    downvotes: 2,
    reporter: {
      id: "user-vigilant-user",
      reputation: 72,
      verified: false
    }
  },
  {
    id: "report-005",
    type: "domain",
    target: "microsoft-security-alert.net",
    status: "warning",
    description: "Suspicious domain with pop-ups claiming computer is infected. Pushes fake antivirus software.",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1e3).toISOString(),
    // 4 hours ago
    upvotes: 15,
    downvotes: 1,
    reporter: {
      id: "user-tech-savvy",
      reputation: 91,
      verified: true
    }
  },
  {
    id: "report-006",
    type: "company",
    target: "Green Energy Solutions Inc",
    status: "warning",
    description: "Door-to-door sales with high-pressure tactics. Claims about energy savings seem exaggerated.",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1e3).toISOString(),
    // 6 hours ago
    upvotes: 8,
    downvotes: 3,
    reporter: {
      id: "user-homeowner",
      reputation: 65,
      verified: false
    }
  },
  {
    id: "report-007",
    type: "phone",
    target: "+1-800-SUPPORT",
    status: "verified",
    description: "Legitimate customer support line for major telecommunications company. Helpful and professional.",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1e3).toISOString(),
    // 8 hours ago
    upvotes: 7,
    downvotes: 0,
    reporter: {
      id: "user-satisfied-customer",
      reputation: 82,
      verified: true
    }
  },
  {
    id: "report-008",
    type: "email",
    target: "support@legitimate-bank.com",
    status: "verified",
    description: "Official support email from my bank. Responded quickly to account inquiry with proper verification.",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1e3).toISOString(),
    // 12 hours ago
    upvotes: 5,
    downvotes: 0,
    reporter: {
      id: "user-bank-customer",
      reputation: 76,
      verified: true
    }
  },
  {
    id: "report-009",
    type: "domain",
    target: "crypto-investment-scam.biz",
    status: "scam",
    description: "Cryptocurrency investment scam promising 500% returns. Lost $2,000 before realizing it was fake.",
    timestamp: new Date(Date.now() - 18 * 60 * 60 * 1e3).toISOString(),
    // 18 hours ago
    upvotes: 42,
    downvotes: 0,
    reporter: {
      id: "user-victim",
      reputation: 45,
      verified: false
    }
  },
  {
    id: "report-010",
    type: "phone",
    target: "+1-555-CHARITY",
    status: "warning",
    description: "Charity solicitation call. Legitimate cause but very aggressive tactics and unclear about fund usage.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1e3).toISOString(),
    // 1 day ago
    upvotes: 6,
    downvotes: 2,
    reporter: {
      id: "user-donor",
      reputation: 69,
      verified: false
    }
  }
];
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let filter = "all";
    let searchQuery = "";
    const filterOptions = [
      { value: "all", label: "All Reports" },
      { value: "scam", label: "Scams" },
      { value: "warning", label: "Warnings" },
      { value: "verified", label: "Verified" }
    ];
    head($$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Community Reports - CheckMe</title>`);
      });
      $$renderer3.push(`<meta name="description" content="Browse community reports about companies, domains, phone numbers, and email addresses."/>`);
    });
    $$renderer2.push(`<div class="reports-page svelte-2pp8mk"><div class="page-header svelte-2pp8mk"><h1 class="svelte-2pp8mk">Community Reports</h1> <p class="page-description svelte-2pp8mk">Browse reports submitted by our community members. Help others stay safe by sharing your experiences.</p></div> <div class="reports-controls svelte-2pp8mk"><div class="search-box svelte-2pp8mk"><input type="text"${attr("value", searchQuery)} placeholder="Search reports..." class="form-input"/></div> <div class="filter-tabs svelte-2pp8mk"><!--[-->`);
    const each_array = ensure_array_like(filterOptions);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let option = each_array[$$index];
      $$renderer2.push(`<button${attr_class(`filter-tab ${stringify(filter === option.value ? "active" : "")}`, "svelte-2pp8mk")}>${escape_html(option.label)}</button>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="reports-content svelte-2pp8mk">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="loading-state svelte-2pp8mk"><div class="loading"></div> <p>Loading community reports...</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
