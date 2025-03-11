/// <reference types="vinxi/types/server" />
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server'
import { getRouterManifest } from '@tanstack/react-start/router-manifest'

import { createRouter } from './router'
import { streamHandler } from './ssr/streamHandler'

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(streamHandler)
