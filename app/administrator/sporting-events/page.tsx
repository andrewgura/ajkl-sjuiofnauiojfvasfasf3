import PageRootContainer from "@/components/shared/PageRootContainer";
import SportingEventsClient from "./SportingEventsClient";

// TODO: Get sporting events data from database
const getSportingEventsData = async () => {
    return [
        {
            id: 1,
            purpose: "NFL Football Game",
            sport: "NFL",
            createdOn: "Jan 15, 2024",
            createdBy: "Sys Admin",
            updatedOn: "Jan 15, 2024",
            updatedBy: "Sys Admin",
            active: true,
        },
        {
            id: 2,
            purpose: "NCAA Football Game",
            sport: "NCAA",
            createdOn: "Jan 15, 2024",
            createdBy: "Sys Admin",
            updatedOn: "Jan 15, 2024",
            updatedBy: "Sys Admin",
            active: true,
        },
        {
            id: 3,
            purpose: "MLB Game",
            sport: "MLB",
            createdOn: "Jan 15, 2024",
            createdBy: "Sys Admin",
            updatedOn: "Jan 15, 2024",
            updatedBy: "Sys Admin",
            active: true,
        },
        {
            id: 4,
            purpose: "NASCAR Event",
            sport: "NASCAR",
            createdOn: "Jan 15, 2024",
            createdBy: "Sys Admin",
            updatedOn: "Jan 15, 2024",
            updatedBy: "Sys Admin",
            active: true,
        },
        {
            id: 5,
            purpose: "INDY Racing League",
            sport: "IndyCar",
            createdOn: "Jan 15, 2024",
            createdBy: "Sys Admin",
            updatedOn: "Jan 15, 2024",
            updatedBy: "Sys Admin",
            active: true,
        },
    ];
};

export default async function SportingEventsPage() {
    const sportingEventsData = await getSportingEventsData();

    return (
        <PageRootContainer
            title="Sporting Events"
            subTitle="Add and manage purposes for sporting events. Active purposes will be available for selection when creating new events."
        >
            <SportingEventsClient initialData={sportingEventsData} />
        </PageRootContainer>
    );
}