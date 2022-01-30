const axios = require('axios');

const getItems = () => {
    return axios.get('http://localhost:3000/item')
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}
const order = (email, items) => {
    return axios.post('http://localhost:3000/order', {
        email: email,
        items: items.map(item => item.id)
    }).then(function (response) {
        alert("Your order was placed")
        console.log(response)
    })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

const getCategories = () => {
    return axios.get('http://localhost:3000/category')
        .then(function (response) {
            // handle success
            return response;
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

const getItemsInCategory = (id) => {
    return axios.get('http://localhost:3000/category/' + id)
        .then(function (response) {
            // handle success
            return response;
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
}

export {
    getItems,
    getCategories,
    getItemsInCategory,
    order
}
