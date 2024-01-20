
// function getRepos() {
//     const username = document.getElementById('username').value;
//     const reposList = document.getElementById('reposList');
//     const userImage = document.getElementById('userImage');
//     const userName = document.getElementById('userName');
//     const userDetailsLink = document.getElementById('userDetailsLink');
//     const userFollowers = document.getElementById('userFollowers');
//     const userLocation = document.getElementById('userLocation');

//     fetch(`https://api.github.com/users/${username}?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET`)
//         .then(response => response.json())
//         .then(userData => {
//             // Set user details
//             userImage.src = userData.avatar_url;
//             userName.textContent = userData.name || username;
//             userDetailsLink.innerHTML = `<a href="${userData.html_url}" target="_blank">"${username}"</a>`;
//             userFollowers.textContent = `Followers: ${userData.followers}`;
//             userLocation.textContent = `Location: ${userData.location || 'Not specified'}`;

//             // Fetch repositories
//             fetch(`https://api.github.com/users/${username}/repos?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET`)
//                 .then(response => response.json())
//                 .then(data => {
//                     reposList.innerHTML = '';
//                     if (data.length > 0) {
//                         data.forEach(repo => {
//                             fetchLanguages(repo)
//                                 .then(languages => {
//                                     const repoCard = createRepoCard(repo, languages);
//                                     reposList.appendChild(repoCard);
//                                 })
//                                 .catch(error => {
//                                     console.error(`Error fetching languages for ${repo.name}:`, error);
//                                     const repoCard = createRepoCard(repo, []);
//                                     reposList.appendChild(repoCard);
//                                 });
//                         });
//                     } else {
//                         reposList.textContent = 'No repositories found.';
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error fetching repositories:', error);
//                     reposList.textContent = 'Error fetching repositories.';
//                 });
//         })
//         .catch(error => {
//             console.error('Error fetching user data:', error);
//             reposList.textContent = 'Error fetching user data.';
//         });
// }

// function fetchLanguages(repo) {
//     return fetch(`https://api.github.com/repos/${repo.full_name}/languages?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET`)
//         .then(response => response.json())
//         .then(data => Object.keys(data))
//         .catch(error => {
//             console.error(`Error fetching languages for ${repo.name}:`, error);
//             return [];
//         });
// }

// function createRepoCard(repo, languages) {
//     const card = document.createElement('div');
//     card.className = 'col-md-6'; // Set to 6 columns for two cards in a row

//     const cardBody = document.createElement('div');
//     cardBody.className = 'card mb-3';

//     const repoName = document.createElement('h5');
//     repoName.className = 'card-title';
//     repoName.textContent = repo.name;

//     const repoLanguages = document.createElement('div');
//     repoLanguages.className = 'card-languages';
//     languages.forEach(language => {
//         const languageBox = document.createElement('span');
//         languageBox.className = 'badge badge-secondary';
//         languageBox.textContent = language;
//         repoLanguages.appendChild(languageBox);
//     });

//     const repoDescription = document.createElement('p');
//     repoDescription.className = 'card-text';
//     repoDescription.textContent = repo.description || 'No description available.';

//     const repoLink = document.createElement('a');
//     repoLink.href = repo.html_url;
//     repoLink.className = 'btn btn-primary';
//     repoLink.textContent = 'View on GitHub';

//     cardBody.appendChild(repoName);
//     cardBody.appendChild(repoLanguages);
//     cardBody.appendChild(repoDescription);
//     cardBody.appendChild(repoLink);

//     card.appendChild(cardBody);

//     return card;
// }

// let currentPage = 1;
// let reposPerPage = 10; // Default: 10 repositories per page
// const maxReposPerPage = 100;
// let totalRepos = 0;


// function getRepos() {
//     const username = document.getElementById('username').value;
//     const reposList = document.getElementById('reposList');
//     const userImage = document.getElementById('userImage');
//     const userName = document.getElementById('userName');
//     const userDetailsLink = document.getElementById('userDetailsLink');
//     const userFollowers = document.getElementById('userFollowers');
//     const userLocation = document.getElementById('userLocation');
//     const reposPerPageContainer = document.getElementById('reposPerPageContainer');
//     const reposPerPageSelect = document.getElementById('reposPerPageSelect');

