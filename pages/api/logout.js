import { API_URL } from "@/config/index";
import cookie from 'cookie';

export default async (req, res) => {
    if (req.method === 'POST') {

        res.setHeader('Set-Cookie', cookie.serialize('token', '', {
            httpOnly: true,
            // https
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0),
            // sameSite -> properti yang dapat diatur dalam cookie HTTP untuk mencegah serangan Cross Site Request Forgery (CSRF) 
            // Nilai Strict bahwa cookie dikirim dalam permintaan hanya dalam situs yang sama.
            sameSite: 'strict',
            path: '/',
        }))

        res.status(200).json({message: 'Success'})

        } else {
            res.setHeader('Allow', 'POST');
            req.status(405).json({ message: `Method ${req.method} not allowed` });
        }
}