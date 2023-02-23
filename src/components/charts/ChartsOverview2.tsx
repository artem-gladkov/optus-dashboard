import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

export const ChartsOverview2 = (props: { data: any; colors?: { backgroundColor?: "white"; lineColor?: "#2962FF"; textColor?: "black"; areaTopColor?: "#2962FF"; areaBottomColor?: "rgba(41, 98, 255, 0.28)"; }; }) => {
	
	const [useChar, setChar] = useState<JSX.Element>()
	
	const {
		data,
		colors: {
			backgroundColor = 'transparent',
			lineColor = '#bf3fb2d5',
			textColor = '#bf3fb2d5',
			areaTopColor = '#bf3fb2d5',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef['current' || ''].clientWidth });
			};

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef['current' || ''].clientWidth,
				height: 400,
				grid: {
					horzLines: {
						color: '#bf3fb2d5',
				  visible: false,
					},
					vertLines: {
						color: 'transparent',
					},
				},
				rightPriceScale: {
					scaleMargins: {
						top: 0.35,
						bottom: 0.2,
					},
					borderVisible: false,
				},
				timeScale: {
					borderVisible: false,
				},
				
				
			});
			chart.timeScale().fitContent();
			let dateStr = `${data[data.length-1].time.slice(0,4)}`;

			const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			chart.subscribeCrosshairMove((param)=>{
				if ( param === undefined || param.time === undefined || param.point.x < 0 || param.point.x > 400|| param.point.y < 0 || param.point.y > 400 ) {
					setChar(()=>{
						return (
							<div>
								<div>AEROSPACE</div>
								<div>{data[data.length-1].value}</div>
								<div>{dateStr}</div>
							</div>
						)
					})  
					
				} else {
					dateStr = param.time.toString() 
					let price: any = param.seriesData.get(newSeries);
					setChar(()=>{
						return (                    
						<div>
							<div>AEROSPACE</div>
							<div>{price.value}</div>
							<div>{dateStr}</div>
						</div>)
					})
				}
			})



			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div ref={chartContainerRef} >
			<Comn  char={useChar} data = {data}/>
		</div>
	);
};




const Comn = ({char, data})=>{
    console.log(char);
    return (
        <div className='-mb-20'>
            {char || (
			<div>
				<div>AEROSPACE</div>
				<div>{data[data.length-1].value}</div>
				<div>{data[data.length-1].time}</div>
			</div>
			)}
        </div>
    )
}