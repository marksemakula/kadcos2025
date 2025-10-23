const fetch = require('node-fetch');

// Cookie jar to store session cookies
const cookieJar = new Map();

exports.handler = async function(event, context) {
    // Handle CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const { email, password, action = 'login' } = JSON.parse(event.body);
        
        if (action === 'login') {
            return await handleLogin(email, password, headers);
        } else if (action === 'check') {
            return await checkSession(email, headers);
        }
        
    } catch (error) {
        console.error('Proxy error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                success: false,
                error: 'Authentication service unavailable'
            })
        };
    }
};

async function handleLogin(email, password, headers) {
    try {
        // First, get the login page to obtain CSRF token and session cookies
        const initResponse = await fetch('https://mail.mxlogin.com/?_task=login', {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        const cookies = initResponse.headers.raw()['set-cookie'];
        let sessionCookies = '';
        
        if (cookies) {
            sessionCookies = cookies.map(cookie => cookie.split(';')[0]).join('; ');
        }

        // Extract the CSRF token from the response HTML
        const html = await initResponse.text();
        const tokenMatch = html.match(/name="_token" value="([^"]*)"/);
        const token = tokenMatch ? tokenMatch[1] : '';

        // Prepare login data
        const formData = new URLSearchParams();
        formData.append('_token', token);
        formData.append('_task', 'login');
        formData.append('_action', 'login');
        formData.append('_timezone', 'auto');
        formData.append('_url', '_task=mail');
        formData.append('_user', email);
        formData.append('_pass', password);

        // Perform login
        const loginResponse = await fetch('https://mail.mxlogin.com/?_task=login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cookie': sessionCookies,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://mail.mxlogin.com/?_task=login'
            },
            body: formData.toString(),
            redirect: 'manual'
        });

        // Check if login was successful by looking for redirect to mail interface
        const location = loginResponse.headers.get('location');
        const loginCookies = loginResponse.headers.raw()['set-cookie'];

        if (location && location.includes('_task=mail')) {
            // Store session for this email
            cookieJar.set(email, loginCookies ? loginCookies.map(c => c.split(';')[0]).join('; ') : sessionCookies);
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ 
                    success: true,
                    message: 'Login successful',
                    redirectUrl: 'https://mail.mxlogin.com/?_task=mail'
                })
            };
        } else {
            return {
                statusCode: 401,
                headers,
                body: JSON.stringify({ 
                    success: false,
                    error: 'Invalid email or password'
                })
            };
        }

    } catch (error) {
        console.error('Login error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                success: false,
                error: 'Login service unavailable'
            })
        };
    }
}

async function checkSession(email, headers) {
    const cookies = cookieJar.get(email);
    
    if (!cookies) {
        return {
            statusCode: 401,
            headers,
            body: JSON.stringify({ success: false, error: 'No active session' })
        };
    }

    try {
        const response = await fetch('https://mail.mxlogin.com/?_task=mail', {
            headers: {
                'Cookie': cookies,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (response.ok) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, message: 'Session valid' })
            };
        } else {
            cookieJar.delete(email);
            return {
                statusCode: 401,
                headers,
                body: JSON.stringify({ success: false, error: 'Session expired' })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ success: false, error: 'Session check failed' })
        };
    }
}