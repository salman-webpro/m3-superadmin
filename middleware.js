import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export function middleware(request) {
    const cookieStore = cookies()

    if(cookieStore.has('accessToken') && cookieStore.has('refreshToken')){
        return NextResponse.next()
    }

    return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
    matcher: ['/', '/activity-log', '/all-restaurants/:path*'],
}
