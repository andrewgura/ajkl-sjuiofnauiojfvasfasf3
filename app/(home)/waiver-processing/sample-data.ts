import { User, Waiver } from "./types";

const getDateString = (daysAgo: number) => {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date.toISOString();
};

export const users: User[] = [
    {
        id: 1,
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
        assignedWaivers: 4,
        role: "Analyst"
    },
    {
        id: 2,
        firstName: "Emily",
        lastName: "Johnson",
        email: "emily.johnson@example.com",
        assignedWaivers: 6,
        role: "Analyst"
    },
    {
        id: 3,
        firstName: "David",
        lastName: "Williams",
        email: "david.williams@example.com",
        assignedWaivers: 2,
        role: "Analyst"
    },
    {
        id: 4,
        firstName: "Sarah",
        lastName: "Davis",
        email: "sarah.davis@example.com",
        assignedWaivers: 3,
        role: "Analyst"
    },
    {
        id: 5,
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@example.com",
        assignedWaivers: 5,
        role: "Analyst"
    }
];

// TSA waivers
export const sampleWaivers: Waiver[] = [
    {
        id: "WAV-2024-0001",
        confirmation: 12345,
        company: "Acme Corp",
        currentAssignee: "-",
        status: "IAPWG REVIEW",
        createdAt: getDateString(30),
        lastUpdated: getDateString(3),
        startDate: getDateString(20)
    },
    {
        id: "WAV-2024-0002",
        confirmation: 12346,
        company: "TechSolutions Inc",
        currentAssignee: "John Smith",
        status: "TSA ASSIGNED",
        createdAt: getDateString(28),
        lastUpdated: getDateString(1),
        startDate: getDateString(25)
    },
    {
        id: "WAV-2024-0003",
        confirmation: 12347,
        company: "Global Industries",
        currentAssignee: "-",
        status: "VETTED",
        createdAt: getDateString(25),
        lastUpdated: getDateString(5),
        startDate: getDateString(15)
    },
    {
        id: "WAV-2024-0004",
        confirmation: 12348,
        company: "NextGen Services",
        currentAssignee: "Emily Johnson",
        status: "IAPWG REVIEW",
        createdAt: getDateString(24),
        lastUpdated: getDateString(2),
        startDate: getDateString(20)
    },
    {
        id: "WAV-2024-0005",
        confirmation: 12349,
        company: "Innovative Systems",
        currentAssignee: "-",
        status: "VET REJECTED",
        createdAt: getDateString(22),
        lastUpdated: getDateString(6),
        startDate: getDateString(18)
    },
    // Adding a stale waiver (last updated > 7 days ago)
    {
        id: "WAV-2024-0006",
        confirmation: 12350,
        company: "Stale Corp",
        currentAssignee: "David Williams",
        status: "READY FOR FAA CERTIFICATION",
        createdAt: getDateString(35),
        lastUpdated: getDateString(15), // 15 days ago
        startDate: getDateString(30)
    }
];

// FAA waivers
export const faaWaivers: Waiver[] = [
    {
        id: "WAV-2024-0007",
        confirmation: 12351,
        company: "Skyline Aviation",
        currentAssignee: "Sarah Davis",
        status: "FAA PENDING",
        createdAt: getDateString(20),
        lastUpdated: getDateString(4),
        startDate: getDateString(15)
    },
    {
        id: "WAV-2024-0008",
        confirmation: 12352,
        company: "First Air",
        currentAssignee: "John Smith",
        status: "READY FOR FAA CERTIFICATION",
        createdAt: getDateString(19),
        lastUpdated: getDateString(2),
        startDate: getDateString(12)
    },
    {
        id: "WAV-2024-0009",
        confirmation: 12353,
        company: "Liberty Airlines",
        currentAssignee: "Emily Johnson",
        status: "FAA PENDING",
        createdAt: getDateString(18),
        lastUpdated: getDateString(1),
        startDate: getDateString(10)
    },
    {
        id: "WAV-2024-0010",
        confirmation: 12354,
        company: "Azure Airways",
        currentAssignee: "Michael Brown",
        status: "FAA REJECTED",
        createdAt: getDateString(16),
        lastUpdated: getDateString(9), // 9 days ago - almost stale
        startDate: getDateString(8)
    }
];

// Submitted waivers
export const submittedWaivers: Waiver[] = [
    {
        id: "WAV-2024-0011",
        confirmation: 12355,
        company: "Golden Air",
        currentAssignee: "David Williams",
        status: "TSA REJECTED",
        createdAt: getDateString(25),
        lastUpdated: getDateString(10),
        startDate: getDateString(18)
    },
    {
        id: "WAV-2024-0012",
        confirmation: 12356,
        company: "Silver Wings",
        currentAssignee: "Sarah Davis",
        status: "FAA REJECTED",
        createdAt: getDateString(24),
        lastUpdated: getDateString(12), // Stale
        startDate: getDateString(16)
    },
    {
        id: "WAV-2024-0013",
        confirmation: 12357,
        company: "Blue Skies Inc",
        currentAssignee: "John Smith",
        status: "DETERMINED",
        createdAt: getDateString(23),
        lastUpdated: getDateString(3),
        startDate: getDateString(14)
    },
    {
        id: "WAV-2024-0014",
        confirmation: 12358,
        company: "Global Flyers",
        currentAssignee: "Emily Johnson",
        status: "DASSP READY FOR CERTIFICATION",
        createdAt: getDateString(22),
        lastUpdated: getDateString(5),
        startDate: getDateString(12)
    }
];

// Completed waivers
export const completedWaivers: Waiver[] = [
    {
        id: "WAV-2024-0015",
        confirmation: 12359,
        company: "Mountain Airways",
        currentAssignee: "Michael Brown",
        status: "APPROVED",
        createdAt: getDateString(30),
        lastUpdated: getDateString(6),
        startDate: getDateString(20)
    },
    {
        id: "WAV-2024-0016",
        confirmation: 12360,
        company: "Valley Flights",
        currentAssignee: "David Williams",
        status: "TSA REJECTED",
        createdAt: getDateString(28),
        lastUpdated: getDateString(8),
        startDate: getDateString(18)
    },
    {
        id: "WAV-2024-0017",
        confirmation: 12361,
        company: "Coastal Aviation",
        currentAssignee: "Sarah Davis",
        status: "FAA REJECTED",
        createdAt: getDateString(26),
        lastUpdated: getDateString(15), // Stale
        startDate: getDateString(16)
    },
    {
        id: "WAV-2024-0018",
        confirmation: 12362,
        company: "Desert Airlines",
        currentAssignee: "John Smith",
        status: "APPROVED",
        createdAt: getDateString(25),
        lastUpdated: getDateString(4),
        startDate: getDateString(14)
    }
];