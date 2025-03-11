import ApexChart from "@/components/ApexChart";
import { getChartData } from "@/utils/getData";

export default async function GrowthRateChart() {
  const chartData = await getChartData();
  const quickData = {
    total_restaurants: 100,
    total_visitors: 5000,
    recent_visitors: 1500,
  };
  return (
    <div className="grid md:grid-cols-10 sm:grid-cols-2 gap-8">
      <div className="col-span-2 flex flex-col justify-between">
        <div className="pb-6 pt-6 bg-primary-50 text-center border rounded-[10px] border-secondary-100">
          <h2 className="text-32 font-bold">{quickData?.total_restaurants}</h2>
          <span className="text-14 text-secondary-500">Total Restaurants</span>
        </div>
        <div className="pb-6 pt-6 bg-primary-50 text-center border rounded-[10px] border-secondary-100">
          <h2 className="text-32 font-bold">{quickData?.total_visitors}</h2>
          <span className="text-14 text-secondary-500">Total visitors</span>
        </div>
        <div className="pb-6 pt-6 bg-primary-50 text-center border rounded-[10px] border-secondary-100">
          <h2 className="text-32 font-bold">{quickData?.recent_visitors}</h2>
          <span className="text-14 text-secondary-500">
            Recent visitors (last 1 hr)
          </span>
        </div>
      </div>
      <div className="md:col-span-8 sm:col-span-12">
        <ApexChart />
      </div>
    </div>
  );
}
