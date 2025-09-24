// Mock reports API - In production, this would connect to the Encore backend

interface CommunityReport {
	id: string;
	type: 'company' | 'domain' | 'phone' | 'email';
	target: string;
	status: 'verified' | 'warning' | 'scam';
	description: string;
	timestamp: string;
	upvotes: number;
	downvotes: number;
	reporter: {
		id: string;
		reputation: number;
		verified: boolean;
	};
}

// Mock community reports data
const mockReports: CommunityReport[] = [
	{
		id: 'report-001',
		type: 'domain',
		target: 'fake-apple-store.com',
		status: 'scam',
		description: 'Phishing site impersonating Apple Store. Steals credit card information during fake purchases.',
		timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
		upvotes: 23,
		downvotes: 1,
		reporter: {
			id: 'user-security-expert',
			reputation: 95,
			verified: true
		}
	},
	{
		id: 'report-002',
		type: 'phone',
		target: '+1-555-SCAM-123',
		status: 'scam',
		description: 'Robocall claiming to be from IRS demanding immediate payment. Threatens arrest if not paid.',
		timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
		upvotes: 18,
		downvotes: 0,
		reporter: {
			id: 'user-concerned-citizen',
			reputation: 78,
			verified: true
		}
	},
	{
		id: 'report-003',
		type: 'company',
		target: 'TechSolutions Pro LLC',
		status: 'verified',
		description: 'Legitimate IT consulting company. Provided excellent service for our office network setup.',
		timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
		upvotes: 12,
		downvotes: 0,
		reporter: {
			id: 'user-business-owner',
			reputation: 88,
			verified: true
		}
	},
	{
		id: 'report-004',
		type: 'email',
		target: 'winner@lottery-scam.org',
		status: 'scam',
		description: 'Lottery scam email claiming I won $500,000. Asks for personal information and bank details.',
		timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
		upvotes: 31,
		downvotes: 2,
		reporter: {
			id: 'user-vigilant-user',
			reputation: 72,
			verified: false
		}
	},
	{
		id: 'report-005',
		type: 'domain',
		target: 'microsoft-security-alert.net',
		status: 'warning',
		description: 'Suspicious domain with pop-ups claiming computer is infected. Pushes fake antivirus software.',
		timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
		upvotes: 15,
		downvotes: 1,
		reporter: {
			id: 'user-tech-savvy',
			reputation: 91,
			verified: true
		}
	},
	{
		id: 'report-006',
		type: 'company',
		target: 'Green Energy Solutions Inc',
		status: 'warning',
		description: 'Door-to-door sales with high-pressure tactics. Claims about energy savings seem exaggerated.',
		timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
		upvotes: 8,
		downvotes: 3,
		reporter: {
			id: 'user-homeowner',
			reputation: 65,
			verified: false
		}
	},
	{
		id: 'report-007',
		type: 'phone',
		target: '+1-800-SUPPORT',
		status: 'verified',
		description: 'Legitimate customer support line for major telecommunications company. Helpful and professional.',
		timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
		upvotes: 7,
		downvotes: 0,
		reporter: {
			id: 'user-satisfied-customer',
			reputation: 82,
			verified: true
		}
	},
	{
		id: 'report-008',
		type: 'email',
		target: 'support@legitimate-bank.com',
		status: 'verified',
		description: 'Official support email from my bank. Responded quickly to account inquiry with proper verification.',
		timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
		upvotes: 5,
		downvotes: 0,
		reporter: {
			id: 'user-bank-customer',
			reputation: 76,
			verified: true
		}
	},
	{
		id: 'report-009',
		type: 'domain',
		target: 'crypto-investment-scam.biz',
		status: 'scam',
		description: 'Cryptocurrency investment scam promising 500% returns. Lost $2,000 before realizing it was fake.',
		timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(), // 18 hours ago
		upvotes: 42,
		downvotes: 0,
		reporter: {
			id: 'user-victim',
			reputation: 45,
			verified: false
		}
	},
	{
		id: 'report-010',
		type: 'phone',
		target: '+1-555-CHARITY',
		status: 'warning',
		description: 'Charity solicitation call. Legitimate cause but very aggressive tactics and unclear about fund usage.',
		timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
		upvotes: 6,
		downvotes: 2,
		reporter: {
			id: 'user-donor',
			reputation: 69,
			verified: false
		}
	}
];

function simulateNetworkDelay(): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
}

export const reportsAPI = {
	async getRecent(limit: number = 10): Promise<CommunityReport[]> {
		await simulateNetworkDelay();
		
		// Sort by timestamp (most recent first) and limit results
		return mockReports
			.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
			.slice(0, limit);
	},

	async getByType(type: string, limit: number = 20): Promise<CommunityReport[]> {
		await simulateNetworkDelay();
		
		return mockReports
			.filter(report => report.type === type)
			.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
			.slice(0, limit);
	},

	async getByStatus(status: string, limit: number = 20): Promise<CommunityReport[]> {
		await simulateNetworkDelay();
		
		return mockReports
			.filter(report => report.status === status)
			.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
			.slice(0, limit);
	},

	async search(query: string, limit: number = 20): Promise<CommunityReport[]> {
		await simulateNetworkDelay();
		
		const normalizedQuery = query.toLowerCase().trim();
		
		return mockReports
			.filter(report => 
				report.target.toLowerCase().includes(normalizedQuery) ||
				report.description.toLowerCase().includes(normalizedQuery)
			)
			.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
			.slice(0, limit);
	},

	async submitReport(report: Omit<CommunityReport, 'id' | 'timestamp' | 'upvotes' | 'downvotes' | 'reporter'>): Promise<CommunityReport> {
		await simulateNetworkDelay();
		
		const newReport: CommunityReport = {
			...report,
			id: `report-${Date.now()}`,
			timestamp: new Date().toISOString(),
			upvotes: 0,
			downvotes: 0,
			reporter: {
				id: 'current-user',
				reputation: 75,
				verified: true
			}
		};
		
		// In a real app, this would be sent to the backend
		mockReports.unshift(newReport);
		
		return newReport;
	},

	async voteOnReport(reportId: string, vote: 'up' | 'down'): Promise<void> {
		await simulateNetworkDelay();
		
		const report = mockReports.find(r => r.id === reportId);
		if (report) {
			if (vote === 'up') {
				report.upvotes++;
			} else {
				report.downvotes++;
			}
		}
	}
};
