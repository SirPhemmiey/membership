let clientId = "0oafzf19xzwBnd4bS0h7";
// export default {
//     url: 'https://dev-572184-admin.oktapreview.com',
//     issuer: 'https://dev-572184.oktapreview.com/oauth2/default',
//     redirect_uri: window.location.origin + '/implicit/callback',
//     client_id: `${clientId}`
// }

const config = {
    url: 'https://dev-572184.oktapreview.com',
    issuer: 'https://dev-572184.oktapreview.com/oauth2/default',
    redirect_uri: window.location.origin + '/implicit/callback',
    client_id: `${clientId}`
}

export default config;