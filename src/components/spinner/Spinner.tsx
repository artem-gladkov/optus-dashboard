import React from 'react'

interface Props {
    
}

const Spinner = (props: Props) => {
    return (
        <div className="spinner-box flex w-full h-full justify-center items-center">
            <div className="pulse-container">  
                <div className="pulse-bubble pulse-bubble-1"></div>
                <div className="pulse-bubble pulse-bubble-2"></div>
                <div className="pulse-bubble pulse-bubble-3"></div>
            </div>
        </div>
    )
}

export default Spinner
