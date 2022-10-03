import config from './config/config'
import app from './app'

const { appName, port } = config

app.listen(port, () =>
  console.log(`${appName} Server Now Listening on ${port}. Stay Sovryn.`)
)
