import React from "react";
import { ResponsivePie } from "@nivo/pie";

const ChartPie = () => {
    return (
        <>
            {/* chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height
설정 */}
            <div style={{ width: "800px", height: "500px", margin: "auto" }}>
                <ResponsivePie
                    data={[
                        {
                            id: "ruby",
                            label: "ruby",
                            value: 285,
                            color: "hsl(28, 70%, 50%)",
                        },
                        {
                            id: "css",
                            label: "css",
                            value: 352,
                            color: "hsl(117, 70%, 50%)",
                        },
                        {
                            id: "lisp",
                            label: "lisp",
                            value: 41,
                            color: "hsl(309, 70%, 50%)",
                        },
                        {
                            id: "javascript",
                            label: "javascript",
                            value: 111,
                            color: "hsl(2, 70%, 50%)",
                        },
                        {
                            id: "sass",
                            label: "sass",
                            value: 319,
                            color: "hsl(52, 70%, 50%)",
                        },
                    ]}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    activeOuterRadiusOffset={8}
                    borderWidth={1}
                    borderColor={{
                        from: "color",
                        modifiers: [["darker", 0.2]],
                    }}
                    arcLinkLabelsSkipAngle={10}
                    arcLinkLabelsTextColor="#333333"
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: "color" }}
                    arcLabelsSkipAngle={10}
                    arcLabelsTextColor={{
                        from: "color",
                        modifiers: [["darker", 2]],
                    }}
                    defs={[
                        {
                            id: "dots",
                            type: "patternDots",
                            background: "inherit",
                            color: "rgba(255, 255, 255, 0.3)",
                            size: 4,
                            padding: 1,
                            stagger: true,
                        },
                        {
                            id: "lines",
                            type: "patternLines",
                            background: "inherit",
                            color: "rgba(255, 255, 255, 0.3)",
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10,
                        },
                    ]}
                    fill={[
                        {
                            match: {
                                id: "ruby",
                            },
                            id: "dots",
                        },
                        {
                            match: {
                                id: "c",
                            },
                            id: "dots",
                        },
                        {
                            match: {
                                id: "go",
                            },
                            id: "dots",
                        },
                        {
                            match: {
                                id: "python",
                            },
                            id: "dots",
                        },
                        {
                            match: {
                                id: "scala",
                            },
                            id: "lines",
                        },
                        {
                            match: {
                                id: "lisp",
                            },
                            id: "lines",
                        },
                        {
                            match: {
                                id: "elixir",
                            },
                            id: "lines",
                        },
                        {
                            match: {
                                id: "javascript",
                            },
                            id: "lines",
                        },
                    ]}
                    legends={[
                        {
                            anchor: "bottom",
                            direction: "column",
                            justify: false,
                            translateX: 300,
                            translateY: -73,
                            itemsSpacing: 22,
                            itemWidth: 10,
                            itemHeight: 28,
                            itemTextColor: "#999",
                            itemDirection: "left-to-right",
                            itemOpacity: 1,
                            symbolSize: 25,
                            symbolShape: "circle",
                            effects: [
                                {
                                    on: "hover",
                                    style: {
                                        itemTextColor: "#000",
                                    },
                                },
                            ],
                        },
                    ]}
                />
            </div>
        </>
    );
};

export default ChartPie;
