// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  CheckBadgeIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

// Local Imports
import { Button, Card, Spinner } from "components/ui";
import { Listbox } from "components/shared/form/Listbox";

import axios from "axios";

// ----------------------------------------------------------------------

var data = {
  yearly: {
    series: [
      {
        name: "Leads",
        data: [28, 45, 35, 50, 32, 55, 23, 60, 28],
      },
      {
        name: "Inprogress",
        data: [14, 25, 20, 25, 12, 20, 15, 20, 14],
      },
      {
        name: "Converted",
        data: [4, 5, 6, 5, 2, 5, 3, 6, 3],
      },
      {
        name: "Closed",
        data: [4, 5, 6, 5, 2, 5, 3, 6, 3],
      },
    ],
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
  },
  monthly: {
    series: [
      {
        name: "Leads",
        data: [28, 45, 35, 50, 32, 55, 23, 60, 28, 42],
      },
      {
        name: "Inprogress ",
        data: [14, 25, 20, 25, 12, 20, 15, 20, 14, 21],
      },
      {
        name: "Converted",
        data: [4, 5, 6, 5, 2, 5, 3, 6, 3, 5],
      },
      {
        name: "Closed",
        data: [4, 5, 6, 5, 2, 5, 3, 6, 3, 5],
      },
    ],
    categories: [1, 4, 7, 10, 13, 16, 19, 22, 25, 28],
  },
};

