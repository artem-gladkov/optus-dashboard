import React, { Children } from 'react'
import { toJS } from 'mobx';
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
    CartesianAxis,
    ReferenceLine,
  } from "recharts";

import { observer } from "mobx-react-lite"

interface Props {
    data: any
}



const ChartsOverviewComponent = ({data}: Props) => {

   

    return (<>
    { data &&
( <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data}>
        

                <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                    <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                </linearGradient>
                </defs>
           
                <Area dataKey="value" stroke='#05036e' strokeWidth={3} />

                <XAxis dataKey="timestamp" axisLine={false} tickLine={false}/>

                <YAxis dataKey="value" orientation="right" axisLine={false} tickLine={false}/>

                <Tooltip/>
                <ReferenceLine  y={data[5].value} 
                                label={data[5].value} 
                                stroke="#020114" 
                                strokeDasharray="3 3" 
                                
                               />

            </AreaChart>
        </ResponsiveContainer>)}</>
    )
}

export const ChartsOverview = observer(ChartsOverviewComponent)
