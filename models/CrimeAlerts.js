export default class CrimeAlerts {

  async getAlertsFor(latitude, longitude) {
    const url = `https://polar-atoll-37033.herokuapp.com/userData?latitude=${latitude}&longitude=${longitude}`
    console.log(`Requesting crime data from ${url}`)
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(response.error)
    }

    const result = await response.json()
    const crime = result.crime
    if (crime === 'none') {
      console.log('No crime data at this location')
    } else {
      return crime
    }
  }
}
