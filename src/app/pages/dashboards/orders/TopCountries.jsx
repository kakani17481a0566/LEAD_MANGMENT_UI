// Import Dependencies
import { Card, Spinner } from "components/ui";
import { useState, useEffect } from "react";
import axios from 'axios';
import { LEAD_ENDPOINTS } from "constants/apiConfig";

// ----------------------------------------------------------------------

export function TopCountries() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get(
          LEAD_ENDPOINTS.LEAD_COUNT_BY_BRANCH
        );
        setBranches(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Card className="px-4 pb-5 sm:px-5">
      <div className="flex h-14 min-w-0 items-center justify-between py-3">
        <h2 className="truncate font-medium tracking-wide text-gray-800 dark:text-dark-100">
          Top Branches
        </h2>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-20">
          <Spinner className="size-8" />
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center h-20">
          <span className="text-base text-red-600">{error}</span>
        </div>
      )}

      {!loading && !error && branches.length === 0 ? (
        <div className="text-center mb-5">
          <span className="text-base text-gray-600 dark:text-dark-300">No branches available.</span>
        </div>
      ) : (
        <>
          <div className="mb-5">
            <span className="text-2xl text-gray-800 dark:text-dark-100 font-semibold">
              {branches.length}
            </span>
            <p className="text-xs-plus text-gray-600 dark:text-dark-300">Branches</p>
          </div>

          <div className="space-y-4">
            {branches.map((branch) => {
              const percentage =
                branch.totalCount > 0
                  ? ((branch.convertedCount / branch.totalCount) * 100).toFixed(1) + "%"
                  : "0%";

              return (
                <div
                  key={branch.branchName}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    {/* Placeholder icon since no flag is available */}
                    <div className="w-5 h-5 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 text-xs">
                      B
                    </div>
                    <span className="font-medium text-gray-800 dark:text-dark-100">
                      {branch.branchName}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm-plus text-gray-800 dark:text-dark-100">
                    <span>
                      {branch.totalCount} / {branch.convertedCount}
                    </span>
                    <span className="text-gray-600 dark:text-dark-300">
                      {percentage}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </Card>
  );
}
