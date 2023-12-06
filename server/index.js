const { default: axios } = require('axios');
const express = require('express')
const app = express()
const port = 3001

const fetchSteamGrid = async (url, header) => {
  let res = await axios.get(`https://www.steamgriddb.com${url}`, {
    headers: {
      "Accept": "application/json",
      'Authorization': `${header}`
    }
  });
  return res.data;
}

const proxyImage = async(url) => {
  return await axios.get(`https://cdn2.steamgriddb.com${url}`, {
    responseType: 'stream'
  });
}

app.get('/api/*', async (req, res) => {
  let originalUrl = req.originalUrl;
  res.send(await (fetchSteamGrid(originalUrl, req.headers.authorization)));
})

app.get(['/thumb/*', '/grid/*'], async (req, res) => {
  let originalUrl = req.originalUrl;
  let cdnRes = await proxyImage(originalUrl);
  res.set({
    'Content-Type': cdnRes.headers['content-type']
  })
  cdnRes.data.pipe(res)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})