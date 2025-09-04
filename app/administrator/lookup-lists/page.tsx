import PageRootContainer from "@/components/shared/PageRootContainer";
import LookupListsClient from "./LookupListsClient";

// TODO:
// * probably don't need pagination for getting data
// * Countries -> Get all items, Edit, Delete, Add actions
// * FBO -> Get all items, Edit, Delete, Add actions
// * Sporting Events -> Get all items, Edit, Delete, Add actions
// * Sporting Venues -> Get all items, Edit, Delete, Add actions
// * US States -> Get all items, Edit, Delete, Add actions\

export default function Page() {
    return (
        <PageRootContainer
            title="Lookup Lists"
            subTitle="Manage configuration lists for the application"
        >
            <LookupListsClient />
        </PageRootContainer>
    );
}