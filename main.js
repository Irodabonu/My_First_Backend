const express = require('express')
const app = express()

const auth = (req, res, next) => {
    const auth = {login: 'admin', password: 'admin'}
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')
    if (login && password && login === auth.login && password === auth.password) {
      res.send('Welcome, authenticated client')
      return next()
    }
    res.set('WWW-Authenticate', 'Basic realm="401"')
    res.status(401).send('401 Not authorized.')
}

app.get('/', (req, res) => {
  let arr = ['Air For English Horn', 'Alice Blue Gown', 'All Alone', 'All By Myself', 'All I Do Is Dream of You','All Alone',
  'All the Way', 
  'My Way',
  'New York, New York', 
  'Let it snow', 
  'Jingle Bells', 
  'yesterday', 
  'my fanny valentine', 
  'moon river', 
  'all my love',
  'blue moon',
  'young at heart',
  'fillings',
  'autmn in new york',
  'autimn leaves',
  'sway',
  'int impossible',
  'i love you, baby',
  'chicago']
    res.send(arr[Math.floor(Math.random() * arr.length)])
})
app.get('/birth_date', (req, res) => {
  res.send('December 12, 1915 ')
})
app.get('/birth_city', (req, res) => {
  res.send('Hoboken, NJ')
})
app.get('/wives', (req, res) => {
    res.send('Barbara Sinatra, Ava Gardner, Mia Farrow, Nancy Sinatra')
})
app.get('/picture', (req, res) => {
  res.redirect('https://upload.wikimedia.org/wikipedia/commons/a/af/Frank_Sinatra_%2757.jpg')
})
app.get('/public', (req, res) => {
    res.send('Everybody can see this page')
})
app.get('/protected', auth, (req, res) => {
    res.send('Welcome, authenticated client')
})
app.listen(8080, ()=>{
    console.log("App is running on port 8080");
})
