// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";
import {
    SelectCell,
    SelectHeader,
} from "components/shared/table/SelectCheckbox";
import {
    DateCell,
    LeadIdCell,
    LeadNameCell,
    ContactNumberCell,
    SchoolNameCell,
    BranchNameCell,
    LeadSourceNameCell,
    LeadTypeNameCell,
    LeadStatusCell
} from "./rows";
import { orderStatusOptions } from "./data";

// ----------------------------------------------------------------------

const columnHelper = createColumnHelper();

export const columns = [
    columnHelper.display({
        id: "select",
        label: "Row Selection",
        header: SelectHeader,
        cell: SelectCell,
    }),
    columnHelper.accessor((row) => row.id, {
        id: "id",
        label: "Lead ID",
        header: "ID",
        cell: LeadIdCell,
    }),
   
    columnHelper.accessor((row) => row.leadName, {
        id: "LeadName",
        label: "Name",
        header: "Name",
        cell: LeadNameCell,
    }),
    columnHelper.accessor((row) => row.contactNumber, {
        id: "Contact",
        label: "Contact",
        header: "Contact",
        cell: ContactNumberCell,
    }), 
    columnHelper.accessor((row) => row.dateTime, {
        id: "dateTime",
        label: "Lead Date",
        header: "Lead Date",
        cell: DateCell,
        filter: "dateRange",
        filterFn: "inNumberRange",
    }),
    columnHelper.accessor((row) => row.schoolName, {
        id: "SchoolNameCell",
        label: "School",
        header: "School",
        cell: SchoolNameCell,
    }),
    columnHelper.accessor((row) => row.branchName, {
        id: "branchName",
        label: "Branch",
        header: "Branch",
        cell: BranchNameCell,
    }), 
    columnHelper.accessor((row) => row.leadSourceName, {
        id: "leadSourceName",
        label: "Source",
        header: "Source",
        cell: LeadSourceNameCell,
    }),
    columnHelper.accessor((row) => row.leadTypeName, {
        id: "leadTypeName",
        label: "Lead Type",
        header: "Lead Type",
        cell: LeadTypeNameCell,
    }),
    columnHelper.accessor((row) => row.statusName, {
        id: "Lead_status",
        label: "Lead Status",
        header: "Status",
        filter: "select",
        filterFn: "arrIncludesSome",
        cell: LeadStatusCell,
        options: orderStatusOptions,
    }),
    columnHelper.display({
        id: "actions",
        label: "Row Actions",
        header: "Actions",
        cell: RowActions
    }),
]
