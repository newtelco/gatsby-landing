// COPY AND PASTE INTO CLOUDFLARE WORKER (FREE TIER)
// MAKE SURE TO GeT A DARKSKY API KEY AND INSERT BELOW

async function getWeatherDetails (hostname) {
  const key = 'DARKSKY_API_KEY'
  const latlong = '50.1001783,8.6245715' // Frankfurt am Main, Germany

  const response = await fetch(`https://api.darksky.net/forecast/${key}/${latlong}?units=si`, {
    headers: {
      'Access-Control-Allow-Origin': hostname,
      'Content-Type': 'application/json'
    },
    crossdomain: true
  })
    .then(resp => resp.json())
    .then((data) => {
      const responseVar = {
        forecast: []
      }
      data.daily.data.forEach((day, index) => {
        if (index < 3) {
          responseVar.forecast.push(day)
        }
      })
      responseVar.current = data.currently
      return responseVar
    })
    .catch(err => console.error(err))

  return response
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Origin': "https://yourdomain",
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

async function handleRequest (request) {
  const url = new URL(request.url)
  const hostname = url.hostname
  const details = await getWeatherDetails(hostname)
  return new Response(JSON.stringify(details), {
    headers: corsHeaders,
    status: 200
  })
}

addEventListener('fetch', event => {
  if (event.request.method !== 'PUT' || event.request.method !== 'DELETE') {
    return event.respondWith(handleRequest(event.request))
  } else {
    return new Response(null, {
      status: 405,
      statusText: 'Method Not Allowed'
    })
  }
})