//     reposList.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>';
//     const selectedReposPerPage = parseInt(reposPerPageSelect.value);


//     fetch(`https://api.github.com/users/${username}?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET`)
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error(`Unable to fetch user data. Status: ${response.status}`);
//             }
//         })
//         .then(userData => {
//             // Set user details
//             console.log('User data:', userData);
//             userImage.src = userData.avatar_url;
//             userName.textContent = userData.name || username;
//             userDetailsLink.innerHTML = `<a href="${userData.html_url}" target="_blank">"${username}"</a>`;
//             userFollowers.textContent = `Followers: ${userData.followers}`;
//             userLocation.textContent = `Location: ${userData.location || 'Not specified'}`;

//             // reposPerPageContainer.style.display = 'block';
//             if (reposPerPageContainer) {
//                 reposPerPageContainer.style.display = 'block';
//             }

//             // Fetch repositories
//             fetch(`https://api.github.com/users/${username}/repos?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET`)
//                 .then(response => response.json())
//                 .then(data => {
//                     const totalRepos = data.length;
//                     const totalPages = Math.ceil(totalRepos / selectedReposPerPage);
//                     reposList.innerHTML = '';
//                     if (totalRepos > 0) {
//                         const startIndex = (currentPage - 1) * selectedReposPerPage;
//                         const endIndex = Math.min(startIndex + selectedReposPerPage, totalRepos);
        
//                         for (let i = startIndex; i < endIndex; i++) {
//                             const repo = data[i];
        
//                             fetchLanguages(repo)
//                                 .then(languages => {
//                                     const repoCard = createRepoCard(repo, languages);
//                                     reposList.appendChild(repoCard);
//                                 })
//                                 .catch(error => {
//                                     console.error(`Error fetching languages for ${repo.name}:`, error);
//                                     const repoCard = createRepoCard(repo, []);
//                                     reposList.appendChild(repoCard);
//                                 });
//                         }
        
//                         createPagination(totalPages);
//                     } else {
//                         reposList.textContent = 'No repositories found.';
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error fetching repositories:', error);
//                     reposList.textContent = 'Error fetching repositories.';
//                 });
//         })
//         .catch(error => {
//             console.error('Error fetching user data:', error);
//             reposList.textContent = 'Error fetching user data.';
//         });
// }

// const reposPerPageSelect = document.getElementById('reposPerPageSelect');
// reposPerPageSelect.addEventListener('change', () => {
//     reposPerPage = parseInt(reposPerPageSelect.value);
//     // currentPage = 1; // Reset to the first page when changing repositories per page
//     getRepos();
// });

// function createPagination(totalPages) {
//     const paginationContainer = document.getElementById('paginationContainer');
//     paginationContainer.innerHTML = '';

//     const pagination = document.createElement('ul');
//     pagination.className = 'pagination';

//     for (let i = 1; i <= totalPages; i++) {
//         const pageItem = document.createElement('li');
//         pageItem.className = `page-item ${currentPage === i ? 'active' : ''}`;

//         const pageLink = document.createElement('a');
//         pageLink.className = 'page-link';
//         pageLink.href = '#';
//         pageLink.textContent = i;
//         pageLink.addEventListener('click', () => changePage(i));

//         pageItem.appendChild(pageLink);
//         pagination.appendChild(pageItem);
//     }

//     paginationContainer.appendChild(pagination);
// }

// function changePage(newPage) {
//     currentPage = newPage;
//     getRepos();
// }
// function fetchLanguages(repo) {
//     return fetch(`https://api.github.com/repos/${repo.full_name}/languages?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET`)
//         .then(response => response.json())
//         .then(data => Object.keys(data))
//         .catch(error => {
//             console.error(`Error fetching languages for ${repo.name}:`, error);
//             return [];
//         });
// }


