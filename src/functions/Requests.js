export const postRequest = (cb) => {
    fetch('https://aut-sff.afink.at/backend/', {
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