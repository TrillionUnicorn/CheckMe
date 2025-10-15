import { F as ensure_array_like, z as attr, G as attr_class, J as stringify, y as head } from "../../../chunks/index.js";
import { e as escape_html } from "../../../chunks/context.js";
function VerificationForm($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let verificationType = "company";
    let inputValue = "";
    let loading = false;
    let result = null;
    let error = "";
    const verificationTypes = [
      {
        value: "company",
        label: "Company/Business",
        placeholder: "Enter company name or registration number"
      },
      {
        value: "domain",
        label: "Domain/Website",
        placeholder: "Enter domain name (e.g., example.com)"
      },
      {
        value: "phone",
        label: "Phone Number",
        placeholder: "Enter phone number with country code"
      },
      {
        value: "email",
        label: "Email Address",
        placeholder: "Enter email address"
      }
    ];
    function resetForm() {
      inputValue = "";
      result = null;
      error = "";
    }
    $$renderer2.push(`<div class="verification-form svelte-11kmpwj"><div class="form-group svelte-11kmpwj"><label for="verification-type" class="form-label svelte-11kmpwj">Verification Type</label> `);
    $$renderer2.select(
      {
        id: "verification-type",
        value: verificationType,
        class: "form-select",
        onchange: resetForm
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(verificationTypes);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let type = each_array[$$index];
          $$renderer3.option({ value: type.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(type.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="form-group svelte-11kmpwj"><label for="verification-input" class="form-label svelte-11kmpwj">${escape_html(verificationTypes.find((t) => t.value === verificationType)?.label)}</label> <div class="input-group svelte-11kmpwj"><input id="verification-input" type="text"${attr("value", inputValue)}${attr("placeholder", verificationTypes.find((t) => t.value === verificationType)?.placeholder)} class="form-input svelte-11kmpwj"${attr("disabled", loading, true)}/> <button${attr("disabled", !inputValue.trim(), true)} class="btn btn-primary">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`🔍 Verify`);
    }
    $$renderer2.push(`<!--]--></button></div></div> `);
    if (error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="alert alert-danger">${escape_html(error)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (result) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="verification-result svelte-11kmpwj"><div class="result-header svelte-11kmpwj"><div${attr_class(`result-status ${stringify(result.status)}`, "svelte-11kmpwj")}><span class="status-icon">`);
      if (result.status === "verified") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`✅`);
      } else {
        $$renderer2.push("<!--[!-->");
        if (result.status === "warning") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`⚠️`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`❌`);
        }
        $$renderer2.push(`<!--]-->`);
      }
      $$renderer2.push(`<!--]--></span> <span class="status-text">${escape_html(result.status === "verified" ? "Verified" : result.status === "warning" ? "Warning" : "Not Verified")}</span></div> <div class="confidence-score svelte-11kmpwj">Confidence: ${escape_html(result.confidence)}%</div></div> <div class="result-details svelte-11kmpwj"><h4 class="svelte-11kmpwj">Details</h4> `);
      if (result.details) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(Object.entries(result.details));
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let [key, value] = each_array_1[$$index_1];
          $$renderer2.push(`<div class="detail-item svelte-11kmpwj"><span class="detail-key svelte-11kmpwj">${escape_html(key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()))}:</span> <span class="detail-value svelte-11kmpwj">${escape_html(value)}</span></div>`);
        }
        $$renderer2.push(`<!--]-->`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div> `);
      if (result.warnings && result.warnings.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="result-warnings svelte-11kmpwj"><h4 class="svelte-11kmpwj">⚠️ Warnings</h4> <ul class="svelte-11kmpwj"><!--[-->`);
        const each_array_2 = ensure_array_like(result.warnings);
        for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
          let warning = each_array_2[$$index_2];
          $$renderer2.push(`<li class="svelte-11kmpwj">${escape_html(warning)}</li>`);
        }
        $$renderer2.push(`<!--]--></ul></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (result.recommendations && result.recommendations.length > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="result-recommendations svelte-11kmpwj"><h4 class="svelte-11kmpwj">💡 Recommendations</h4> <ul class="svelte-11kmpwj"><!--[-->`);
        const each_array_3 = ensure_array_like(result.recommendations);
        for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
          let recommendation = each_array_3[$$index_3];
          $$renderer2.push(`<li class="svelte-11kmpwj">${escape_html(recommendation)}</li>`);
        }
        $$renderer2.push(`<!--]--></ul></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function DocumentUpload($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="document-upload svelte-q55ujc"><h3 class="svelte-q55ujc">📄 Document Verification</h3> <p class="upload-description svelte-q55ujc">Upload government IDs, passports, driver's licenses, or other identity documents for verification.</p> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class("drop-zone svelte-q55ujc", void 0, { "dragging": false })} role="button" tabindex="0" aria-label="Drop zone for document upload"><div class="drop-zone-content svelte-q55ujc"><div class="upload-icon svelte-q55ujc">📤</div> <p class="drop-zone-text svelte-q55ujc">Drag and drop your document here, or <label for="file-input" class="file-label svelte-q55ujc">browse</label></p> <input id="file-input" type="file" accept=".jpg,.jpeg,.png,.pdf,.webp" style="display: none;"/> <p class="file-types svelte-q55ujc">Supported: JPG, PNG, PDF, WebP (Max 10MB)</p></div></div> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <button${attr("disabled", true, true)} class="btn btn-primary btn-upload svelte-q55ujc">`);
      {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`🔍 Verify Document`);
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function _page($$renderer) {
  head($$renderer, ($$renderer2) => {
    $$renderer2.title(($$renderer3) => {
      $$renderer3.push(`<title>Verify - CheckMe</title>`);
    });
    $$renderer2.push(`<meta name="description" content="Verify companies, domains, phone numbers, and email addresses for fraud and legitimacy."/>`);
  });
  $$renderer.push(`<div class="verify-page svelte-1230iaq"><div class="page-header svelte-1230iaq"><h1 class="svelte-1230iaq">Verification Center</h1> <p class="page-description svelte-1230iaq">Use our comprehensive verification tools to check the legitimacy of companies, domains, phone numbers, and email addresses. 
			Protect yourself from scams and fraud with real-time verification.</p></div> <div class="verification-container svelte-1230iaq"><div class="verification-main svelte-1230iaq">`);
  VerificationForm($$renderer);
  $$renderer.push(`<!----> `);
  DocumentUpload($$renderer);
  $$renderer.push(`<!----></div> <div class="verification-sidebar svelte-1230iaq"><div class="info-card svelte-1230iaq"><h3 class="svelte-1230iaq">🔍 How Verification Works</h3> <ul class="svelte-1230iaq"><li class="svelte-1230iaq"><strong>Business Registry:</strong> Check official company registrations and status</li> <li class="svelte-1230iaq"><strong>Domain Analysis:</strong> Verify website legitimacy and security certificates</li> <li class="svelte-1230iaq"><strong>Phone Verification:</strong> Identify carrier, location, and spam reports</li> <li class="svelte-1230iaq"><strong>Email Validation:</strong> Check domain reputation and authentication records</li></ul></div> <div class="info-card svelte-1230iaq"><h3 class="svelte-1230iaq">⚡ Quick Tips</h3> <ul class="svelte-1230iaq"><li class="svelte-1230iaq">Always verify before sharing personal information</li> <li class="svelte-1230iaq">Check multiple sources for important decisions</li> <li class="svelte-1230iaq">Report suspicious entities to help the community</li> <li class="svelte-1230iaq">Trust your instincts - if something feels wrong, investigate further</li></ul></div> <div class="info-card svelte-1230iaq"><h3 class="svelte-1230iaq">📊 Verification Stats</h3> <div class="stats-mini svelte-1230iaq"><div class="stat-mini svelte-1230iaq"><div class="stat-number svelte-1230iaq">98.7%</div> <div class="stat-label svelte-1230iaq">Accuracy Rate</div></div> <div class="stat-mini svelte-1230iaq"><div class="stat-number svelte-1230iaq">&lt;2s</div> <div class="stat-label svelte-1230iaq">Average Response</div></div> <div class="stat-mini svelte-1230iaq"><div class="stat-number svelte-1230iaq">24/7</div> <div class="stat-label svelte-1230iaq">Availability</div></div></div></div></div></div></div>`);
}
export {
  _page as default
};
