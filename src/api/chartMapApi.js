export const fetchCovidData = async () => {
    const response = await fetch(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`)
    const data = await response.json();
    return data
}