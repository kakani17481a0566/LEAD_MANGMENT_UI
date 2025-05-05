// Import Dependencies
import { FaBullseye , FaRegChartBar   } from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp  } from "react-icons/fa6";
 

// ----------------------------------------------------------------------

export function Balance() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
      <div className="this:primary rounded-lg bg-this p-4 shadow-this/50 transition-shadow duration-300 hover:shadow-lg dark:bg-this-light dark:shadow-this-light/50">
        <div className="flex size-10 items-center justify-center rounded-lg bg-white/90">
          <FaBullseye  className="size-5 text-this dark:text-this-light" />
        </div>
        <p className="mt-3 text-base font-medium text-white">Sales Traget</p>
        <div className="mt-8">
          <p className="mt-3 text-xl font-medium text-white">$3,252</p>
        
        </div>
      </div>
      <div className="this:warning rounded-lg bg-this p-4 shadow-this/50 transition-shadow duration-300 hover:shadow-lg dark:bg-this-light dark:shadow-this-light/50">
        <div className="flex size-10 items-center justify-center rounded-lg bg-white/90">
          <FaRegChartBar className="size-5 text-this dark:text-this-light" />
        </div>
        <p className="mt-3 text-base font-medium text-white">Achived Sales</p>
        <div className="mt-8">
          <p className="mt-3 text-xl font-medium text-white">$6,955.89</p>
           
        </div>
      </div>
      <div className="this:info rounded-lg bg-this p-4 shadow-this/50 transition-shadow duration-300 hover:shadow-lg dark:bg-this-light dark:shadow-this-light/50">
        <div className="flex size-10 items-center justify-center rounded-lg bg-white/90">
          <FaArrowTrendDown  className="size-5 text-this dark:text-this-light" />
        </div>
        <p className="mt-3 text-base font-medium text-white">Expense</p>
        <div className="mt-8">
          <p className="mt-3 text-xl font-medium text-white">$7,654.26</p>
         
        </div>
      </div>
      <div className="this:secondary rounded-lg bg-this p-4 shadow-this/50 transition-shadow duration-300 hover:shadow-lg dark:bg-this-light dark:shadow-this-light/50">
        <div className="flex size-10 items-center justify-center rounded-lg bg-white/90">
          <FaArrowTrendUp  className="size-6 text-this dark:text-this-light" />
        </div>
        <p className="mt-3 text-base font-medium text-white">Income</p>
        <div className="mt-8">
          <p className="mt-3 text-xl font-medium text-white">$65.97</p>
          
        </div>
      </div>
    </div>
  );
}
