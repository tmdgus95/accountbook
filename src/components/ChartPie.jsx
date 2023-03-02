import React, { useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import SelectOption from "./SelectOption";

const ChartPie = () => {
    const { Authorization } = useAuthContext();
    const [chartData, setChartData] = useState([]);

    const chData = async () => {
        const header = {
            headers: {
                Authorization,
            },
        };
        try {
            const res = await axios.get(
                "http://192.168.0.208:9090/api/statistics/totalexpense",
                header
            );
            setChartData(res.data.list);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    const theme = {
        labels: {
            text: {
                fontSize: 20,
            },
        },
    };

    const pieChartData = chartData.map((item) => {
        let data = {
            id: item.cate,
            label: item.cate,
            value: item.extotal,
        };
        return data;
    });

    useEffect(() => {
        chData();
    }, []);

    return (
        <>
            <SelectOption />
            {/* chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height
설정 */}

            <div style={{ width: "1200px", height: "719px", margin: "auto" }}>
                <ResponsivePie
                    data={pieChartData}
                    theme={theme}
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
                            translateX: 470,
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