const chartConfig = {
  colors: ["#4C4EE7", "#26E7A6", "#FF9800", "#FF9800"],
  chart: {
    parentHeightOffset: 0,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  plotOptions: {},
  legend: {
    show: false,
  },
  xaxis: {
    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    labels: {
      hideOverlappingLabels: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  markers: {
    size: 5,
    hover: {
      size: 8,
    },
  },
  grid: {
    padding: {
      left: 10,
      right: 0,
      top: -30,
      bottom: -8,
    },
  },
  yaxis: {
    show: false,
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
    },
  },
  responsive: [
    {
      breakpoint: 850,
      options: {
        plotOptions: {
          bar: {
            columnWidth: "55%",
          },
        },
      },
    },
  ],
};

export function Overview() {
  const [focusRange, setfocusRange] = useState("yearly");
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState({ value: currentYear, label: `${currentYear}` });

  const [LeadTotals, setLeadTotals] = useState({
    totalLeads: 0,
    convertedLeads: 0,
    inProcessLeads: 0,
    nonConverted: 0,
  });
  const chartOptions = JSON.parse(JSON.stringify(chartConfig));
  chartOptions.xaxis.categories = data[focusRange].categories;
  const [Leaddata, setLeadData] = useState({
    totalCount: 0,
    inProcess: 0,
    converted: 0,
    nonConverted: 0,
  });

  const years = [
    { value: currentYear, label: `${currentYear}` },
    { value: currentYear - 1, label: `${currentYear - 1}` },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { data: response } = await axios.get('https://localhost:7257/api/LeadSummary/LeadStats');
        const { data: response } = await axios.get(
          `https://lead-mgmt-msi-kakani-2025.azurewebsites.net/api/LeadSummary/LeadStats?year=${year.value}`,
        );

        setLeadData(response);
        setLeadTotals(response.leadTotals);
        setLoading(false);
        data = response;
        chartOptions.xaxis.categories = data[focusRange].categories;
        console.log("response", response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [year]);

  return (
    <Card className="col-span-12 lg:col-span-8">
      <div className="flex flex-col justify-between px-4 pt-3 sm:flex-row sm:items-center sm:px-5">
        <div className="flex flex-1 items-center space-x-2 sm:flex-initial">
          <h2 className="text-sm-plus dark:text-dark-100 font-medium tracking-wide text-gray-800">
            Leads Overview
          </h2>
          <div className="w-32">
            <Listbox
              data={years}
              value={year}
              onChange={setYear}
            />
          </div>
          <ActionMenu />
        </div>
        <RadioGroup
          name="options"
          value={focusRange}
          onChange={setfocusRange}
          className="hidden gap-2 sm:flex"
        >
          <Radio as={Fragment} value="monthly">
            {({ checked }) => (
              <Button
                className="h-8 rounded-full text-xs"
                variant={checked ? "soft" : "flat"}
                color={checked ? "primary" : "neutral"}
              >
                Monthly
              </Button>
            )}
          </Radio>
          <Radio as={Fragment} value="yearly">
            {({ checked }) => (
              <Button
                className="h-8 rounded-full text-xs"
                variant={checked ? "soft" : "flat"}
                color={checked ? "primary" : "neutral"}
              >
                Yearly
              </Button>
            )}
          </Radio>
        </RadioGroup>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 px-4 sm:mt-5 sm:grid-cols-2 sm:px-5 md:grid-cols-3 lg:mt-6 lg:grid-cols-4">
        <div className="dark:bg-surface-3 rounded-lg bg-gray-100 p-3 2xl:p-4">
          <div className="flex justify-between space-x-1">
            <p className="dark:text-dark-100 text-xl font-semibold text-gray-800">
              {loading && 0}
              {!loading && LeadTotals.totalLeads}
            </p>
            <CurrencyDollarIcon className="this:secondary text-this dark:text-this-light size-5" />
          </div>
          <p className="text-xs-plus mt-1">Leads</p>
        </div>
        <div className="dark:bg-surface-3 rounded-lg bg-gray-100 p-3 2xl:p-4">
          <div className="flex justify-between space-x-1">
            <p className="dark:text-dark-100 text-xl font-semibold text-gray-800">
              {loading && 0}
              {!loading && LeadTotals.convertedLeads}
            </p>
            <CheckBadgeIcon className="this:success text-this dark:text-this-light size-5" />
          </div>
          <p className="text-xs-plus mt-1">Completed</p>
        </div>
        <div className="dark:bg-surface-3 rounded-lg bg-gray-100 p-3 2xl:p-4">
          <div className="flex justify-between space-x-1">
            <p className="dark:text-dark-100 text-xl font-semibold text-gray-800">
              {loading && 0}
              {!loading && LeadTotals.inProcessLeads}
            </p>
            <ArrowPathIcon className="this:primary text-this dark:text-this-light size-5" />
          </div>
          <p className="text-xs-plus mt-1">Processing</p>
        </div>
        <div className="dark:bg-surface-3 rounded-lg bg-gray-100 p-3 2xl:p-4">
          <div className="flex justify-between space-x-1">
            <p className="dark:text-dark-100 text-xl font-semibold text-gray-800">
              {loading && 0}
              {!loading && LeadTotals.nonConverted}
            </p>
            <ClockIcon className="this:warning text-this dark:text-this-light size-5" />
          </div>
          <p className="text-xs-plus mt-1">Closed</p>
        </div>
      </div>

      <div className="mt-4 overflow-hidden px-4 sm:px-6 lg:px-8 xl:px-10">
        {!loading ? (
          <ReactApexChart
            options={chartOptions}
            series={Leaddata[focusRange].series}
            type="line"
            height={270}
            className="w-full" // Ensures full width responsiveness
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            <Spinner className="size-8" />
          </div>
        )}
      </div>
    </Card>
  );
}

function ActionMenu() {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left ltr:-mr-1.5 rtl:-ml-1.5"
    >
      <MenuButton
        as={Button}
        variant="flat"
        isIcon
        className="size-8 rounded-full"
      >
        <EllipsisHorizontalIcon className="size-5" />
      </MenuButton>
      <Transition
        as={Fragment}
        enter="transition ease-out"
        enterFrom="opacity-0 translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-2"
      >
        <MenuItems className="dark:border-dark-500 dark:bg-dark-700 absolute z-100 mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden ltr:right-0 sm:ltr:left-0 rtl:left-0 sm:rtl:right-0 dark:shadow-none">
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                  "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
              >
                <span>Action</span>
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                  "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
              >
                <span>Another action</span>
              </button>
            )}
          </MenuItem>
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                  "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
              >
                <span>Other action</span>
              </button>
            )}
          </MenuItem>

          <hr className="border-gray-150 dark:border-dark-500 mx-3 my-1.5 h-px" />

          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                  "dark:bg-dark-600 dark:text-dark-100 bg-gray-100 text-gray-800",
                )}
              >
                <span>Separated action</span>
              </button>
            )}
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
