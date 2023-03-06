import React from 'react'

export const timeTransactions = (t) => {
  


      
    

        const years = Math.floor(t / (1000 * 60 * 60 * 24 * 30 * 12));
        const months = Math.floor(t / (1000 * 60 * 60 * 24 * 30) % 12);
        const days = Math.floor(t / (1000 * 60 * 60 * 24) % 30);
        const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((t / (1000 * 60)) % 60);
        const seconds = Math.floor((t / 1000) % 60);
        const furstIndex: number[] = []
        const mass =  [years, months, days, hours, minutes, seconds]


        console.log(mass)
        return `${minutes} minutes ago`
        // if(furstIndex[0] === 0){return `${years} years ago`}
        // if(furstIndex[0] === 1){return `${months} months ago`} 
        // if(furstIndex[0] === 2){return `${days} days ago`} 
        // if(furstIndex[0] === 3){return `${hours} hours ago`} 
        // if(furstIndex[0] === 4){return `${minutes} minutes ago`} 
        // if(furstIndex[0] === 5){return `${seconds} seconds ago`}  
 
}

