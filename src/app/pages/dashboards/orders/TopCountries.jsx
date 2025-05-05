// Import Dependencies
import { Card } from "components/ui";
import { useState, useEffect } from "react";
import axios from 'axios';

// ----------------------------------------------------------------------

export function TopCountries() {
  // State to hold the branches data
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    const fetchData = async () => {
      try {
        // API call to get the lead count by branch
        const { data: response } = await axios.get(
          'https://test20250503145645-drh2beevhxfthfhw.canadacentral-01.azurewebsites.net/api/LeadSummary/LeadCountByBranch-SuccessPercentage'
        );

        // Set the response data to the state
        setBranches(response);
      } catch (error) {
        // Handle any errors
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function to get the data
    fetchData();
  }, []); // Empty dependency array means the effect runs only once when the component mounts

  return (
    <Card className="px-6 py-5 sm:px-8 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center py-3 mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Top Branches
        </h2>
      </div>

      {/* Show the total number of branches */}
      <div className="text-center mb-5">
        <span className="text-3xl font-semibold text-gray-800">
          {branches.length}
        </span>
        <p className="text-xs text-gray-600">Branches</p>
      </div>

      {/* Branch Rows */}
      <div className="space-y-4">
        {branches.map((branch) => (
          <div
            key={branch.branchName}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md shadow-sm group relative"
          >
            <div className="flex items-center gap-4">
              <span className="text-md font-medium text-gray-800">
                {branch.branchName}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-800">
                {branch.totalCount} / {branch.convertedCount}
              </div>

              {/* Tooltip for success percentage */}
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max p-2 text-sm text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {branch.successPercentage}% Success
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
