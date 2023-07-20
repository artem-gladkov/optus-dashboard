import { createChart, ColorType, CrosshairMode, LineStyle } from 'lightweight-charts';
import  { useEffect, useRef } from 'react';
import Spinner from '../spinner/Spinner';


interface Props {
    data: {time:string , open: number, close: number, high: number, low: number}[]
}

export const ChartsForm = ({data}: Props) => {


    const chartContainerRef = useRef();
    const errorRef = useRef()
    useEffect(()=>{
        if(data.length > 0) {
            const handleResize = () => {
                chart.applyOptions({ 
                    width: chartContainerRef['current' || ''].clientWidth,
                    height: chartContainerRef['current' || ''].clientHeight,
                 });
            };
    
    
    
            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: 'transparent' },
                    textColor: '#6A637A',
                },
                width: chartContainerRef['current' || ''].clientWidth,
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
    
            var candleSeries = chart.addCandlestickSeries({
                wickUpColor: '#0a6302',
                upColor: '#0a6302',
                wickDownColor: '#f00',
                downColor: '#f00',
                borderVisible: false,      
              });
              candleSeries.setData(data)
              
              chart.applyOptions({
                crosshair:{
                    mode: CrosshairMode.Normal,
                    vertLine: {
                        width: 4,
                        color: '#7602eb',
                        style: LineStyle.Solid,
                        labelBackgroundColor: '#7602eb',
                    },
                    horzLine: {
                        color: '#7602eb',
                        labelBackgroundColor: '#7602eb',
                    },
                },
    
            })
              window.addEventListener('resize', handleResize)
    
              return () => {
                window.removeEventListener('resize', handleResize);
                chart.remove();
            }
    
        }


    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
            <>
                { data.length > 0 ? (
                    <div className='h-full' ref={chartContainerRef}>
                        
                    </div>
                ) : (
                    <div className='h-full flex text-text items-center justify-center' ref={errorRef} >
                      <Spinner />
                    </div>
                )}
            </>
    )
}


