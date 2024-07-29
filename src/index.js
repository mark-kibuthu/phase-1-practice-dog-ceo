document.addEventListener('DOMContentLoaded', () => {
    console.log('%c HI', 'color: firebrick'); 
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imageContainer = document.getElementById('dog-image-container');
    const breedList = document.getElementById('dog-breeds');
    const breedDropdown = document.getElementById('breed-dropdown');

    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error('Error fetching dog images:', error));

    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = data.message;
            for (let breed in breeds) {
                const li = document.createElement('li');
                li.textContent = breed;
                li.addEventListener('click', () => {
                    li.style.color = 'blue';
                });
                breedList.appendChild(li);
            }
        })
        .catch(error => console.error('Error fetching dog breeds:', error));

    breedDropdown.addEventListener('change', (event) => {
        const selectedLetter = event.target.value;
        const breedItems = breedList.getElementsByTagName('li');
        for (let i = 0; i < breedItems.length; i++) {
            const breed = breedItems[i].textContent;
            if (selectedLetter === 'all' || breed.startsWith(selectedLetter)) {
                breedItems[i].style.display = '';
            } else {
                breedItems[i].style.display = 'none';
            }
        }
    });
});
