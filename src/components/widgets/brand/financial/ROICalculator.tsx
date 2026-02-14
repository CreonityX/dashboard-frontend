"use client";

import { useState } from "react";
import * as Slider from '@radix-ui/react-slider';
import { Calculator, ArrowRight } from "lucide-react";

export function ROICalculator() {
    const [spend, setSpend] = useState([5000]);
    const [conversionRate, setConversionRate] = useState([2.5]);
    const [aov, setAvov] = useState([85]); // Avg Order Value

    // Calculations
    const traffic = Math.floor(spend[0] / 1.50); // Assumed CPC $1.50
    const conversions = Math.floor(traffic * (conversionRate[0] / 100));
    const revenue = conversions * aov[0];
    const profit = revenue - spend[0];
    const roi = ((profit / spend[0]) * 100).toFixed(0);

    return (
        <div className="flex flex-col h-full p-6">
            <h3 className="text-sm font-bold text-white font-display tracking-wide mb-6 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-purple-400" /> ROI_SIMULATOR
            </h3>

            {/* Inputs */}
            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-2">
                        <span>AD_BUDGET</span>
                        <span className="text-white">${spend[0].toLocaleString()}</span>
                    </div>
                    <Slider.Root className="relative flex items-center select-none touch-none w-full h-5" value={spend} onValueChange={setSpend} max={50000} step={500}>
                        <Slider.Track className="bg-zinc-800 relative grow rounded-full h-[2px]">
                            <Slider.Range className="absolute bg-purple-500 rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-3 h-3 bg-white shadow-xl rounded-full hover:scale-110 focus:outline-none transition-transform" />
                    </Slider.Root>
                </div>

                <div>
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-2">
                        <span>CONV_RATE</span>
                        <span className="text-white">{conversionRate[0]}%</span>
                    </div>
                    <Slider.Root className="relative flex items-center select-none touch-none w-full h-5" value={conversionRate} onValueChange={setConversionRate} max={10} step={0.1}>
                        <Slider.Track className="bg-zinc-800 relative grow rounded-full h-[2px]">
                            <Slider.Range className="absolute bg-blue-400 rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-3 h-3 bg-white shadow-xl rounded-full hover:scale-110 focus:outline-none transition-transform" />
                    </Slider.Root>
                </div>

                <div>
                    <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-2">
                        <span>AVG_ORDER_VALUE</span>
                        <span className="text-white">${aov[0]}</span>
                    </div>
                    <Slider.Root className="relative flex items-center select-none touch-none w-full h-5" value={aov} onValueChange={setAvov} max={500} step={5}>
                        <Slider.Track className="bg-zinc-800 relative grow rounded-full h-[2px]">
                            <Slider.Range className="absolute bg-zinc-500 rounded-full h-full" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-3 h-3 bg-white shadow-xl rounded-full hover:scale-110 focus:outline-none transition-transform" />
                    </Slider.Root>
                </div>
            </div>

            {/* Output */}
            <div className="mt-auto bg-black border border-zinc-800 p-4 rounded-sm">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-zinc-500">EST_REVENUE</span>
                    <span className="text-sm font-bold text-white font-mono">${revenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">NET_PROFIT</span>
                    <span className={`text-sm font-bold font-mono ${profit > 0 ? 'text-[#a3e635]' : 'text-red-500'}`}>
                        {profit > 0 ? '+' : ''}${profit.toLocaleString()}
                    </span>
                </div>

                <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-purple-400">
                        EST_ROI <ArrowRight className="w-3 h-3" />
                    </div>
                    <div className="text-xl font-display font-black text-white">{roi}%</div>
                </div>
            </div>
        </div>
    );
}