// function createRepoCard(repo, languages) {
//     const card = document.createElement('div');
//     // card.className = 'col-md-5'; // Set to 6 columns for two cards in a row

//     const cardBody = document.createElement('div');
//     cardBody.className = 'card';

//     const repoName = document.createElement('h5');
//     repoName.className = 'card-title';
//     repoName.textContent = repo.name;

//     const repoLanguages = document.createElement('div');
//     repoLanguages.className = 'card-languages';
//     languages.forEach(language => {
//         const languageBox = document.createElement('span');
//         languageBox.className = 'badge badge-secondary';
//         languageBox.textContent = language ;
//         repoLanguages.appendChild(languageBox);
//     });


//     const repoDescription = document.createElement('p');
//     repoDescription.className = 'card-text';
//     repoDescription.textContent = repo.description || 'No description available.';

//     const repoLink = document.createElement('a');
//     repoLink.href = repo.html_url;
//     repoLink.className = 'btn btn-primary';
//     repoLink.textContent = 'View on GitHub';

//     cardBody.appendChild(repoName);
//     cardBody.appendChild(repoDescription);
//     cardBody.appendChild(repoLanguages);
//     // cardBody.appendChild(repoLink);

//     card.appendChild(cardBody);

//     return card;
// }

let currentPage = 1;
let reposPerPage = 10; // Default: 10 repositories per page
const maxReposPerPage = 100;
let totalRepos = 0;


function getRepos() {
    const username = document.getElementById('username').value;
    const reposList = document.getElementById('reposList');
    const userImage = document.getElementById('userImage');
    const userName = document.getElementById('userName');
    const userDetailsLink = document.getElementById('userDetailsLink');
    const userFollowers = document.getElementById('userFollowers');
    const userLocation = document.getElementById('userLocation');
    const reposPerPageContainer = document.getElementById('reposPerPageContainer');
    const reposPerPageSelect = document.getElementById('reposPerPageSelect');

    reposList.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>';
    const selectedReposPerPage = parseInt(reposPerPageSelect.value);


    fetch(`https://api.github.com/users/${username}?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Unable to fetch user data. Status: ${response.status}`);
            }
        })
        .then(userData => {
            // Set user details
            console.log('User data:', userData);
            userImage.src = userData.avatar_url;
            userName.textContent = userData.name || username;
            userDetailsLink.innerHTML = `<a href="${userData.html_url}" target="_blank">"${username}"</a>`;
            userFollowers.textContent = `Followers: ${userData.followers}`;
            userLocation.textContent = `Location: ${userData.location || 'Not specified'}`;

            // reposPerPageContainer.style.display = 'block';
            if (reposPerPageContainer) {
                reposPerPageContainer.style.display = 'block';
            }

            // Fetch repositories
            fetch(`https://api.github.com/users/${username}/repos?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&page=${currentPage}&per_page=${selectedReposPerPage}`)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error(`Unable to fetch repositories. Status: ${response.status}`);
                    }
                })
                .then(data => {
                    reposList.innerHTML = ''; // Clear loader
                    const totalRepos = data.length;
                    const totalPages = Math.ceil(totalRepos / selectedReposPerPage);

                    if (totalRepos > 0) {
                        for (let i = 0; i < data.length; i++) {
                            const repo = data[i];

                            fetchLanguages(repo)
                                .then(languages => {
                                    const repoCard = createRepoCard(repo, languages);
                                    reposList.appendChild(repoCard);
                                })
                                .catch(error => {
                                    console.error(`Error fetching languages for ${repo.name}:`, error);
                                    const repoCard = createRepoCard(repo, []);
                                    reposList.appendChild(repoCard);
                                });
                        }

                        createPagination(totalPages);
                    } else {
                        reposList.innerHTML = 'No repositories found.';
                    }
                })
                .catch(error => {
                    console.error('Error fetching repositories:', error);
                    reposList.innerHTML = 'Error fetching repositories.';
                });
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            reposList.innerHTML = `Error fetching user data. ${error.message}`;
        });
}

