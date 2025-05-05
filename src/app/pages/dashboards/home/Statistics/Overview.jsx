// Import Dependencies
 
   
   

  
  

  
  
  // ----------------------------------------------------------------------
  
  export function Overview() {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
        <div className="relative flex flex-col overflow-hidden rounded-lg bg-linear-to-br from-info to-info-darker p-3.5">
          <p className="text-xs uppercase text-sky-100">Total Franchise</p>
          <div className="flex items-end justify-between space-x-2 ">
            <p className="mt-4 text-2xl font-medium text-white">04</p>
            <a
              href="##"
              className="truncate border-b border-dotted border-current pb-0.5 text-xs font-medium text-sky-100 outline-hidden transition-colors duration-300 hover:text-white focus:text-white"
            >
              Get Report
            </a>
          </div>
          <div className="mask is-reuleaux-triangle absolute right-0 top-0 -m-3 size-16 bg-white/20"></div>
        </div>
  
        <div className="relative flex flex-col overflow-hidden rounded-lg bg-linear-to-br from-amber-400 to-orange-600 p-3.5">
          <p className="text-xs uppercase text-amber-50">Total Students</p>
          <div className="flex items-end justify-between space-x-2 ">
            <p className="mt-4 text-2xl font-medium text-white">300</p>
            <a
              href="##"
              className="truncate border-b border-dotted border-current pb-0.5 text-xs font-medium text-amber-50 outline-hidden transition-colors duration-300 hover:text-white focus:text-white"
            >
              Get Report
            </a>
          </div>
          <div className="mask is-diamond absolute right-0 top-0 -m-3 size-16 bg-white/20"></div>
        </div>
  
        <div className="relative flex flex-col overflow-hidden rounded-lg bg-linear-to-br from-pink-500 to-rose-500 p-3.5">
          <p className="text-xs uppercase text-pink-100">Sales Traget</p>
          <div className="flex items-end justify-between space-x-2 ">
            <p className="mt-4 text-2xl font-medium text-white">$12,556</p>
            <a
              href="##"
              className="truncate border-b border-dotted border-current pb-0.5 text-xs font-medium text-pink-100 outline-hidden transition-colors duration-300 hover:text-white focus:text-white"
            >
              Get Report
            </a>
          </div>
          <div className="mask is-hexagon-2 absolute right-0 top-0 -m-3 size-16 bg-white/20"></div>
        </div>
  
        <div className="relative flex flex-col overflow-hidden rounded-lg bg-linear-to-br from-success to-info-darker p-3.5">
          <p className="text-xs uppercase text-pink-100">Achived Sales</p>
          <div className="flex items-end justify-between space-x-2 ">
            <p className="mt-4 text-2xl font-medium text-white">$12,556</p>
            <a
              href="##"
              className="truncate border-b border-dotted border-current pb-0.5 text-xs font-medium text-pink-100 outline-hidden transition-colors duration-300 hover:text-white focus:text-white"
            >
              Get Report
            </a>
          </div>
          <div className="mask is-hexagon-2 absolute right-0 top-0 -m-3 size-16 bg-white/20"></div>
        </div>
      </div>
    );
  }
  