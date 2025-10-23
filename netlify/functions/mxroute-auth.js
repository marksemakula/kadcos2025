const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const { email, password } = JSON.parse(event.body);
        
        // Validate credentials by attempting to login to MXRoute webmail
        // This is a simplified example - you may need to adjust based on MXRoute's actual authentication
        const authResponse = await fetch('https://mail.mxlogin.com/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        });

        if (authResponse.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ 
                    success: true,
                    message: 'Authentication successful'
                })
            };
        } else {
            return {
                statusCode: 401,
                body: JSON.stringify({ 
                    success: false,
                    error: 'Invalid credentials'
                })
            };
        }
    } catch (error) {
        console.error('Auth error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                success: false,
                error: 'Authentication service unavailable'
            })
        };
    }
};