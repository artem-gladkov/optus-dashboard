export const numberColor = (number: number) => {
        if(number >=0) {
            return "text-green-700"
        }
        if(number < 0){
            return "text-red-600 "
        }
        return ""
}