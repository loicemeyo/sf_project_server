import { App } from './app'
import { getConfig } from './config'

const config = getConfig()

const app = new App()

app.start(config.port)