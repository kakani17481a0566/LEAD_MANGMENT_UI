import { Page } from "components/shared/Page";
import { Statistics } from "./Statistics";
export default function Home() {
  return (
    <Page title="Sales Dashboard">
    <div className="transition-content overflow-hidden px-(--margin-x) pb-8">
      <Statistics />
      <div className="mt-4 grid grid-cols-12 gap-4 sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6">
         
        <div className="col-span-12 space-y-4 sm:col-span-6 sm:space-y-5 lg:col-span-4 lg:space-y-6 xl:col-span-3">
           
           
        </div>
         
        <div className="col-span-12 space-y-4 sm:col-span-6 sm:space-y-5 lg:col-span-4 lg:space-y-6">
          
        </div>
         
      </div>
    </div>
  </Page>
  );
}