const reposPerPageSelect = document.getElementById('reposPerPageSelect');
reposPerPageSelect.addEventListener('change', () => {
    reposPerPage = parseInt(reposPerPageSelect.value);
    // currentPage = 1; // Reset to the first page when changing repositories per page
    getRepos();
});

// function createPagination(totalPages) {
//     const paginationContainer = document.getElementById('paginationContainer');
//     paginationContainer.innerHTML = '';

//     const pagination = document.createElement('ul');
//     pagination.className = 'pagination';

//     for (let i = 1; i <= totalPages; i++) {
//         const pageItem = document.createElement('li');
//         pageItem.className = `page-item ${currentPage === i ? 'active' : ''}`;

//         const pageLink = document.createElement('a');
//         pageLink.className = 'page-link';
//         pageLink.href = '#';
//         pageLink.textContent = i;
//         pageLink.addEventListener('click', () => changePage(i));

//         pageItem.appendChild(pageLink);
//         pagination.appendChild(pageItem);
//     }

//     paginationContainer.appendChild(pagination);
// }

function createPagination(totalPages) {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    const pagination = document.createElement('ul');
    pagination.className = 'pagination';

    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = `page-item ${currentPage === i ? 'active' : ''}`;

        const pageLink = document.createElement('a');
        pageLink.className = 'page-link';
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => changePage(i));

        pageItem.appendChild(pageLink);
        pagination.appendChild(pageItem);
    }

    paginationContainer.appendChild(pagination);
}

function changePage(newPage) {
    currentPage = newPage;
    getRepos();
}
function fetchLanguages(repo) {
    return fetch(`https://api.github.com/repos/${repo.full_name}/languages?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET`)
        .then(response => response.json())
        .then(data => Object.keys(data))
        .catch(error => {
            console.error(`Error fetching languages for ${repo.name}:`, error);
            return [];
        });
}


function createRepoCard(repo, languages) {
    const card = document.createElement('div');
    card.className = 'col-md-5'; // Set to 6 columns for two cards in a row

    const cardBody = document.createElement('div');
    cardBody.className = 'card';

    const repoName = document.createElement('h5');
    repoName.className = 'card-title';
    repoName.textContent = repo.name;

    const repoLanguages = document.createElement('div');
    repoLanguages.className = 'card-languages';
    
    if(languages.length){
        languages.forEach(language => {
            const languageBox = document.createElement('span');
            languageBox.className = 'badge badge-secondary';
            
            languageBox.textContent = language ;
            repoLanguages.appendChild(languageBox);
        });
    }else{
        console.log(languages)
        const languageBox = document.createElement('span');
        languageBox.className = 'badge badge-secondary';
        languageBox.textContent='No langauge available.';
        repoLanguages.appendChild(languageBox);
    }


    const repoDescription = document.createElement('p');
    repoDescription.className = 'card-text';
    repoDescription.textContent = repo.description || 'No description available.';

    const repoLink = document.createElement('a');
    repoLink.href = repo.html_url;
    repoLink.className = 'btn btn-primary';
    repoLink.textContent = 'View on GitHub';

    cardBody.appendChild(repoName);
    cardBody.appendChild(repoDescription);
    cardBody.appendChild(repoLanguages);
    // cardBody.appendChild(repoLink);

    card.appendChild(cardBody);

    return card;
}


// let currentPage = 1;
// let reposPerPage = 10; // Default: 10 repositories per page
// const maxReposPerPage = 100;
// let totalRepos = 0;


// function getRepos() {
//     const username = document.getElementById('username').value;
//     const reposList = document.getElementById('reposList');
//     const userImage = document.getElementById('userImage');
//     const userName = document.getElementById('userName');
//     const userDetailsLink = document.getElementById('userDetailsLink');
//     const userFollowers = document.getElementById('userFollowers');
//     const userLocation = document.getElementById('userLocation');

//     reposList.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>';


