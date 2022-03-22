import { API_URL } from "@/config/index";
import cookie from 'cookie';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { identifier, password } = req.body;
        const strapiRes = await fetch(`${API_URL}/auth/local`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, password }),
        });

        const data = await strapiRes.json();

        // nampilin jwt pada log
        console.log(data.jwt);
    
        if (strapiRes.ok) {
            // set Cookie
            // kirim data.jwt ke cookie
            res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
                httpOnly: true,
                // https
                secure: process.env.NODE_ENV !== 'development',
                // berapa lama session-nya
                maxAge: 60 * 60 * 24 * 7,
                // sameSite -> properti yang dapat diatur dalam cookie HTTP untuk mencegah serangan Cross Site Request Forgery (CSRF) 
                // Nilai Strict bahwa cookie dikirim dalam permintaan hanya dalam situs yang sama.
                sameSite: 'strict',
                path: '/',
            }))

            res.status(200).json({ user: data.user });
        } else {
            res
            .status(data.statusCode)
            .json({ message: data.message[0].messages[0].message });
        }
        } else {
            res.setHeader('Allow', 'POST');
            req.status(405).json({ message: `Method ${req.method} not allowed` });
        }
}