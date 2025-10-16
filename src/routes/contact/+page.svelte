<script lang="ts">
	let formData = $state({
		name: '',
		email: '',
		company: '',
		phone: '',
		subject: '',
		message: ''
	});

	let submitted = $state(false);
	let error = $state('');
	let submitting = $state(false);

	async function handleSubmit(e: Event) {
		e.preventDefault();
		error = '';
		submitting = true;

		// Validation
		if (!formData.name || !formData.email || !formData.message) {
			error = 'Please fill in all required fields';
			submitting = false;
			return;
		}

		if (!formData.email.includes('@')) {
			error = 'Please enter a valid email address';
			submitting = false;
			return;
		}

		try {
			// Simulate API call
			await new Promise(resolve => setTimeout(resolve, 1500));

			// Store in localStorage
			const contacts = JSON.parse(localStorage.getItem('checkme_contacts') || '[]');
			contacts.push({
				...formData,
				timestamp: new Date().toISOString()
			});
			localStorage.setItem('checkme_contacts', JSON.stringify(contacts));

			submitted = true;
			formData = {
				name: '',
				email: '',
				company: '',
				phone: '',
				subject: '',
				message: ''
			};
		} catch (err) {
			error = 'Something went wrong. Please try again.';
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Contact Us - CheckMe</title>
	<meta
		name="description"
		content="Get in touch with CheckMe. We're here to answer your questions about identity verification and fraud detection."
	/>
</svelte:head>

<div class="contact-page">
	<section class="contact-hero">
		<div class="container">
			<h1>Get in Touch</h1>
			<p>Have questions? We're here to help. Reach out to our team and we'll respond within 24 hours.</p>
		</div>
	</section>

	<section class="contact-content">
		<div class="container">
			<div class="contact-grid">
				<!-- Contact Form -->
				<div class="contact-form-section">
					<h2>Send Us a Message</h2>
					
					{#if submitted}
						<div class="success-message">
							<div class="success-icon">✅</div>
							<h3>Message Sent!</h3>
							<p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
							<button onclick={() => submitted = false} class="btn btn-secondary">
								Send Another Message
							</button>
						</div>
					{:else}
						<form onsubmit={handleSubmit} class="contact-form">
							<div class="form-row">
								<div class="form-group">
									<label for="name">Name *</label>
									<input
										type="text"
										id="name"
										bind:value={formData.name}
										placeholder="John Doe"
										required
									/>
								</div>
								<div class="form-group">
									<label for="email">Email *</label>
									<input
										type="email"
										id="email"
										bind:value={formData.email}
										placeholder="john@example.com"
										required
									/>
								</div>
							</div>

							<div class="form-row">
								<div class="form-group">
									<label for="company">Company</label>
									<input
										type="text"
										id="company"
										bind:value={formData.company}
										placeholder="Your Company"
									/>
								</div>
								<div class="form-group">
									<label for="phone">Phone</label>
									<input
										type="tel"
										id="phone"
										bind:value={formData.phone}
										placeholder="+1 (555) 123-4567"
									/>
								</div>
							</div>

							<div class="form-group">
								<label for="subject">Subject</label>
								<select id="subject" bind:value={formData.subject}>
									<option value="">Select a subject</option>
									<option value="general">General Inquiry</option>
									<option value="sales">Sales & Pricing</option>
									<option value="support">Technical Support</option>
									<option value="partnership">Partnership Opportunities</option>
									<option value="investment">Investment Inquiry</option>
									<option value="other">Other</option>
								</select>
							</div>

							<div class="form-group">
								<label for="message">Message *</label>
								<textarea
									id="message"
									bind:value={formData.message}
									placeholder="Tell us how we can help..."
									rows="6"
									required
								></textarea>
							</div>

							{#if error}
								<div class="alert alert-danger">{error}</div>
							{/if}

							<button type="submit" class="btn btn-primary btn-lg" disabled={submitting}>
								{#if submitting}
									<span class="loading"></span>
									Sending...
								{:else}
									📧 Send Message
								{/if}
							</button>
						</form>
					{/if}
				</div>

				<!-- Contact Information -->
				<div class="contact-info-section">
					<h2>Contact Information</h2>
					
					<div class="info-card">
						<div class="info-icon">📧</div>
						<div class="info-content">
							<h3>Email</h3>
							<a href="mailto:hunter@checkme.com">hunter@checkme.com</a>
							<p>We'll respond within 24 hours</p>
						</div>
					</div>

					<div class="info-card">
						<div class="info-icon">📞</div>
						<div class="info-content">
							<h3>Phone</h3>
							<a href="tel:+15551234567">+1 (555) 123-4567</a>
							<p>Mon-Fri, 9AM-6PM EST</p>
						</div>
					</div>

					<div class="info-card">
						<div class="info-icon">🌐</div>
						<div class="info-content">
							<h3>Social Media</h3>
							<div class="social-links">
								<a href="https://github.com/TrillionUnicorn/CheckMe" target="_blank" rel="noopener">GitHub</a>
								<a href="https://linkedin.com/company/checkme" target="_blank" rel="noopener">LinkedIn</a>
								<a href="https://twitter.com/checkme" target="_blank" rel="noopener">Twitter</a>
							</div>
						</div>
					</div>

					<div class="info-card">
						<div class="info-icon">⏰</div>
						<div class="info-content">
							<h3>Response Time</h3>
							<p><strong>General Inquiries:</strong> Within 24 hours</p>
							<p><strong>Sales:</strong> Within 4 hours</p>
							<p><strong>Support:</strong> Within 2 hours</p>
						</div>
					</div>

					<div class="info-card">
						<div class="info-icon">🏢</div>
						<div class="info-content">
							<h3>Headquarters</h3>
							<p>San Francisco, CA</p>
							<p>United States</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="faq-section">
		<div class="container">
			<h2>Frequently Asked Questions</h2>
			<div class="faq-grid">
				<div class="faq-item">
					<h3>How quickly can I get started?</h3>
					<p>You can start verifying identities immediately after signing up. Our API is ready to use in minutes.</p>
				</div>
				<div class="faq-item">
					<h3>What's your pricing model?</h3>
					<p>We offer pay-per-use pricing starting at $0.10 per verification. Volume discounts available for enterprise customers.</p>
				</div>
				<div class="faq-item">
					<h3>Do you offer a free trial?</h3>
					<p>Yes! All new accounts get 1,000 free verifications per month to test our platform.</p>
				</div>
				<div class="faq-item">
					<h3>Is my data secure?</h3>
					<p>Absolutely. We're SOC 2 Type II certified and fully compliant with GDPR and CCPA regulations.</p>
				</div>
				<div class="faq-item">
					<h3>What countries do you support?</h3>
					<p>We currently support verification in 200+ countries with plans to expand to full global coverage.</p>
				</div>
				<div class="faq-item">
					<h3>Can I integrate with my existing system?</h3>
					<p>Yes! We offer RESTful APIs, SDKs for popular languages, and pre-built integrations for major platforms.</p>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.contact-page {
		background: #f8fafc;
	}

	.contact-hero {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		padding: 6rem 2rem 4rem;
		text-align: center;
	}

	.contact-hero h1 {
		font-size: clamp(2.5rem, 6vw, 4rem);
		font-weight: 900;
		margin-bottom: 1rem;
	}

	.contact-hero p {
		font-size: clamp(1.1rem, 2vw, 1.5rem);
		opacity: 0.95;
		max-width: 700px;
		margin: 0 auto;
	}

	.contact-content {
		padding: 4rem 2rem;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.contact-grid {
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 3rem;
	}

	.contact-form-section,
	.contact-info-section {
		background: white;
		padding: 3rem 2.5rem;
		border-radius: 1rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
	}

	.contact-form-section h2,
	.contact-info-section h2 {
		font-size: 2rem;
		font-weight: 700;
		margin-bottom: 2rem;
		color: #1e293b;
	}

	.contact-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.form-group label {
		font-weight: 600;
		color: #475569;
		font-size: 0.95rem;
	}

	.form-group input,
	.form-group select,
	.form-group textarea {
		padding: 0.875rem 1rem;
		border: 2px solid #e2e8f0;
		border-radius: 0.5rem;
		font-size: 1rem;
		font-family: inherit;
		transition: all 0.3s;
	}

	.form-group input:focus,
	.form-group select:focus,
	.form-group textarea:focus {
		outline: none;
		border-color: #3b82f6;
		box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
	}

	.form-group textarea {
		resize: vertical;
		min-height: 120px;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem 1.5rem;
		border-radius: 0.5rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.3s;
		cursor: pointer;
		border: none;
		font-size: 1rem;
	}

	.btn-lg {
		padding: 1rem 2rem;
		font-size: 1.1rem;
	}

	.btn-primary {
		background: linear-gradient(135deg, #3b82f6, #2563eb);
		color: white;
		box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
	}

	.btn-primary:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
	}

	.btn-primary:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	.btn-secondary {
		background: transparent;
		color: #3b82f6;
		border: 2px solid #3b82f6;
	}

	.btn-secondary:hover {
		background: #3b82f6;
		color: white;
	}

	.loading {
		display: inline-block;
		width: 1rem;
		height: 1rem;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
		margin-right: 0.5rem;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.success-message {
		padding: 3rem 2rem;
		background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
		border-radius: 1rem;
		text-align: center;
	}

	.success-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.success-message h3 {
		font-size: 2rem;
		font-weight: 700;
		color: #166534;
		margin-bottom: 0.5rem;
	}

	.success-message p {
		font-size: 1.1rem;
		color: #15803d;
		margin-bottom: 2rem;
	}

	.alert {
		padding: 1rem;
		border-radius: 0.5rem;
		margin-bottom: 1rem;
	}

	.alert-danger {
		background: #fee2e2;
		color: #991b1b;
		border: 1px solid #fecaca;
	}

	.info-card {
		display: flex;
		gap: 1.5rem;
		padding: 1.5rem;
		background: #f8fafc;
		border-radius: 0.75rem;
		margin-bottom: 1.5rem;
		border: 1px solid #e2e8f0;
	}

	.info-icon {
		font-size: 2.5rem;
		flex-shrink: 0;
	}

	.info-content h3 {
		font-size: 1.2rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: #1e293b;
	}

	.info-content a {
		color: #3b82f6;
		text-decoration: none;
		font-weight: 600;
		display: block;
		margin-bottom: 0.25rem;
	}

	.info-content a:hover {
		text-decoration: underline;
	}

	.info-content p {
		color: #64748b;
		font-size: 0.95rem;
		margin: 0.25rem 0;
	}

	.social-links {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
	}

	.faq-section {
		padding: 4rem 2rem;
		background: white;
	}

	.faq-section h2 {
		font-size: 2.5rem;
		font-weight: 800;
		text-align: center;
		margin-bottom: 3rem;
		color: #1e293b;
	}

	.faq-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 2rem;
	}

	.faq-item {
		padding: 2rem;
		background: #f8fafc;
		border-radius: 0.75rem;
		border: 1px solid #e2e8f0;
	}

	.faq-item h3 {
		font-size: 1.2rem;
		font-weight: 700;
		margin-bottom: 0.75rem;
		color: #1e293b;
	}

	.faq-item p {
		color: #64748b;
		line-height: 1.6;
	}

	@media (max-width: 768px) {
		.contact-grid {
			grid-template-columns: 1fr;
		}

		.form-row {
			grid-template-columns: 1fr;
		}

		.contact-form-section,
		.contact-info-section {
			padding: 2rem 1.5rem;
		}

		.faq-grid {
			grid-template-columns: 1fr;
		}
	}
</style>