//     fetch(`https://api.github.com/users/${username}?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET`)
//         .then(response => response.json())
//         .then(userData => {
//             // Set user details
//             userImage.src = userData.avatar_url;
//             userName.textContent = userData.name || username;
//             userDetailsLink.innerHTML = `<a href="${userData.html_url}" target="_blank">"${username}"</a>`;
//             userFollowers.textContent = `Followers: ${userData.followers}`;
//             userLocation.textContent = `Location: ${userData.location || 'Not specified'}`;

//             // Fetch repositories
            
//             fetch(`https://api.github.com/users/${username}/repos?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&page=${currentPage}&per_page=${reposPerPage}`)
//                 .then(response => {
//                     // const totalCountHeader = response.headers.get('Link');
//                     // totalRepos = totalCountHeader ? parseInt(totalCountHeader.match(/page=(\d+)>; rel="last"/)[1]) * reposPerPage : data.length;
//                     if (response.ok) {
//                         // const totalCountHeader = response.headers.get('Link');
//                         // totalRepos = totalCountHeader ? parseInt(totalCountHeader.match(/&page=(\d+)>; rel="last"/)[1]) * reposPerPage : data.length;

//                         return response.json();
//                     } else {
//                         throw new Error('Unable to fetch repositories.');
//                     }
//                 })
//                 .then(data => {
//                     reposList.innerHTML = ''; // Clear loader
//                     const totalRepos = data.length;
//                     const totalPages = Math.ceil(totalRepos / reposPerPage);
//                     // createPagination(totalPages);

//                     if (totalRepos > 0) {
//                         for (let i = 0; i < totalRepos; i++) {
//                             const repo = data[i];

//                             fetchLanguages(repo)
//                                 .then(languages => {
//                                     const repoCard = createRepoCard(repo, languages);
//                                     reposList.appendChild(repoCard);
//                                 })
//                                 .catch(error => {
//                                     console.error(`Error fetching languages for ${repo.name}:`, error);
//                                     const repoCard = createRepoCard(repo, []);
//                                     reposList.appendChild(repoCard);
//                                 });
//                         }

//                         createPagination(totalPages);
//                     } else {
//                         reposList.textContent = 'No repositories found.';
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error fetching repositories:', error);
//                     reposList.textContent = 'Error fetching repositories.';
//                 });
//         })
//         .catch(error => {
//             console.error('Error fetching user data:', error);
//             reposList.textContent = 'Error fetching user data.';
//         });
// }

// // function createPagination(totalPages) {
// //     const paginationContainer = document.getElementById('paginationContainer');
// //     paginationContainer.innerHTML = '';

// //     const pagination = document.createElement('ul');
// //     pagination.className = 'pagination';

// //     for (let i = 1; i <= totalPages; i++) {
// //         const pageItem = document.createElement('li');
// //         pageItem.className = `page-item ${currentPage === i ? 'active' : ''}`;

// //         const pageLink = document.createElement('a');
// //         pageLink.className = 'page-link';
// //         pageLink.href = '#';
// //         pageLink.textContent = i;
// //         pageLink.addEventListener('click', () => changePage(i));

// //         pageItem.appendChild(pageLink);
// //         pagination.appendChild(pageItem);
// //     }

// //     paginationContainer.appendChild(pagination);
// // }

// // function changePage(newPage) {
// //     currentPage = newPage;
// //     getRepos();
// // }

// function createPagination(totalPages) {
//     const paginationContainer = document.getElementById('paginationContainer');
//     paginationContainer.innerHTML = '';

//     const pagination = document.createElement('ul');
//     pagination.className = 'pagination';

//     for (let i = 1; i <= totalPages; i++) {
//         const pageItem = document.createElement('li');
//         pageItem.className = `page-item ${currentPage === i ? 'active' : ''}`;

//         const pageLink = document.createElement('a');
//         pageLink.className = 'page-link';
//         pageLink.href = '#';
//         pageLink.textContent = i;
//         pageLink.addEventListener('click', () => changePage(i));

