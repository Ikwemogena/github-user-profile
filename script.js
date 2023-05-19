const apiURL = 'https://api.github.com/users/';

// all elements
const container = document.getElementById('container');
const username = document.getElementById('username');
const avatar = document.getElementById('avatar');
const name = document.getElementById('bio');
const form = document.getElementById('form');

const notFound = document.querySelector('.not-found');

const profile = document.querySelector('.profile-card');

const followers = document.getElementById('followers');
const following = document.getElementById('following');
const repos = document.getElementById('repos');

form.addEventListener('submit', (e) => {
    e.preventDefault();    

    const nameInput = document.getElementById('name-input').value;

    getUsers(nameInput);
    form.reset();
});

// fetch from api
function getUsers(nameInput) {
    // console.log(nameInput)
    fetch(apiURL + nameInput)
    .then(res => res.json(
        console.log(res)
    )) // parse the response into json
    .then(data => {
        console.log(data);
        
        // check if the user exists
        if (data.message === 'Not Found') {
            notFound.classList.remove('hidden');
            console.log('user not found');
            profile.classList.add('hidden');
            // alert('User not found');
        } else {
            console.log('user found');
            notFound.classList.add('hidden');
            displayUser(data);
        }
    })
    .catch(error => console.log(error)); // catch any errors
}


function displayUser(user) {
    console.log(username);

    profile.classList.remove('hidden');

    username.textContent = user.name;
    name.textContent = user.login
    followers.textContent = `${ user.followers } followers`;
    following.textContent = `${ user.following } following`;
    repos.textContent =  `${ user.public_repos } repositories`;
    avatar.src = user.avatar_url;
    avatar.alt = user.name;
}