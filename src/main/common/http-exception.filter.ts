import type {
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common'
import {
  Catch,
  HttpException,
} from '@nestjs/common'
import type { Request, Response } from 'express'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception.getStatus()
    const error = exception.getResponse()

    response.status(status).json({
      statusCode: status,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
