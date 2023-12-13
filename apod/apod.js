const clearDisplay = () => {
    const display = document.querySelector('#display');
    while(display.firstChild) {
        display.firstChild.remove();
    }
}


const displayError = error => {
    clearDisplay();
    const display = document.querySelector('#display');
    const span = document.createElement('span');
    span.setAttribute('class', 'error');
    const text = document.createTextNode(error);
    span.appendChild(text);
    display.appendChild(span);
}

const displayData = data => {
    console.log(data);
    clearDisplay();
    const display = document.querySelector('#display')
    const h3 = document.createElement('h3');
    const title = document.createTextNode(data.title)
    h3.appendChild(title);
    display.appendChild(h3)

    switch(data.media_type) {
        case 'image':
            const img = document.createElement('img');
            img.setAttribute('src', data.url);
            img.setAttribute('width', 500);
            img.setAttribute('alt', 'NASA Photo')
            display.appendChild(img);
            break;
        case 'video':
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', data.url);
            iframe.setAttribute('width', 640);
            iframe.setAttribute('height', 360);
            iframe.setAttribute('frameborder', 0);
            iframe.setAttribute('allowfullscreen', true);
            display.appendChild(iframe);
            break;
        default:
            const none = document.createElement('img');
            img.setAttribute('src', data.url);
            img.setAttribute('width', 640);
            img.setAttribute('alt', 'NASA Photo')
            display.appendChild(none);
    }
    
    const p = document.createElement('p');
    const expl = document.createTextNode(data.explanation);
    p.appendChild(expl);
    display.appendChild(p);
    
}

const displayPicture = data => {
    if (data.error) {
        displayError(data.error.message);
    } else if (data.code) {
        displayError(date.msg);
    } else {
        displayData(data);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#view-button').addEventListener('click', () => {
        const dateTextBox = document.querySelector('#date');
        const dateStr = dateTextBox.value;

        if (dateStr) {
            fetch(`https://api.nasa.gov/planetary/apod?api_key=qgyVuFkJoalPjd8tbnZMoVIfYBS4WH9bXqL4tuOw&date=${dateStr}`)
                .then(response => response.json())
                .then(json => displayPicture(json))
                .catch(error => displayError(error.message));
        } else {
            displayError('Please choose a date.')
        }
    })
})