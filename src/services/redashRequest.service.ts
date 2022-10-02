import axios from 'axios'
import { Request } from 'express'
import config from '../config/config'

const { redashUrl } = config

export async function sendRedashRequest (req: Request): Promise<{
  response: Object
  status: number
}> {
  const originalUrl = req.originalUrl
  let response: { [key: string]: any } = {}
  let status = 200
  await axios
    .get(getRedashUrl(originalUrl))
    .then((res) => {
      response = res.data
      status = res.status
    })
    .catch((e) => {
      response = e.response.data
      status = e.response.status
    })
  return {
    response: response,
    status: status
  }
}

function getRedashUrl (url: string): string {
  const redashSlug = url.split('/proxy')[1]
  return redashUrl + redashSlug
}
