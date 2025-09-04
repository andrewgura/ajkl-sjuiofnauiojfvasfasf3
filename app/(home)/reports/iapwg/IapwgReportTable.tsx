"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface ReportItem {
    type: string;
    description: string;
    count: number;
}

interface IapwgReportTableProps {
    data: ReportItem[];
}

const IapwgReportTable = ({ data }: IapwgReportTableProps) => {
    // Sort data by count in descending order
    const sortedData = [...data].sort((a, b) => b.count - a.count);

    return (
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4">
            <h2 className="text-sm font-medium text-gray-900 mb-4">
                Detailed Statistics
            </h2>
            <div className="overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead className="w-48 font-medium">Waiver Type</TableHead>
                            <TableHead className="font-medium">Description</TableHead>
                            <TableHead className="w-32 text-right font-medium">
                                Count
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedData.map((row) => (
                            <TableRow key={row.type} className="hover:bg-gray-50 border-b border-gray-100">
                                <TableCell className="font-medium text-blue-700">{row.type}</TableCell>
                                <TableCell className="text-gray-700">{row.description}</TableCell>
                                <TableCell className="text-right font-bold">
                                    {row.count}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default IapwgReportTable;