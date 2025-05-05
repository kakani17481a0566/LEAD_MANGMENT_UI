// Import Dependencies
 
import {
  BuildingLibraryIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

// ----------------------------------------------------------------------

export function Statistics() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:order-first sm:grid-cols-4 sm:gap-5 lg:gap-6">
      <div className="rounded-lg border border-gray-200 p-3 dark:border-dark-600">
        <div className="flex justify-between gap-1">
          <p className="text-xl font-semibold text-gray-800 dark:text-dark-100">
            10
          </p>
          <BuildingLibraryIcon className="this:primary size-5 shrink-0 text-this dark:text-this-light" />
        </div>
        <p className="mt-1 truncate text-xs-plus">Total Franchise</p>
      </div>
      <div className="rounded-lg border border-gray-200 p-3 dark:border-dark-600">
        <div className="flex justify-between gap-1">
          <p className="text-xl font-semibold text-gray-800 dark:text-dark-100">
            300
          </p>
          <UserGroupIcon className="this:success size-5 shrink-0 text-this dark:text-this-light" />
        </div>
        <p className="mt-1 truncate text-xs-plus">Total Students</p>
      </div>
      <div className="rounded-lg border border-gray-200 p-3 dark:border-dark-600">
        <div className="flex justify-between gap-1">
          <p className="text-xl font-semibold text-gray-800 dark:text-dark-100">
            20
          </p>
          <BuildingOffice2Icon className="this:warning size-5 shrink-0 text-this dark:text-this-light" />
        </div>
        <p className="mt-1 truncate text-xs-plus">Total Schools</p>
      </div>
      <div className="rounded-lg border border-gray-200 p-3 dark:border-dark-600">
        <div className="flex justify-between gap-1">
          <p className="text-xl font-semibold text-gray-800 dark:text-dark-100">
            651
          </p>
          <UsersIcon className="this:info size-5 shrink-0 text-this dark:text-this-light" />
        </div>
        <p className="mt-1 truncate text-xs-plus">Total Staff</p>
      </div>
    </div>
  );
}
