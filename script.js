let currentPage = 1;
let reposPerPage = 10; 
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

            
            if (reposPerPageContainer) {
                reposPerPageContainer.style.display = 'block';
            }

            
            fetchRepositories(username, selectedReposPerPage);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            reposList.innerHTML = `Error fetching user data. ${error.message}`;
        });
}

function fetchRepositories(username, selectedReposPerPage) {
    
    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(userData => {
            const totalRepos = userData.public_repos;

            
            fetch(`https://api.github.com/users/${username}/repos?per_page=${selectedReposPerPage}&page=${currentPage}`)
                .then(response => response.json())
                .then(data => {
                    const reposList = document.getElementById('reposList');
                    reposList.innerHTML = ''; 

                    if (data.length > 0) {
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

                        createPagination(totalRepos, selectedReposPerPage);
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
            console.error('Error fetching repositories count:', error);
            reposList.innerHTML = 'Error fetching repositories count.';
        });
}



const reposPerPageSelect = document.getElementById('reposPerPageSelect');
reposPerPageSelect.addEventListener('change', () => {
    reposPerPage = parseInt(reposPerPageSelect.value);
    getRepos();
});

function createPagination(totalPages) {
    const paginationContainer = document.getElementById('paginationContainer');
    paginationContainer.innerHTML = '';

    const maxDisplayedPages = 5; 
    const middlePage = Math.ceil(maxDisplayedPages / 2);

    const startPage = Math.max(1, currentPage - middlePage + 1);
    const endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);

    const pagination = document.createElement('ul');
    pagination.className = 'pagination';

    for (let i = startPage; i <= endPage; i++) {
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
    card.className = 'col-md-5'; 

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
    

    card.appendChild(cardBody);

    return card;
}

