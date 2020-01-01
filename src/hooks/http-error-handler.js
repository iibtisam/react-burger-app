import {useEffect, useState} from 'react';

export default httpClient => {

    const [error, setError] = useState(null);
        const requestInterceptors = httpClient.interceptors.request.use(req => {
            setError(null)
            return req;
        });
        const responseInterceptors = httpClient.interceptors.response.use(res => res, err => {
            console.log(err);
            window.asdasd = err;
            setError(err.message);
        })


        useEffect(() => {
            return () => {
                httpClient.interceptors.response.eject(responseInterceptors);
                httpClient.interceptors.request.eject(requestInterceptors);
            }

        }, [responseInterceptors, requestInterceptors, httpClient.interceptors.request, httpClient.interceptors.response]);

        const errorConfirmedError = () => {
            setError(null);
        };

        return [error, errorConfirmedError];
}