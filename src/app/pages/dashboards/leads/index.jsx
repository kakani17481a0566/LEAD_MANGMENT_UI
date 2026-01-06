// Import Dependencies
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import { Fragment, useRef, useState, useEffect } from "react";

import { PlusIcon } from "@heroicons/react/20/solid";

// Local Imports
import { TableSortIcon } from "components/shared/table/TableSortIcon";
import { ColumnFilter } from "components/shared/table/ColumnFilter";
import { PaginationSection } from "components/shared/table/PaginationSection";
import { Button, Card, Table, THead, TBody, Th, Tr, Td } from "components/ui";
import {
  useBoxSize,
  useLockScrollbar,
  useLocalStorage,
  useDidUpdate,
} from "hooks";
import { fuzzyFilter } from "utils/react-table/fuzzyFilter";
import { useSkipper } from "utils/react-table/useSkipper";
import { SelectedRowsActions } from "./SelectedRowsActions";
import { SubRowComponent } from "./SubRowComponent";
import { columns } from "./columns";
import { ordersList } from "./data";
import { Toolbar } from "./Toolbar";
import { useThemeContext } from "app/contexts/theme/context";
import { getUserAgentBrowser } from "utils/dom/getUserAgentBrowser";
import { useDisclosure } from "hooks";
import { useNavigate } from "react-router";
//import { useNavigate } from "react-router";


//import PropTypes from "prop-types";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";

//import { NewLead } from "./NewLead";
import { LEAD_ENDPOINTS } from "constants/apiConfig";
import axios from 'axios';

// ----------------------------------------------------------------------

const isSafari = getUserAgentBrowser() === "Safari";

