import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { formatDateFns } from "@/utils/date-utils";
import { AssignedWaiversTableProps } from "./types";
import EmptyTableState from "@/components/shared/EmptyTableState";
import { classes } from "@/utils/classes";

export default function AssignedWaiversTable({ assignedWaivers }: AssignedWaiversTableProps) {
    const getAssignedStatusStyles = (status: string) => {
        switch (status) {
            case "Determination":
                return "bg-blue-50 text-blue-700";
            case "QA":
                return "bg-purple-50 text-purple-700";
            case "Certification":
                return "bg-green-50 text-green-700";
            case "Needs to be sent":
                return "bg-yellow-50 text-yellow-700";
            case "Vetting":
                return "bg-rose-50 text-rose-700";
            case "Pending FAA Certification":
                return "bg-orange-50 text-orange-700";
            default:
                return "bg-gray-50 text-gray-700";
        }
    };

    return (
        <div className={classes("bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-2",
            assignedWaivers.length === 0 && "h-[200px]"
        )}>
            <div className="px-3 py-2 border-b border-gray-100">
                <h2 className="text-base font-semibold text-gray-900">
                    Assigned Waivers
                </h2>
                <p className="text-xs text-gray-500">
                    Current waivers assigned for processing
                </p>
            </div>
            {assignedWaivers.length === 0 ? (
                <div className="flex items-center justify-center">
                    <EmptyTableState
                        title="No assigned waivers"
                        message="There are currently no waivers assigned for processing."
                        containerClassName="py-4 text-center"
                        iconContainerClassName="inline-flex justify-center items-center w-12 h-12 rounded-full bg-blue-50 mb-2"
                        iconClassName="w-6 h-6 text-blue-500"
                        titleClassName="text-sm font-medium text-slate-900 mb-1"
                        messageClassName="text-xs text-slate-500 max-w-md mx-auto"
                    />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-50/75">
                                <TableHead className="py-1 px-3 text-xs font-semibold text-gray-600">
                                    Confirmation
                                </TableHead>
                                <TableHead className="py-1 px-3 text-xs font-semibold text-gray-600">
                                    Requires
                                </TableHead>
                                <TableHead className="py-1 px-3 text-xs font-semibold text-gray-600">
                                    Waiver ID
                                </TableHead>
                                <TableHead className="py-1 px-3 text-xs font-semibold text-gray-600">
                                    Company
                                </TableHead>
                                <TableHead className="py-1 px-3 text-xs font-semibold text-gray-600">
                                    Created at
                                </TableHead>
                                <TableHead className="py-1 px-3 text-xs font-semibold text-gray-600">
                                    Start Date
                                </TableHead>
                                <TableHead className="py-1 px-3 text-xs font-semibold text-gray-600">
                                    End Date
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assignedWaivers.map((row) => (
                                <TableRow key={row.id} className="hover:bg-gray-50/50">
                                    <TableCell className="py-1 px-3">
                                        <span className="text-blue-600 hover:text-blue-700 cursor-pointer text-sm font-medium">
                                            {row.confirmation}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-1 px-3">
                                        <span
                                            className={`text-xs inline-flex items-center rounded-full px-2 py-0.5 font-medium ${getAssignedStatusStyles(
                                                row.status
                                            )}`}
                                        >
                                            {row.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-1 px-3">
                                        <span className="text-xs font-medium text-gray-900">
                                            {row.id}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-1 px-3">
                                        <span className="text-sm text-gray-600">
                                            {row.company}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-1 px-3">
                                        <span className="text-xs text-gray-600">
                                            {formatDateFns(row.createdAt)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-1 px-3">
                                        <span className="text-xs text-gray-600">
                                            {formatDateFns(row.startDate)}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-1 px-3">
                                        <span className="text-xs text-gray-600">
                                            {formatDateFns(row.endDate)}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    )
}