//         pageItem.appendChild(pageLink);
//         pagination.appendChild(pageItem);
//     }

//     const perPageSelect = createPerPageSelect();
//     paginationContainer.appendChild(perPageSelect);
//     paginationContainer.appendChild(pagination);
// }

// function changePage(newPage) {
//     currentPage = newPage;
//     getRepos();
// }

// function changePerPage(newPerPage) {
//     reposPerPage = newPerPage;
//     currentPage = 1; // Reset to the first page when changing repositories per page
//     getRepos();
// }

// function createPerPageSelect() {
//     const perPageSelectContainer = document.createElement('div');
//     perPageSelectContainer.className = 'per-page-select mt-2';

//     const perPageLabel = document.createElement('label');
//     perPageLabel.textContent = 'Repos per page: ';

//     const perPageSelect = document.createElement('select');
//     perPageSelect.className = 'form-control';
//     perPageSelect.addEventListener('change', () => changePerPage(perPageSelect.value));

//     for (let i = 10; i <= maxReposPerPage; i += 10) {
//         const option = document.createElement('option');
//         option.value = i;
//         option.textContent = i;
//         perPageSelect.appendChild(option);
//     }

//     perPageSelect.value = reposPerPage; // Set the selected value based on current reposPerPage

//     perPageSelectContainer.appendChild(perPageLabel);
//     perPageSelectContainer.appendChild(perPageSelect);

//     return perPageSelectContainer;
// }
// function fetchLanguages(repo) {
//     return fetch(`https://api.github.com/repos/${repo.full_name}/languages?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET`)
//         .then(response => response.json())
//         .then(data => Object.keys(data))
//         .catch(error => {
//             console.error(`Error fetching languages for ${repo.name}:`, error);
//             return [];
//         });
// }


// function createRepoCard(repo, languages) {
//     const card = document.createElement('div');
//     card.className = 'col-md-5'; // Set to 6 columns for two cards in a row

//     const cardBody = document.createElement('div');
//     cardBody.className = 'card';

//     const repoName = document.createElement('h5');
//     repoName.className = 'card-title';
//     repoName.textContent = repo.name;

//     const repoLanguages = document.createElement('div');
//     repoLanguages.className = 'card-languages';
//     languages.forEach(language => {
//         const languageBox = document.createElement('span');
//         languageBox.className = 'badge badge-secondary';
//         languageBox.textContent = language ;
//         repoLanguages.appendChild(languageBox);
//     });


//     const repoDescription = document.createElement('p');
//     repoDescription.className = 'card-text';
//     repoDescription.textContent = repo.description || 'No description available.';

//     const repoLink = document.createElement('a');
//     repoLink.href = repo.html_url;
//     repoLink.className = 'btn btn-primary';
//     repoLink.textContent = 'View on GitHub';

//     cardBody.appendChild(repoName);
//     cardBody.appendChild(repoDescription);
//     cardBody.appendChild(repoLanguages);
//     // cardBody.appendChild(repoLink);

//     card.appendChild(cardBody);

//     return card;
// }

// let currentPage = 1;
// let reposPerPage = 10; // Default: 10 repositories per page
// const maxReposPerPage = 100;
// let totalRepos = 0;


// function getRepos() {
//     const username = document.getElementById('username').value;
//     const reposList = document.getElementById('reposList');
//     const userImage = document.getElementById('userImage');
//     const userName = document.getElementById('userName');
//     const userDetailsLink = document.getElementById('userDetailsLink');
//     const userFollowers = document.getElementById('userFollowers');
//     const userLocation = document.getElementById('userLocation');

//     reposList.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div>';


//     fetch(`https://api.github.com/users/${username}?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET`)
//         .then(response => response.json())
//         .then(userData => {
//             // Set user details
//             userImage.src = userData.avatar_url;
//             userName.textContent = userData.name || username;
//             userDetailsLink.innerHTML = `<a href="${userData.html_url}" target="_blank">"${username}"</a>`;
//             userFollowers.textContent = `Followers: ${userData.followers}`;
//             userLocation.textContent = `Location: ${userData.location || 'Not specified'}`;

