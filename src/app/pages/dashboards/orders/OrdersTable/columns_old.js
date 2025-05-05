// Import Dependencies
import { createColumnHelper } from "@tanstack/react-table";

// Local Imports
import { RowActions } from "./RowActions";
import {
    SelectCell,
    SelectHeader,
} from "components/shared/table/SelectCheckbox";
import {
    AddressCell,
    CustomerCell,
    DateCell,
    OrderIdCell,
    OrderStatusCell,
    ProfitCell,
    TotalCell,
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
    columnHelper.accessor((row) => row.order_id, {
        id: "order_id",
        label: "Lead ID",
        header: "Lead",
        cell: OrderIdCell,
    }),
    columnHelper.accessor((row) => Number(row.created_at), {
        id: "created_at",
        label: "Order Date",
        header: "Date",
        cell: DateCell,
        filter: "dateRange",
        filterFn: "inNumberRange",
    }),
    columnHelper.accessor((row) => row.customer.name, {
        id: "customer",
        label: "Customer",
        header: "Customer",
        cell: CustomerCell,
    }),
    columnHelper.accessor((row) => row.total, {
        id: "total",
        label: "School",
        header: "School",
       
        cell: TotalCell,
    }),
    columnHelper.accessor((row) => row.profit, {
        id: "profit",
        label: "Source ",
        header: "Source",
        
        cell: ProfitCell,
    }),
    columnHelper.accessor((row) => row.order_status, {
        id: "order_status",
        label: "Order Status",
        header: "Status",
        filter: "select",
        filterFn: "arrIncludesSome",
        cell: OrderStatusCell,
        options: orderStatusOptions,
    }),
    columnHelper.accessor(
        (row) =>
            `${row.shipping_address?.street}, ${row.shipping_address?.line}`,
        {
            id: "address",
            label: "Sales Man",
            header: "Sales Man",
            cell: AddressCell,
        }
    ),
    columnHelper.display({
        id: "actions",
        label: "Row Actions",
        header: "Actions",
        cell: RowActions
    }),
]
