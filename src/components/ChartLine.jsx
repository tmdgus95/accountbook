// import React from "react";
// import { ResponsiveLine } from "@nivo/line";

// const ChartLine = () => {
//     const data = [
//         {
//             id: "japan",
//             color: "hsl(184, 70%, 50%)",
//             data: [
//                 {
//                     x: "plane",
//                     y: 28,
//                 },
//                 {
//                     x: "helicopter",
//                     y: 4,
//                 },
//                 {
//                     x: "boat",
//                     y: 37,
//                 },
//                 {
//                     x: "train",
//                     y: 4,
//                 },
//                 {
//                     x: "subway",
//                     y: 120,
//                 },
//                 {
//                     x: "bus",
//                     y: 252,
//                 },
//                 {
//                     x: "car",
//                     y: 221,
//                 },
//                 {
//                     x: "moto",
//                     y: 133,
//                 },
//                 {
//                     x: "bicycle",
//                     y: 182,
//                 },
//                 {
//                     x: "horse",
//                     y: 282,
//                 },
//                 {
//                     x: "skateboard",
//                     y: 290,
//                 },
//                 {
//                     x: "others",
//                     y: 53,
//                 },
//             ],
//         },
//         {
//             id: "france",
//             color: "hsl(245, 70%, 50%)",
//             data: [
//                 {
//                     x: "plane",
//                     y: 170,
//                 },
//                 {
//                     x: "helicopter",
//                     y: 83,
//                 },
//                 {
//                     x: "boat",
//                     y: 178,
//                 },
//                 {
//                     x: "train",
//                     y: 264,
//                 },
//                 {
//                     x: "subway",
//                     y: 24,
//                 },
//                 {
//                     x: "bus",
//                     y: 285,
//                 },
//                 {
//                     x: "car",
//                     y: 28,
//                 },
//                 {
//                     x: "moto",
//                     y: 151,
//                 },
//                 {
//                     x: "bicycle",
//                     y: 243,
//                 },
//                 {
//                     x: "horse",
//                     y: 101,
//                 },
//                 {
//                     x: "skateboard",
//                     y: 292,
//                 },
//                 {
//                     x: "others",
//                     y: 272,
//                 },
//             ],
//         },
        
//     ];

//     return (
//         <>
//             <div style={{ width: "800px", height: "500px", margin: "auto" }}>
//                 <ResponsiveLine
//                     data={data}
//                     margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//                     xScale={{ type: "point" }}
//                     yScale={{
//                         type: "linear",
//                         min: "auto",
//                         max: "auto",
//                         stacked: true,
//                         reverse: false,
//                     }}
//                     yFormat=" >-.2f"
//                     axisTop={null}
//                     axisRight={null}
//                     axisBottom={{
//                         orient: "bottom",
//                         tickSize: 5,
//                         tickPadding: 5,
//                         tickRotation: 0,
//                         legend: "transportation",
//                         legendOffset: 36,
//                         legendPosition: "middle",
//                     }}
//                     axisLeft={{
//                         orient: "left",
//                         tickSize: 5,
//                         tickPadding: 5,
//                         tickRotation: 0,
//                         legend: "count",
//                         legendOffset: -40,
//                         legendPosition: "middle",
//                     }}
//                     pointSize={10}
//                     pointColor={{ theme: "background" }}
//                     pointBorderWidth={2}
//                     pointBorderColor={{ from: "serieColor" }}
//                     pointLabelYOffset={-12}
//                     useMesh={true}
//                     legends={[
//                         {
//                             anchor: "bottom-right",
//                             direction: "column",
//                             justify: false,
//                             translateX: 100,
//                             translateY: 0,
//                             itemsSpacing: 0,
//                             itemDirection: "left-to-right",
//                             itemWidth: 80,
//                             itemHeight: 20,
//                             itemOpacity: 0.75,
//                             symbolSize: 12,
//                             symbolShape: "circle",
//                             symbolBorderColor: "rgba(0, 0, 0, .5)",
//                             effects: [
//                                 {
//                                     on: "hover",
//                                     style: {
//                                         itemBackground: "rgba(0, 0, 0, .03)",
//                                         itemOpacity: 1,
//                                     },
//                                 },
//                             ],
//                         },
//                     ]}
//                 />
//             </div>
//         </>
//     );
// };

// export default ChartLine;
