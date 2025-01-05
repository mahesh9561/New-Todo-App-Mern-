import { useState } from 'react';
// import jwtDecode from 'jwt-decode';
import {jwtDecode} from 'jwt-decode'

function useDecodeJWT() {
    const [decodedToken, setDecodedToken] = useState(null);
    const [error, setError] = useState(null);

    const decodeToken = (token) => {
        try {
            const decoded = jwtDecode(token);
            setDecodedToken(decoded);
            setError(null);
        } catch (err) {
            setDecodedToken(null);
            setError('Invalid or expired token.');
        }
    };

    return { decodedToken, decodeToken, error,setError };
}

export default useDecodeJWT;
