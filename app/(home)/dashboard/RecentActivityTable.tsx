import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { RecentActivityTableProps } from "./types";
import EmptyTableState from "@/components/shared/EmptyTableState";
import { classes } from "@/utils/classes";

export default function RecentActivityTable({ recentActivity }: RecentActivityTableProps) {
    const getStatusStyles = (status: string) => {
        const baseStyles = "transition-colors duration-200";

        switch (status?.toUpperCase()) {
            case "PROCESSING":
                return {
                    row: `${baseStyles} bg-yellow-50 hover:bg-yellow-100`,
                    text: "text-yellow-700",
                };
            case "ACCEPTED":
                return {
                    row: `${baseStyles} bg-green-50 hover:bg-green-100`,
                    text: "text-green-700",
                };
            default:
                return {
                    row: `${baseStyles} hover:bg-gray-50`,
                    text: "text-gray-700",
                };
        }
    };

    return (
        <div className={classes("bg-white rounded-lg shadow-sm border border-gray-200 p-2",
            recentActivity.length === 0 && "h-[175px]"
        )}>
            <h2 className="text-base font-semibold text-gray-900 mb-1">
                Recent Activity
            </h2>
            {recentActivity.length === 0 ? (
                <div className="flex items-center justify-center">
                    <EmptyTableState
                        title="No recent activity"
                        message="There is no recent activity to display at this time."
                        containerClassName="py-3 text-center"
                        iconContainerClassName="inline-flex justify-center items-center w-10 h-10 rounded-full bg-blue-50 mb-2"
                        iconClassName="w-5 h-5 text-blue-500"
                        titleClassName="text-sm font-medium text-slate-900 mb-1"
                        messageClassName="text-xs text-slate-500 max-w-md mx-auto"
                    />
                </div>
            ) : (
                <div className="overflow-hidden rounded-lg border border-gray-200">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/75">
                                <TableCell className="py-1 px-3 text-xs font-semibold text-gray-600">
                                    Confirmation #
                                </TableCell>
                                <TableCell className="py-1 px-3 text-xs font-semibold text-gray-600">
                                    Status
                                </TableCell>
                                <TableCell className="py-1 px-3 text-xs font-semibold text-gray-600">
                                    Waiver Type
                                </TableCell>
                                <TableCell className="py-1 px-3 text-xs font-semibold text-gray-600">
                                    Changed
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentActivity.map((request) => {
                                const statusStyles = getStatusStyles(request.status);
                                return (
                                    <TableRow key={request.id} className={statusStyles.row}>
                                        <TableCell className="py-1 px-3">
                                            <span className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm font-medium">
                                                {request.id}
                                            </span>
                                        </TableCell>
                                        <TableCell
                                            className={`py-1 px-3 text-sm font-medium ${statusStyles.text}`}
                                        >
                                            {request.status}
                                        </TableCell>
                                        <TableCell className={`py-1 px-3 text-sm font-medium`}>
                                            {request.type}
                                        </TableCell>
                                        <TableCell className="py-1 px-3 text-sm text-gray-600">
                                            {request.applicationDate || "-"}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}