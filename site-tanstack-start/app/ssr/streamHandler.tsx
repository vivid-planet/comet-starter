//based on packages/react-start-server/src/defaultStreamHandler.tsx
import { PassThrough } from 'node:stream'
import { isbot } from 'isbot'
import ReactDOMServer from 'react-dom/server'
import type { ReadableStream } from 'node:stream/web'
import { defineHandlerCallback, StartServer } from '@tanstack/react-start/server'
import { transformPipeableStreamWithRouter, transformReadableStreamWithRouter } from './transformStreamWithRouter'
import { ServerStyleSheet } from 'styled-components'

export const streamHandler = defineHandlerCallback(
  async ({ request, router, responseHeaders }) => {
    const sheet = new ServerStyleSheet();

    if (typeof ReactDOMServer.renderToReadableStream === 'function') {
      const stream = await ReactDOMServer.renderToReadableStream(
        sheet.collectStyles(<StartServer router={router} />),
        {
          signal: request.signal,
        },
      )

      if (isbot(request.headers.get('User-Agent'))) {
        await stream.allReady
      }

      const responseStream = transformReadableStreamWithRouter(
        router,
        stream as unknown as ReadableStream,
      )

      return new Response(responseStream as any, {
        status: router.state.statusCode,
        headers: responseHeaders,
      })
    }

    if (typeof ReactDOMServer.renderToPipeableStream === 'function') {
      const reactAppPassthrough = new PassThrough()

      try {
        const pipeable = ReactDOMServer.renderToPipeableStream(
            sheet.collectStyles(<StartServer router={router} />),
          {
            ...(isbot(request.headers.get('User-Agent'))
              ? {
                  onAllReady() {
                    pipeable.pipe(reactAppPassthrough)
                  },
                }
              : {
                  onShellReady() {
                    pipeable.pipe(reactAppPassthrough)
                  },
                }),
            onError: (error, info) => {
              console.error('Error in renderToPipeableStream:', error, info)
            },
          },
        )
      } catch (e) {
        console.error('Error in renderToPipeableStream:', e)
      }

      const responseStream = transformPipeableStreamWithRouter(
        router,
        reactAppPassthrough,
      )
      const interleavedStream = sheet.interleaveWithNodeStream(responseStream);

      return new Response(interleavedStream as any, {
        status: router.state.statusCode,
        headers: responseHeaders,
      })
    }

    throw new Error(
      'No renderToReadableStream or renderToPipeableStream found in react-dom/server. Ensure you are using a version of react-dom that supports streaming.',
    )
  },
)