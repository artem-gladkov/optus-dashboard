import { createChart, ColorType, ISeriesApi, IChartApi, AreaData, HistogramSeriesOptions, CrosshairMode, LineStyle } from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import { numberWithSpaces } from '../../function/numberWithSpaces';
import Spinner from '../spinner/Spinner';

type typeCharts = 'Liquidity' | 'Volume (24hrs)'

export const ChartsOverview = (props: {titleMarker?: boolean, type: typeCharts, data: any; colors?: { backgroundColor?: "white"; lineColor?: "#2962FF"; textColor?: "black"; areaTopColor?: "#2962FF"; areaBottomColor?: "rgba(41, 98, 255, 0.28)"; }; }) => {
	
	const [useChar, setChar] = useState<JSX.Element>()
	
	const {
		titleMarker,
		type,
		data,
		colors: {
			backgroundColor = 'transparent',
			lineColor = '#bf3fb2d5',
			textColor = 'black',
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
				series = chart.addHistogramSeries({ color: '#bf3fb2d5' });
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
							<div className='text-xl mt-2 font-medium'>{`${numberWithSpaces(price.value)} $`}</div>
							<div className='text-xs'>{dateStr}</div>
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
						color: '#C3BCDB44',
						style: LineStyle.Solid,
						labelBackgroundColor: '#ee69faa4',
					},
					horzLine: {
						color: '#ee69faa4',
						labelBackgroundColor: '#ee69faa4',
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
		{data && 		(<div className='h-full' ref={chartContainerRef} >
			<Comn titleMarker={titleMarker}  title={type}  char={useChar} data = {data}/>
		</div>) }
		</>

	);
};




const Comn = ({title,char, data, titleMarker})=>{
    return (
        <div className='-mb-20 p-3'>
            {char || (
			<div>
				{titleMarker ? (<div>{title}</div>) : (<div></div>) } 
				<div className='text-xl mt-2 font-medium'>{`${numberWithSpaces(data[data.length-1]?.value)} $`}</div>
				<div className='text-xs'>{data[data.length-1]?.time}</div>
			</div>
			)}
        </div>
    )
}