// 'use client'
// import React, {useEffect, useState} from 'react';
// import ReactApexChart from 'react-apexcharts';
// import {getChartData} from "@/utils/getData";

// export default function ApexChart(effect, deps) {
//     const [series, setSeries] = useState([]);
//     const [month, setMonth] = useState([]);
//     const [years, setYears] = useState([]);
//     const [firstYear, setFirstYear] = useState([]);
//     const [secondYear, setSecondYear] = useState([]);
//     const [selectedYear_1, setSelectedYear_1] = useState(0)
//     const [selectedYear_2, setSelectedYear_2] = useState(0)

//     useEffect(() => {
//         const callData = async () => {
//             const data = await getChartData(selectedYear_1, selectedYear_2)
//             setSeries(data?.data?.chart?.years_data)
//             setFirstYear(data?.data?.years[data?.data?.years?.length - 2])
//             setSecondYear(data?.data?.years[data?.data?.years?.length - 1])
//             setYears(data?.data?.years)
//             if (data?.data?.chart?.months.length > 0) {
//                 setMonth(data?.data?.chart?.months)
//             }
//         }
//         callData()
//     }, [selectedYear_1 , selectedYear_2])

//     const handleFirstYearChange = (e) => {
//         setSelectedYear_1(e.target.value)
//     }
//     const handleSecondYearChange = (e) => {
//         setSelectedYear_2(e.target.value)
//     }
//     const [options, setOptions] = useState({
//         chart: {
//             type: 'bar',
//             height: 'auto',
//             width: '100%',
//             toolbar: {
//                 show: false,
//             },
//             legend: {
//                 show: true,
//             }
//         },
//         plotOptions: {
//             bar: {
//                 horizontal: false,
//                 columnWidth: '55%',
//                 endingShape: 'rounded'
//             },
//             states: {
//                 hover: {
//                     enabled: false,
//                 },
//             },
//         },
//         dataLabels: {
//             enabled: false
//         },
//         stroke: {
//             show: true,
//             width: 0,
//             colors: ['transparent']
//         },
//         xaxis: {
//             categories: [],
//         },
//         fill: {
//             opacity: 1,
//             colors: ['#62B2FD', '#9BDFC4'],
//         },
//         tooltip: {
//             // x: {
//             //     formatter: function (val) {
//             //         return "$ " + val + " thousands"
//             //     }
//             // }
//         },
//         legend: {
//             position: 'bottom',
//             horizontalAlign: "left",
//             paddingBottom: '10px',
//             markers: {
//                 width: 20,
//                 height: 20,
//                 strokeWidth: 1,
//                 strokeColor: '#fff',
//                 radius: 12,
//             },
//             onItemHover: {
//                 highlightDataSeries: false
//             },
//         }
//     });

//     useEffect(() => {
//         setOptions({
//             ...options,
//             xaxis: {
//                 ...options.xaxis,
//                 categories: month
//             }
//         })
//     }, [month])

//     return (
//         <div className="border rounded-[10px]">
//             <div className="flex justify-between items-center p-3 border-b">
//                 <div>
//                     <h2 className="text-secondary-700 text-[24px] font-lightBold">Growth rate</h2>
//                 </div>
//                 <div>
//                     <select name="" id="" value={selectedYear_1 ? selectedYear_1 : firstYear} onChange={handleFirstYearChange}
//                             className="w-[77px] border text-[12px] rounded-[6px] text-secondary-500 px-[10px] py-[7px] focus:outline-none border-[#E9ECEF] gap-[10px]">
//                         {
//                             years?.map((year) => (
//                                 <option key={year} value={year}>{year}</option>
//                             ))
//                         }
//                     </select>
//                     <p className="m-2 inline-block text-secondary-400 font-[12px]">to</p>
//                     <select id="" value={selectedYear_2 ? selectedYear_2 : secondYear} onChange={handleSecondYearChange}
//                             className="w-[77px] border text-[12px] rounded-[6px] text-secondary-500 px-[10px] py-[7px] focus:outline-none border-[#E9ECEF] gap-[10px]">
//                         {
//                             years?.map((year) => (
//                                 <option key={year} value={year}>{year}</option>
//                             ))
//                         }
//                     </select>
//                 </div>
//             </div>
//             <div id="chart">
//                 <ReactApexChart options={options} series={series} type="bar" height={330}/>
//             </div>
//             <div id="html-dist"></div>
//         </div>
//     )
// }