//             // Fetch repositories
            
//             fetch(`https://api.github.com/users/${username}/repos?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET&page=${currentPage}&per_page=${reposPerPage}`)
//                 .then(response => {
//                     const totalCountHeader = response.headers.get('Link');
//                     totalRepos = totalCountHeader ? parseInt(totalCountHeader.match(/page=(\d+)>; rel="last"/)[1]) * reposPerPage : data.length;
//                     if (response.ok) {
//                         // const totalCountHeader = response.headers.get('Link');
//                         // totalRepos = totalCountHeader ? parseInt(totalCountHeader.match(/&page=(\d+)>; rel="last"/)[1]) * reposPerPage : data.length;

//                         return response.json();
//                     } else {
//                         throw new Error('Unable to fetch repositories.');
//                     }
//                 })
//                 .then(data => {
//                     reposList.innerHTML = ''; // Clear loader
//                     const totalRepos = data.length;
//                     const totalPages = Math.ceil(totalRepos / reposPerPage);
//                     // createPagination(totalPages);

//                     if (totalRepos > 0) {
//                         for (let i = 0; i < totalRepos; i++) {
//                             const repo = data[i];

//                             fetchLanguages(repo)
//                                 .then(languages => {
//                                     const repoCard = createRepoCard(repo, languages);
//                                     reposList.appendChild(repoCard);
//                                 })
//                                 .catch(error => {
//                                     console.error(`Error fetching languages for ${repo.name}:`, error);
//                                     const repoCard = createRepoCard(repo, []);
//                                     reposList.appendChild(repoCard);
//                                 });
//                         }

//                         createPagination(totalPages);
//                     } else {
//                         reposList.textContent = 'No repositories found.';
//                     }
//                 })
//                 .catch(error => {
//                     console.error('Error fetching repositories:', error);
//                     reposList.textContent = 'Error fetching repositories.';
//                 });
//         })
//         .catch(error => {
//             console.error('Error fetching user data:', error);
//             reposList.textContent = 'Error fetching user data.';
//         });
// }

// // function createPagination(totalPages) {
// //     const paginationContainer = document.getElementById('paginationContainer');
// //     paginationContainer.innerHTML = '';

// //     const pagination = document.createElement('ul');
// //     pagination.className = 'pagination';

// //     for (let i = 1; i <= totalPages; i++) {
// //         const pageItem = document.createElement('li');
// //         pageItem.className = `page-item ${currentPage === i ? 'active' : ''}`;

// //         const pageLink = document.createElement('a');
// //         pageLink.className = 'page-link';
// //         pageLink.href = '#';
// //         pageLink.textContent = i;
// //         pageLink.addEventListener('click', () => changePage(i));

// //         pageItem.appendChild(pageLink);
// //         pagination.appendChild(pageItem);
// //     }

// //     paginationContainer.appendChild(pagination);
// // }

// // function changePage(newPage) {
// //     currentPage = newPage;
// //     getRepos();
// // }

// function createPagination(totalPages) {
//     const paginationContainer = document.getElementById('paginationContainer');
//     paginationContainer.innerHTML = '';

//     const pagination = document.createElement('ul');
//     pagination.className = 'pagination';

//     for (let i = 1; i <= totalPages; i++) {
//         const pageItem = document.createElement('li');
//         pageItem.className = `page-item ${currentPage === i ? 'active' : ''}`;

//         const pageLink = document.createElement('a');
//         pageLink.className = 'page-link';
//         pageLink.href = '#';
//         pageLink.textContent = i;
//         pageLink.addEventListener('click', () => changePage(i));

//         pageItem.appendChild(pageLink);
//         pagination.appendChild(pageItem);
//     }

//     const perPageSelect = createPerPageSelect();
//     paginationContainer.appendChild(perPageSelect);
//     paginationContainer.appendChild(pagination);
// }

// // function changePage(newPage) {
// //     currentPage = newPage;
// //     getRepos();
// // }

