import PageRootContainer from "@/components/shared/PageRootContainer"; import { UasReportData, UasWaiver, WAIVER_SUBTYPES } from "./types";
import UASReportClient from "./UASReportClient";
;

// TODO: Get results from DB, update filters, download CSV

// test data
const generateDummyData = (): UasReportData => {
  const companyNames = [
    "Skyward Ventures",
    "AeroGlide Solutions",
    "CloudSprint Aviation",
    "Horizon Wings",
    "FlightForge Inc.",
    "Nimbus AeroTech",
    "Altair Airworks",
  ];

  const generateContact = () => {
    const firstNames = [
      "James", "Emma", "Michael", "Sarah", "David", "Lisa", "Robert", "Amanda",
    ];
    const lastNames = [
      "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    ];
    const phone = `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100
      }-${Math.floor(Math.random() * 9000) + 1000}`;
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return {
      firstName,
      lastName,
      phone,
      fullContact: `${firstName} ${lastName} - ${phone}`,
    };
  };

  const waivers: UasWaiver[] = Array.from({ length: 50 }, (_, i) => {
    const contact = generateContact();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 90) + 30);

    return {
      id: `${i + 1}`,
      confirmation: Math.floor(Math.random() * 900000) + 100000,
      waiverId: `2025-ABCDEF-${(i + 1).toString().padStart(3, "0")}`,
      startDate,
      endDate,
      waiverType: Math.random() > 0.3 ? "UAS" : "SPT",
      waiverSubtype: WAIVER_SUBTYPES[Math.floor(Math.random() * WAIVER_SUBTYPES.length)],
      uasOperator: companyNames[Math.floor(Math.random() * companyNames.length)],
      contact: contact.fullContact,
      operatorLastName: contact.lastName,
    };
  });

  return { waivers };
};

export default function UASReport() {
  const initialData = generateDummyData();

  return (
    <PageRootContainer
      title="UAS Active Report"
      subTitle="View active UAS and UAS Sporting waivers within their effective date range"
    >
      <UASReportClient initialData={initialData} />
    </PageRootContainer>
  );
}