export default function OrdersDatatableV2() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isOpen, { close }] = useDisclosure(false);
  const { cardSkin } = useThemeContext();

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

  const [orders, setOrders] = useState([...ordersList]);

  const [tableSettings, setTableSettings] = useState({
    enableSorting: true,
    enableColumnFilters: true,
    enableFullScreen: false,
    enableRowDense: false,
  });

  const [globalFilter, setGlobalFilter] = useState("");

  const [sorting, setSorting] = useState([]);

  const [columnVisibility, setColumnVisibility] = useLocalStorage(
    "column-visibility-orders-2",
    {},
  );

  const [columnPinning, setColumnPinning] = useLocalStorage(
    "column-pinning-orders-2",
    {},
  );

  const cardRef = useRef();

  const { width: cardWidth } = useBoxSize({ ref: cardRef });

  const table = useReactTable({
    data: orders,
    columns: columns,
    state: {
      globalFilter,
      sorting,
      columnVisibility,
      columnPinning,
      tableSettings,
    },
    meta: {
      setTableSettings,
      deleteRow: (row) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setOrders((old) =>
          old.filter((oldRow) => oldRow.order_id !== row.original.order_id),
        );
      },
      deleteRows: (rows) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        const rowIds = rows.map((row) => row.original.order_id);
        setOrders((old) => old.filter((row) => !rowIds.includes(row.order_id)));
      },
    },

    filterFns: {
      fuzzy: fuzzyFilter,
    },
    enableSorting: tableSettings.enableSorting,
    enableColumnFilters: tableSettings.enableColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),

    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,

    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnPinningChange: setColumnPinning,

    autoResetPageIndex,
  });

  useDidUpdate(() => table.resetRowSelection(), [orders]);

  useLockScrollbar(tableSettings.enableFullScreen);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);  // Set loading to true when starting to fetch
        const { data: response } = await axios.get(LEAD_ENDPOINTS.LEAD);
        setOrders(response);
        setLoading(false);  // Set loading to false when data is loaded
      } catch (error) {
        console.error(error);
        setLoading(false);  // Set loading to false even if there's an error
      }
    };
    fetchData();
  }, []);




  //   const newLead= () => {
  //           alert("sdfasdf");
  //       // Navigate('/dashboards/addlead')
  //       // return <Navigate to={'/dashboards/addlead'} />;

  // }

  return (
    <div className="transition-content grid grid-cols-1 grid-rows-[auto_auto_1fr] px-(--margin-x) py-4">
      {/* Show a loading spinner while fetching data */}
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <Fragment>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[100]" onClose={close}>
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-900/50 backdrop-blur transition-opacity dark:bg-black/40" />
              </TransitionChild>

              <TransitionChild
                as={Fragment}
                enter="ease-out transform-gpu transition-transform duration-200"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="ease-in transform-gpu transition-transform duration-200"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="fixed right-0 top-0 flex h-full w-72 transform-gpu flex-col bg-white transition-transform duration-200 dark:bg-dark-700">
                  <Button
                    onClick={close}
                    variant="flat"
                    isIcon
                    className="size-6 rounded-full ltr:-mr-1.5 rtl:-ml-1.5"
                  >
                    <XMarkIcon className="size-4.5" />
                  </Button>
                  <div className="h-24"></div>
                  <div className="flex space-x-4 px-4 "></div>
                  <hr className="mx-5 my-4 h-px border-gray-200 dark:border-dark-500" />
                </DialogPanel>
              </TransitionChild>
            </Dialog>
          </Transition>

          <div className="flex items-center justify-between space-x-4 ">
            <div className="min-w-0">
              <h2 className="truncate text-xl font-medium tracking-wide text-gray-800 dark:text-dark-50">
                Lead History
              </h2>
            </div>
            <Button onClick={() => navigate('/dashboards/addlead')} className="h-8 space-x-1.5 rounded-md px-3 text-xs " color="primary">
              <PlusIcon className="size-5" />
              <span>New Lead</span>
            </Button>
          </div>

          <div
            className={clsx(
              "flex flex-col pt-4",
              tableSettings.enableFullScreen && "fixed inset-0 z-61 h-full w-full bg-white pt-3 dark:bg-dark-900"
            )}
          >
            <Toolbar table={table} />
            <Card
              className={clsx(
                "relative mt-3 flex grow flex-col",
                tableSettings.enableFullScreen && "overflow-hidden"
              )}
              ref={cardRef}
            >
              <div className="table-wrapper min-w-full grow overflow-x-auto">
                <Table
                  hoverable
                  dense={tableSettings.enableRowDense}
                  sticky={tableSettings.enableFullScreen}
                  className="w-full text-left rtl:text-right"
                >
                  <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                          <Th
                            key={header.id}
                            className={clsx(
                              "bg-gray-200 font-semibold uppercase text-gray-800 dark:bg-dark-800 dark:text-dark-100 first:ltr:rounded-tl-lg last:ltr:rounded-tr-lg first:rtl:rounded-tr-lg last:rtl:rounded-tl-lg",
                              header.column.getCanPin() && [
                                header.column.getIsPinned() === "left" && "sticky z-2 ltr:left-0 rtl:right-0",
                                header.column.getIsPinned() === "right" && "sticky z-2 ltr:right-0 rtl:left-0",
                              ]
                            )}
                          >
                            {header.column.getCanSort() ? (
                              <div
                                className="flex cursor-pointer select-none items-center space-x-3 "
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                <span className="flex-1">
                                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </span>
                                <TableSortIcon sorted={header.column.getIsSorted()} />
                              </div>
                            ) : header.isPlaceholder ? null : (
                              flexRender(header.column.columnDef.header, header.getContext())
                            )}
                            {header.column.getCanFilter() ? <ColumnFilter column={header.column} /> : null}
                          </Th>
                        ))}
                      </Tr>
                    ))}
                  </THead>
                  <TBody>
                    {table.getRowModel().rows.map((row) => {
                      return (
                        <Fragment key={row.id}>
                          <Tr
                            className={clsx(
                              "relative border-y border-transparent border-b-gray-200 dark:border-b-dark-500",
                              row.getIsExpanded() && "border-dashed",
                              row.getIsSelected() && !isSafari &&
                              "row-selected after:pointer-events-none after:absolute after:inset-0 after:z-2 after:h-full after:w-full after:border-3 after:border-transparent after:bg-primary-500/10 ltr:after:border-l-primary-500 rtl:after:border-r-primary-500"
                            )}
                          >
                            {row.getVisibleCells().map((cell) => {
                              return (
                                <Td
                                  key={cell.id}
                                  onClick={() => navigate(`/dashboards/addLead?id=${row.original.id}`)}
                                  className={clsx(
                                    "relative",
                                    cardSkin === "shadow-sm" ? "dark:bg-dark-700" : "dark:bg-dark-900",
                                    cell.column.getCanPin() && [
                                      cell.column.getIsPinned() === "left" && "sticky z-2 ltr:left-0 rtl:right-0",
                                      cell.column.getIsPinned() === "right" && "sticky z-2 ltr:right-0 rtl:left-0",
                                    ]
                                  )}
                                >
                                  {cell.column.getIsPinned() && (
                                    <div
                                      className={clsx(
                                        "pointer-events-none absolute inset-0 border-gray-200 dark:border-dark-500",
                                        cell.column.getIsPinned() === "left" ? "ltr:border-r rtl:border-l" : "ltr:border-l rtl:border-r"
                                      )}
                                    ></div>
                                  )}
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </Td>
                              );
                            })}
                          </Tr>
                          {row.getIsExpanded() && (
                            <tr>
                              <td colSpan={row.getVisibleCells().length} className="p-0">
                                <SubRowComponent row={row} cardWidth={cardWidth} />
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </TBody>
                </Table>
              </div>
              <SelectedRowsActions table={table} />
              {table.getCoreRowModel().rows.length && (
                <div
                  className={clsx(
                    "px-4 pb-4 sm:px-5 sm:pt-4",
                    tableSettings.enableFullScreen && "bg-gray-50 dark:bg-dark-800",
                    !(table.getIsSomeRowsSelected() || table.getIsAllRowsSelected()) && "pt-4"
                  )}
                >
                  <PaginationSection table={table} />
                </div>
              )}
            </Card>
          </div>
        </Fragment>
      )}
    </div>
  );
}  