// function changePage(newPage) {
//     currentPage = newPage;
//     getRepos();
// }


// function changePerPage(newPerPage) {
//     reposPerPage = newPerPage;
//     currentPage = 1; // Reset to the first page when changing repositories per page
//     getRepos();
// }

// function createPerPageSelect() {
//     const perPageSelectContainer = document.createElement('div');
//     perPageSelectContainer.className = 'per-page-select mt-2';

//     const perPageLabel = document.createElement('label');
//     perPageLabel.textContent = 'Repos per page: ';

//     const perPageSelect = document.createElement('select');
//     perPageSelect.className = 'form-control';
//     perPageSelect.addEventListener('change', () => changePerPage(perPageSelect.value));

//     for (let i = 10; i <= maxReposPerPage; i += 10) {
//         const option = document.createElement('option');
//         option.value = i;
//         option.textContent = i;
//         perPageSelect.appendChild(option);
//     }

//     perPageSelect.value = reposPerPage; // Set the selected value based on current reposPerPage

//     perPageSelectContainer.appendChild(perPageLabel);
//     perPageSelectContainer.appendChild(perPageSelect);

//     return perPageSelectContainer;
// }


// function createPerPageSelect() {
//     const perPageSelectContainer = document.createElement('div');
//     perPerPageSelectContainer.className = 'per-page-select mt-2';

//     const perPageLabel = document.createElement('label');
//     perPageLabel.textContent = 'Repos per page: ';

//     const perPageSelect = document.createElement('select');
//     perPageSelect.id = 'reposPerPageSelect';
//     perPageSelect.className = 'form-control';
//     perPageSelect.addEventListener('change', () => {
//         reposPerPage = parseInt(perPageSelect.value);
//         currentPage = 1; // Reset to the first page when changing repositories per page
//         getRepos();
//     });

//     for (let i = 10; i <= maxReposPerPage; i += 10) {
//         const option = document.createElement('option');
//         option.value = i;
//         option.textContent = i;
//         perPageSelect.appendChild(option);
//     }

//     perPageSelect.value = reposPerPage; // Set the selected value based on current reposPerPage

//     perPageSelectContainer.appendChild(perPageLabel);
//     perPageSelectContainer.appendChild(perPageSelect);

//     return perPageSelectContainer;
// }
// function fetchLanguages(repo) {
//     return fetch(`https://api.github.com/repos/${repo.full_name}/languages?client_id=YOUR_CLIENT_ID&client_secret=YOUR_CLIENT_SECRET`)
//         .then(response => response.json())
//         .then(data => Object.keys(data))
//         .catch(error => {
//             console.error(`Error fetching languages for ${repo.name}:`, error);
//             return [];
//         });
// }


// function createRepoCard(repo, languages) {
//     const card = document.createElement('div');
//     card.className = 'col-md-5'; // Set to 6 columns for two cards in a row

//     const cardBody = document.createElement('div');
//     cardBody.className = 'card';

//     const repoName = document.createElement('h5');
//     repoName.className = 'card-title';
//     repoName.textContent = repo.name;

//     const repoLanguages = document.createElement('div');
//     repoLanguages.className = 'card-languages';
//     languages.forEach(language => {
//         const languageBox = document.createElement('span');
//         languageBox.className = 'badge badge-secondary';
//         languageBox.textContent = language ;
//         repoLanguages.appendChild(languageBox);
//     });


//     const repoDescription = document.createElement('p');
//     repoDescription.className = 'card-text';
//     repoDescription.textContent = repo.description || 'No description available.';

//     const repoLink = document.createElement('a');
//     repoLink.href = repo.html_url;
//     repoLink.className = 'btn btn-primary';
//     repoLink.textContent = 'View on GitHub';

//     cardBody.appendChild(repoName);
//     cardBody.appendChild(repoDescription);
//     cardBody.appendChild(repoLanguages);
//     // cardBody.appendChild(repoLink);

//     card.appendChild(cardBody);

//     return card;
// }