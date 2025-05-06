import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { Fragment, useState, useEffect } from "react";
import { Button, Card } from "components/ui";
import axios from "axios";

// ----------------------------------------------------------------------

export function SocialTraffic() {
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          "https://test20250503145645-drh2beevhxfthfhw.canadacentral-01.azurewebsites.net/api/LeadSummary/lead-count-by-source-current-year"
        );
        setChannels(response);
        setLoading(false);
        console.log("Fetched data:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  const totalImpressions = channels.reduce((sum, c) => sum + c.impression, 0);

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
            {totalImpressions.toLocaleString()}
          </span>
        </p>
        <p className="text-xs-plus">Impressions This Year</p>
      </div>

      <div className="mt-5 space-y-4">
        {channels.map((channel) => (
          <div
            key={channel.uid}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={channel.logo}
                alt={channel.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="font-medium">{channel.name}</span>
            </div>
            <div className="text-sm-plus text-gray-800 dark:text-dark-100">
              {channel.impression.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ActionMenu remains unchanged
function ActionMenu() {
  return (
    <Menu as="div" className="relative inline-block text-left ltr:-mr-1.5 rtl:-ml-1.5">
      <MenuButton as={Button} variant="flat" isIcon className="size-8 rounded-full">
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
          {["Action", "Another action", "Other action", "Separated action"].map(
            (label, i) => (
              <Fragment key={i}>
                {label === "Separated action" && (
                  <hr className="mx-3 my-1.5 h-px border-gray-150 dark:border-dark-500" />
                )}
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={clsx(
                        "flex h-9 w-full items-center px-3 tracking-wide outline-hidden transition-colors",
                        focus &&
                          "bg-gray-100 text-gray-800 dark:bg-dark-600 dark:text-dark-100"
                      )}
                    >
                      <span>{label}</span>
                    </button>
                  )}
                </MenuItem>
              </Fragment>
            )
          )}
        </MenuItems>
      </Transition>
    </Menu>
  );
}
