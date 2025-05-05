// Local Imports
//import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { Card } from "components/ui";
import { useState,useEffect } from "react";
import axios from 'axios';


// ----------------------------------------------------------------------



export function TopCountries() {

  const[branches,setBranches] =useState([{"uid":'',"flag":'',"name":'',"totalCount":0,"convertedCount":0}]);
      // const [loading, setLoading] = useState(true);
    
  
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data: response } = await axios.get('https://localhost:7257/api/LeadSummary/LeadCountByBranch-SuccessPercentage  ');
          setBranches(response);
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
          Top Branchs
        </h2>
        
      </div>
      <div>
        <p>
          <span className="text-2xl text-gray-800 dark:text-dark-100">64</span>
        </p>
        <p className="text-xs-plus">Branchs</p>
      </div>
      <div className="mt-5 space-y-4">
        {branches.map((branch) => (
          <div
            key={branch.uid}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex min-w-0 items-center gap-2">
              <img className="size-6" src={branch.flag} alt={branch.name} />
              <a
                href="##"
                className="truncate transition-opacity hover:opacity-80"
              >
                {branch.name}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm-plus text-gray-800 dark:text-dark-100">
                {branch.totalCount} /  {branch.convertedCount}
              </p>
               
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
