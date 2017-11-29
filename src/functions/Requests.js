export const postRequest = (cb) => {
    fetch('http://10.51.50.27/AUT_SFF/get.php', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then((req) => req.json())
    .then((res) => {
        cb(res);
    })
    .catch((error) => {
        console.error(error);
    });
}