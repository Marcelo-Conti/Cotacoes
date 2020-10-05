const request = require('request')

const access_key = '55ba0530e4c680abd4c044496fcea427'

const cotacao = (symbol, callback) => {
    const url = `http://api.marketstack.com/v1/eod?access_key=${access_key}&symbols=${symbol}`

    request({ url: url }, (err, response) => {
        if (err) {
            callback({
                message: `Erro: ${err}`}, undefined)
        }
        
        const parsedJSON = JSON.parse(response.body)

        if(parsedJSON.data === undefined){
            callback({
                message: `Cotação não localizada!`
            }, undefined)
        }

        const data = {
            symbol: parsedJSON.data[0].symbol,
            date: parsedJSON.data[0].date,
            open: parsedJSON.data[0].open,
            high: parsedJSON.data[0].high,
            low: parsedJSON.data[0].low            
        }
        callback(data, null)
    })
}

module.exports = cotacao