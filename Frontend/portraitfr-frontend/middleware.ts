import { NextResponse } from 'next/server'

interface MiddlewareRequest {
    signal: AbortSignal;
}

export function middleware(request: Request): NextResponse {
    const timeout = 30000 // 30s timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeout)

    const response = NextResponse.next()

    // Nettoyage
    response.headers.set('Connection', 'keep-alive')
    response.headers.set('Keep-Alive', 'timeout=30')

    clearTimeout(timeoutId)
    return response
}

export const config = {
  matcher: '/api/notion/:route*',
}