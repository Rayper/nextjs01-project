import cookie from 'cookie'

export function parseCookies(req) {
    // else return '' else if return ''
    return cookie.parse(req ? req.headers.cookie || '' : '')
}