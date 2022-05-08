/* --- Data Structures --- */
const hotels = [
    {
        'name': 'Lakewood',
        'rating': 3,
        'regular': {
            'weekdayFee': 110,
            'weekendFee': 90
        },
        'rewards': {
            'weekdayFee': 80,
            'weekendFee': 80
        }            
    },
    {
        'name': 'Bridgewood',
        'rating': 4,
        'regular': {
            'weekdayFee': 160,
            'weekendFee': 60
        },
        'rewards': {
            'weekdayFee': 110,
            'weekendFee': 50
        }           
    },
    {
        'name': 'Ridgewood',
        'rating': 5,
        'regular': {
            'weekdayFee': 220,
            'weekendFee': 150
        },
        'rewards': {
            'weekdayFee': 100,
            'weekendFee': 40
        }          
    }  
]

const weekend = [ 'sat', 'sun' ]

/* --- Functions --- */

/* 
    * Helper function for provide the corresponding day of the week given an input date
    * Input: Date in format '16Mar2009(mon)'
    * Output: The day of the week that was between parentheses in the input date
*/
function getDayOfWeek(date) {
    const regExp = /\(([^)]+)\)/
    return regExp.exec(date)[1]
}

/* 
    * Helper function to find out what type of fee each day of the week will have (weekday or weekend fee)
    * Input: Array with the days of the week
    * Output: Array with the types of fees to be charged
*/
function getFeeTypes(daysOfWeek) {
    let feeTypes = []

    daysOfWeek.map((day) => {
        weekend.includes(day) ? feeTypes.push('weekendFee') : feeTypes.push('weekdayFee')
    })

    return feeTypes
}

/* 
    * Helper function to handle the input and return the data of interest
    * Input: String in format 'Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)'
    * Output: An object containing the type of customer and the days of the week that the customer wants to stay
*/
function handleInput(input) {
    const inputParts = input.split(':')
    const clientType = inputParts[0].toLowerCase()
    const daysOfWeek = inputParts[1].trim().split(',').map((date) => {
        return getDayOfWeek(date)
    })

    return { clientType, daysOfWeek }
}

/* 
    * Main function to get the cheapest hotel option for a given date
    * Input: String in format 'Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)'
    * Output: The name of the cheapest hotel
*/
function getCheapestHotel (input) { 
    const { clientType, daysOfWeek } = handleInput(input)
    const feeTypes = getFeeTypes(daysOfWeek)

    let cheapestHotel = {
        'name': 'default',
        'totalFee': 0,
        'rating': 0
    }

    hotels.map((hotel, index) => {
        let totalFee = 0
        const fees = hotel[clientType]

        feeTypes.map((feeType) => {
            totalFee += fees[feeType]
        })

        const firstHotel = index === 0 // no caso do primeiro hotel precisamos sempre povoar nossa estrutura para termos com quem comparar
        const betterFee = cheapestHotel.totalFee > totalFee
        const equalFeeBetterRating = cheapestHotel.totalFee === totalFee && cheapestHotel.rating < hotel.rating

        if (firstHotel || ( betterFee || equalFeeBetterRating)) {
            cheapestHotel.totalFee = totalFee
            cheapestHotel.rating = hotel.rating
            cheapestHotel.name = hotel.name
        }

    })

    return cheapestHotel.name
}

exports.getCheapestHotel = getCheapestHotel
