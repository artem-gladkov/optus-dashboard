import { createChart, ColorType, ISeriesApi, IChartApi, AreaData, HistogramSeriesOptions, CrosshairMode, LineStyle } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import { numberWithSpaces } from '../../function/numberWithSpaces';
import Spinner from '../spinner/Spinner';

type typeCharts = 'Liquidity' | 'Volume (24hrs)'

export const ChartsOverview = (
	props: {titleMarker?: boolean, type: typeCharts, data: any; 
	colors?: { backgroundColor?: any; 
				lineColor?: any; 
				textColor?: any; 
				areaTopColor?: any; 
				areaBottomColor?: any;
 }; 
}) => {
	
	const [useChar, setChar] = useState<JSX.Element>()
	
	const {
		titleMarker,
		type,
		data,
		colors: {
			backgroundColor = 'transparent',
			lineColor = '#bf3fb2d5',
			textColor = '#6A637A',
			areaTopColor = '#fc0097d5',
			areaBottomColor = '#fc00970e',
		} = {},
	} = props;

	const chartContainerRef = useRef()

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ 
					width: chartContainerRef['current' || ''].clientWidth,
					height:  chartContainerRef['current' || ''].clientHeight,
					
				 });
			};

			const chart = createChart(data &&  chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width:  chartContainerRef['current' || ''].clientWidth,
				height: chartContainerRef['current' || ''].clientHeight,
				grid: {
					horzLines: {
						color: areaTopColor,
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
			const currentLocale = window.navigator.languages[0];
			const myPriceFormatter = Intl.NumberFormat(currentLocale, {
				style: 'currency',
				currency: 'USD', 
			}).format;
	
			let dateStr = `${data[data.length-1].time.toString().slice(0,4)}`;

			let series;

			if(type === 'Liquidity'){
				series = chart.addAreaSeries({ 
					lineColor, 
					topColor: areaTopColor, 
					bottomColor: areaBottomColor,
				 });
			}
			if(type === 'Volume (24hrs)'){
				series = chart.addHistogramSeries({ color: areaTopColor });
			}

			series.setData(data);
			window.addEventListener('resize', handleResize);
			chart.subscribeCrosshairMove((param)=>{
				if ( param === undefined || param.time === undefined || param.point.x < 0 || param.point.x > 800|| param.point.y < 0 || param.point.y > 800 ) {
					setChar(()=>{
						return (
							<div>
								{titleMarker ? (<div>{type}</div>) : (<div></div>) }   
								<div className='text-xl mt-2 font-medium'>{`${numberWithSpaces(data[data.length-1].value)} $`}</div>
								<div className='text-xs'>{dateStr}</div>
							</div>
						)
					})  
					
				} else {
					dateStr = param.time.toString() 
					let price: any = param.seriesData.get(series);
					setChar(()=>{
						return (                    
						<div>
							 {titleMarker ? (<div>{type}</div>) : (<div></div>) }   
							<div className='text-xl mt-2 font-medium text-text'>{`${numberWithSpaces(price.value)} $`}</div>
							<div className='text-xs text-text'>{dateStr}</div>
						</div>)
					})
				}
			})

			chart.priceScale('right').applyOptions({
				scaleMargins: {
					top: 0.3,
					bottom: 0,
				},
			});
			chart.applyOptions({
				crosshair:{
					mode: CrosshairMode.Magnet,
					vertLine: {
						width: 4,
						color: areaTopColor,
						style: LineStyle.Solid,
						labelBackgroundColor: areaTopColor,
					},
					horzLine: {
						color: areaTopColor,
						labelBackgroundColor: areaTopColor,
					},
				},
				localization: {
					priceFormatter: myPriceFormatter,
				},
			})
			


			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<>
		{data && 		(<div className='h-full text-text' ref={chartContainerRef} >
			<Comn titleMarker={titleMarker}  title={type}  char={useChar} data = {data}/>
		</div>) }
		</>

	);
};




const Comn = ({title,char, data, titleMarker})=>{
    return (
        <div className='-mb-20 p-3 text-text'>
            {char || (
			<div>
				{titleMarker ? (<div>{title}</div>) : (<div></div>) } 
				<div className='text-xl mt-2 font-medium text-text'>{`${numberWithSpaces(data[data.length-1]?.value)} $`}</div>
				<div className='text-xs text-text'>{data[data.length-1]?.time}</div>
			</div>
			)}
        </div>
    )
}