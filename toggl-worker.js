async function startTogglTimer (key) {
  const query = await fetch('https://www.toggl.com/api/v8/time_entries/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${key}:api_token`)}`
    },
    body: JSON.stringify({
      time_entry: {
        description: 'Newtelco - Work',
        tags: ['Newtelco', 'AutoAdded'],
        created_with: 'Newtelco Home'
      }
    })
  })
    .then(resp => resp.json())
    .then((data) => {
      return data
    })
    .catch(err => console.error(err))
  return query
}

async function stopTogglTimer (key) {
  const query = await fetch('https://www.toggl.com/api/v8/time_entries/current', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${key}:api_token`)}`
    }
  })
    .then(resp => resp.json())
    .then(async response => {
      const currentId = response.data.id
      await fetch(`https://www.toggl.com/api/v8/time_entries/${currentId}/stop`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`${key}:api_token`)}`
        }
      })
        .then(resp => resp.json())
        .then((data) => {
          return data
        })
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  return query
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  // 'Access-Control-Allow-Origin': "https://home.newtelco.de",
  'Access-Control-Allow-Methods': 'GET, HEAD, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}

async function handleRequest (request) {
  const url = new URL(request.url)
  const params = new URLSearchParams(url.search)
  const key = params.get('key')
  const action = params.get('action')
  const returnData = (resp) => {
    return new Response(JSON.stringify(resp), {
      headers: corsHeaders,
      status: 200
    })
  }

  if (action === 'start') {
    const resp = await startTogglTimer(key)
    return returnData(resp)
  } else if (action === 'stop') {
    const resp = await stopTogglTimer(key)
    return returnData(resp)
  }
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
