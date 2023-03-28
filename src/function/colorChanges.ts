export const numberColor = (number: number) => {
        if(number >=0) {
            return "text-numberGreen"
        }
        if(number < 0){
            return "text-numberRed "
        }
        return ""
}