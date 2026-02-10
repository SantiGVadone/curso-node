import cors from 'cors'

const ACCEPTED_ORIGINS = [
    'http://localhost:3000',
    'http://192.168.1.33:3000'
]

export const corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {}) => cors({
    origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin)) {
            callback(null, true)
        } 
        if (!origin) {
            callback(null, true)
        }
        callback(new Error('Not allowed by CORS'))
    }
})