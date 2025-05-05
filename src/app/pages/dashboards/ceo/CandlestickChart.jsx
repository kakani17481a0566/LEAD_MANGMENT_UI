// Import Dependencies
import Chart from "react-apexcharts";
import {
   
  Radio,
  RadioGroup,
   
} from "@headlessui/react";
import { clsx } from "clsx";

import {  useState } from "react";
// Local Imports
import { Button, Card } from "components/ui";

// ----------------------------------------------------------------------

const data = {
  yearly: {
    series: [
      {
        name: "Sales",
        data: [28, 45, 35, 50, 32, 55, 23, 60, 28, 45, 35, 50],
      },
      {
        name: "Profit",
        data: [14, 25, 20, 25, 12, 20, 15, 20, 14, 25, 20, 25],
      },
    ],
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  },
  monthly: {
    series: [
      {
        name: "Strength",
        data: [51, 42, 50, 41 ,15],
      },
      {
        name: "Attendants",
        data: [40, 30, 12, 24, 11 ],
      },
    ],
    categories: [
      "KG 1",
      "Kg 2",
      "Grade 1",
      "Grade 2",
      "Grade 3",
       
    ],
  },
  daily: {
    series: [
      {
        name: "High",
        data: [51, 42, 50, 41, ],
      },
      {
        name: "Low",
        data: [40, 30, 12, 24, ],
      },
    ],
    categories: [
      "My School Italy",
      "Franchise 1",
      "Franchise 2",
      "Franchise 3",
       
    ],
  },
};

const chartConfig = {
  colors: ["#5BC6E6", "#5FCE46"],
  chart: {
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 5,
      barHeight: "90%",
      columnWidth: "40%",
    },
  },
  legend: {
    show: false,
  },
  xaxis: {
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
  grid: {
    padding: {
      left: -8,
      right: -8,
      top: 0,
      bottom: -6,
    },
  },
  yaxis: {
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
};

export function CandlestickChart() {
  const [activeRange, setActiveRange] = useState("monthly");
  const chartOptions = JSON.parse(JSON.stringify(chartConfig));
  chartOptions.xaxis.categories = data[activeRange].categories;

  return (
    <Card className="col-span-2 sm:col-span-2 lg:col-span-2 xl:col-span-2">
      <div className="mt-3 flex flex-col justify-between gap-2 px-4 sm:flex-row sm:items-center sm:px-5">
        <div className="flex flex-1 items-center justify-between space-x-2 sm:flex-initial ">
          <h2 className="text-sm-plus font-medium tracking-wide text-gray-800 dark:text-dark-100">
            Student Report
          </h2>
          
        </div>
        <RadioGroup
          name="options"
          value={activeRange}
          onChange={setActiveRange}
          className="flex flex-wrap -space-x-px "
        >
          <Radio
            as={Button}
            unstyled
            value="daily"
            className={({ checked }) =>
              clsx(
                "h-8 border border-gray-300 px-3 text-xs-plus text-gray-800 dark:border-dark-450 dark:text-dark-100 first:ltr:rounded-l-lg last:ltr:rounded-r-lg first:rtl:rounded-r-lg last:rtl:rounded-l-lg",
                checked && "bg-gray-200 dark:bg-surface-2",
              )
            }
          >
            Franchise
          </Radio>
          <Radio
            as={Button}
            unstyled
            value="monthly"
            className={({ checked }) =>
              clsx(
                "h-8 border border-gray-300 px-3 text-xs-plus text-gray-800 dark:border-dark-450 dark:text-dark-100 first:ltr:rounded-l-lg last:ltr:rounded-r-lg first:rtl:rounded-r-lg last:rtl:rounded-l-lg",
                checked && "bg-gray-200 dark:bg-surface-2",
              )
            }
          >
            Class
          </Radio>
          
        </RadioGroup>
      </div>
      <div className="ax-transparent-gridline pr-2">
        <Chart
          type="bar"
          height="260"
          options={chartOptions}
          series={data[activeRange].series}
        />
      </div>
    </Card>
  );
}

 
