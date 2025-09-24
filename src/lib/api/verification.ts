// Mock verification API - In production, this would connect to the Encore backend

interface VerificationResult {
	status: 'verified' | 'warning' | 'failed';
	confidence: number;
	details: Record<string, any>;
	warnings?: string[];
	recommendations?: string[];
	timestamp: string;
}

// Mock data for different verification types
const mockCompanyData = {
	'Apple Inc': {
		status: 'verified' as const,
		confidence: 98,
		details: {
			registrationNumber: 'C0806592',
			registeredName: 'Apple Inc.',
			status: 'Active',
			incorporationDate: '1977-01-03',
			address: '1 Apple Park Way, Cupertino, CA 95014',
			industry: 'Technology',
			employees: '164,000+',
			website: 'apple.com'
		},
		recommendations: [
			'This is a legitimate, well-established company',
			'Always verify official communication through their official website'
		]
	},
	'Scam Corp Ltd': {
		status: 'failed' as const,
		confidence: 15,
		details: {
			registrationNumber: 'Not found',
			registeredName: 'No official registration',
			status: 'Unregistered',
			warnings: 'Multiple fraud reports'
		},
		warnings: [
			'This company has been reported for fraudulent activities',
			'No official business registration found',
			'Multiple consumer complaints filed'
		],
		recommendations: [
			'Avoid any financial transactions with this entity',
			'Report suspicious activity to authorities',
			'Verify through official business registries'
		]
	}
};

const mockDomainData = {
	'apple.com': {
		status: 'verified' as const,
		confidence: 99,
		details: {
			domain: 'apple.com',
			registrar: 'CSC Corporate Domains, Inc.',
			registrationDate: '1987-02-19',
			expirationDate: '2025-02-20',
			nameservers: 'apple.com nameservers',
			sslCertificate: 'Valid (Apple Inc.)',
			reputation: 'Excellent',
			category: 'Technology/Electronics'
		}
	},
	'suspicious-site.com': {
		status: 'warning' as const,
		confidence: 35,
		details: {
			domain: 'suspicious-site.com',
			registrar: 'Unknown',
			registrationDate: '2024-01-15',
			expirationDate: '2024-12-15',
			sslCertificate: 'Self-signed',
			reputation: 'Poor',
			category: 'Unknown'
		},
		warnings: [
			'Recently registered domain (less than 1 year old)',
			'Self-signed SSL certificate',
			'Poor reputation score',
			'Similar to known phishing domains'
		],
		recommendations: [
			'Exercise extreme caution when visiting this site',
			'Do not enter personal or financial information',
			'Verify the legitimacy through other channels'
		]
	}
};

const mockPhoneData = {
	'+1-800-275-2273': {
		status: 'verified' as const,
		confidence: 95,
		details: {
			number: '+1-800-275-2273',
			carrier: 'Apple Inc.',
			type: 'Toll-free',
			location: 'United States',
			purpose: 'Apple Support',
			verified: 'Official business line'
		}
	},
	'+1-555-123-4567': {
		status: 'warning' as const,
		confidence: 25,
		details: {
			number: '+1-555-123-4567',
			carrier: 'Unknown',
			type: 'Mobile',
			location: 'United States',
			purpose: 'Unknown'
		},
		warnings: [
			'Number reported in spam databases',
			'Associated with telemarketing calls',
			'No verified business association'
		],
		recommendations: [
			'Be cautious of unsolicited calls from this number',
			'Do not provide personal information',
			'Consider blocking if receiving unwanted calls'
		]
	}
};

const mockEmailData = {
	'support@apple.com': {
		status: 'verified' as const,
		confidence: 99,
		details: {
			email: 'support@apple.com',
			domain: 'apple.com',
			domainReputation: 'Excellent',
			spfRecord: 'Valid',
			dkimRecord: 'Valid',
			dmarcPolicy: 'Strict',
			businessVerified: 'Apple Inc.'
		}
	},
	'noreply@suspicious-bank.com': {
		status: 'failed' as const,
		confidence: 10,
		details: {
			email: 'noreply@suspicious-bank.com',
			domain: 'suspicious-bank.com',
			domainReputation: 'Poor',
			spfRecord: 'Missing',
			dkimRecord: 'Invalid',
			dmarcPolicy: 'None'
		},
		warnings: [
			'Domain has poor reputation',
			'Missing proper email authentication',
			'Similar to known phishing domains',
			'Not associated with legitimate financial institution'
		],
		recommendations: [
			'Do not click any links in emails from this address',
			'Do not provide personal or financial information',
			'Report as phishing if received unsolicited'
		]
	}
};

function simulateNetworkDelay(): Promise<void> {
	return new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
}

function findBestMatch(input: string, dataSet: Record<string, any>): any | null {
	const normalizedInput = input.toLowerCase().trim();
	
	// Exact match
	for (const [key, value] of Object.entries(dataSet)) {
		if (key.toLowerCase() === normalizedInput) {
			return value;
		}
	}
	
	// Partial match
	for (const [key, value] of Object.entries(dataSet)) {
		if (key.toLowerCase().includes(normalizedInput) || normalizedInput.includes(key.toLowerCase())) {
			return value;
		}
	}
	
	return null;
}

function generateGenericResult(type: string, input: string): VerificationResult {
	const confidence = Math.floor(Math.random() * 40) + 30; // 30-70%
	const isWarning = confidence < 50;
	
	return {
		status: isWarning ? 'warning' : 'verified',
		confidence,
		details: {
			[type]: input,
			status: isWarning ? 'Unverified' : 'Verified',
			lastChecked: new Date().toISOString(),
			source: 'Community database'
		},
		warnings: isWarning ? [
			'Limited information available',
			'Not found in major verification databases',
			'Proceed with caution'
		] : undefined,
		recommendations: [
			'Cross-reference with other verification sources',
			'Exercise normal caution in business dealings',
			'Report any suspicious activity'
		],
		timestamp: new Date().toISOString()
	};
}

export const verificationAPI = {
	async verify(type: string, input: string): Promise<VerificationResult> {
		await simulateNetworkDelay();
		
		let result: VerificationResult | null = null;
		
		switch (type) {
			case 'company':
				result = findBestMatch(input, mockCompanyData);
				break;
			case 'domain':
				result = findBestMatch(input, mockDomainData);
				break;
			case 'phone':
				result = findBestMatch(input, mockPhoneData);
				break;
			case 'email':
				result = findBestMatch(input, mockEmailData);
				break;
		}
		
		if (!result) {
			result = generateGenericResult(type, input);
		}
		
		return {
			...result,
			timestamp: new Date().toISOString()
		};
	}
};
