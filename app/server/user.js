// USER
// ==============================================================

module.exports = (req, res, next) => {
    // Random user data provided by https://randomuser.me/
    const userData = {
        gender: 'male',
        name: {
            title: 'mr',
            first: 'elijah',
            last: 'scott'
        },
        location: {
            street: '6523 depaul dr',
            city: 'naperville',
            state: 'oregon',
            postcode: 82336
        },
        email:'elijah.scott@example.com',
        registered: '2007-07-03 12:50:07',
        phone: '(324)-005-9610',
        cell: '(629)-251-4187',
        picture: {
            large: 'https://randomuser.me/api/portraits/men/35.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/35.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/men/35.jpg'
        },
        nat: 'US'
    };
    res.send(userData);
};