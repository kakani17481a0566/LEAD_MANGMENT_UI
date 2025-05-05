// Import Dependencies
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
//import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { Fragment, useState,useEffect } from "react";

// Local Imports
import { Button, Card } from "components/ui";
// import { formatNumber } from "utils/formatNumber";
import axios from 'axios';



// ----------------------------------------------------------------------



export function SocialTraffic() {
  const[channels,setChannels] =useState([{"uid":'',"logo":'',"name":'',"views":0,"impression":''}]);
    // const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get('https://localhost:7257/api/LeadSummary/lead-count-by-source-current-year');
        setChannels(response);
        console.log("response", response);
      } catch (error) {
        console.error(error)
      }
    };
    fetchData();
  },[]);
  return (
    <Card className="px-4 pb-5 sm:px-5">
      <div className="flex h-14 min-w-0 items-center justify-between py-3">
        <h2 className="truncate font-medium tracking-wide text-gray-800 dark:text-dark-100">
          Lead Type
        </h2>
        <ActionMenu />
      </div>
      <div>
        <p>
          <span className="text-2xl text-gray-800 dark:text-dark-100">
            135K
          </span>
          
        </p>
        <p className="text-xs-plus">View in this Year</p>
      </div>
      <div className="mt-5 space-y-4">
        {channels.map((channel) => (
          <div
            key={channel.uid}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              <img className="size-6" src={channel.logo} alt={channel.name} />
              <a
                href="##"
                className="truncate transition-opacity hover:opacity-80"
              >
                {channel.name}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm-plus text-gray-800 dark:text-dark-100">
                {channel.views} / {channel.impression}
              </p>
              
            </div>
          </div>
        ))}
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
        <MenuItems className="absolute z-100 mt-1.5 min-w-[10rem] rounded-lg border border-gray-300 bg-white py-1 shadow-lg shadow-gray-200/50 outline-hidden focus-visible:outline-hidden dark:border-dark-500 dark:bg-dark-700 dark:shadow-none ltr:right-0 rtl:left-0">
          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                    "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
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
                    "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
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
                    "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
                )}
              >
                <span>Other action</span>
              </button>
            )}
          </MenuItem>

          <hr className="mx-3 my-1.5 h-px border-gray-150 dark:border-dark-500" />

          <MenuItem>
            {({ focus }) => (
              <button
                className={clsx(
                  "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                  focus &&
                    "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100",
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
