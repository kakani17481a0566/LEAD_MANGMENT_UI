// Import Dependencies
import { FaBtc, FaEthereum } from "react-icons/fa";
import { FaLitecoinSign } from "react-icons/fa6";
import { TbCurrencyDogecoin } from "react-icons/tb";

// ----------------------------------------------------------------------

export function Balance() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
      <div className="this:primary rounded-lg bg-this p-4 shadow-this/50 transition-shadow duration-300 hover:shadow-lg dark:bg-this-light dark:shadow-this-light/50">
        <div className="flex size-10 items-center justify-center rounded-lg bg-white/90">
          <FaBtc className="size-5 text-this dark:text-this-light" />
        </div>
        <p className="mt-3 text-base font-medium text-white">STUDENTS</p>
        <div className="mt-8">
          <p className="mt-3 text-xl font-medium text-white">14/40</p>
          
        </div>
      </div>
      <div className="this:warning rounded-lg bg-this p-4 shadow-this/50 transition-shadow duration-300 hover:shadow-lg dark:bg-this-light dark:shadow-this-light/50">
        <div className="flex size-10 items-center justify-center rounded-lg bg-white/90">
          <FaLitecoinSign className="size-5 text-this dark:text-this-light" />
        </div>
        <p className="mt-3 text-base font-medium text-white">TRAININGS</p>
        <div className="mt-8">
          <p className="mt-3 text-xl font-medium text-white">4/5</p>
          
        </div>
      </div>
      <div className="this:info rounded-lg bg-this p-4 shadow-this/50 transition-shadow duration-300 hover:shadow-lg dark:bg-this-light dark:shadow-this-light/50">
        <div className="flex size-10 items-center justify-center rounded-lg bg-white/90">
          <FaEthereum className="size-5 text-this dark:text-this-light" />
        </div>
        <p className="mt-3 text-base font-medium text-white">ATTENDANCE</p>
        <div className="mt-8">
          <p className="mt-3 text-xl font-medium text-white">16/25</p>
         
        </div>
      </div>
      <div className="this:secondary rounded-lg bg-this p-4 shadow-this/50 transition-shadow duration-300 hover:shadow-lg dark:bg-this-light dark:shadow-this-light/50">
        <div className="flex size-10 items-center justify-center rounded-lg bg-white/90">
          <TbCurrencyDogecoin className="size-6 text-this dark:text-this-light" />
        </div>
        <p className="mt-3 text-base font-medium text-white">ASSESSMENT</p>
        <div className="mt-8">
          <p className="mt-3 text-xl font-medium text-white">1/1</p>
          
        </div>
      </div>
    </div>
  );
}
