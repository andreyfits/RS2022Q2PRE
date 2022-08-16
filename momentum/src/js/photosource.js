/* eslint-disable no-undef */
export default async (src) => {
    let imgUrl, postUrl, query, key, url, response, data;

    if (src === 'unsplash') {
        imgUrl = 'https://api.unsplash.com/photos/random?orientation=landscape&query=';
        query = 'evening';
        key = '&client_id=FXAdVzm3XqO6-UTvgPIFxaXpHPB9U9hB-NgzFXb-CjQ';
        url = `${imgUrl}${query}${key}`;
        response = await fetch(url);
        data = await response.json();
        const img = createImage(data, 'unsplash');

        img.onload = () => {
            document.body.style.background = `url(${data.urls.full}) 0/cover`;
        };
    } else {
        imgUrl = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=';
        query = 'evening';
        key = '05129859d46ea64eeaeb30c523823a81';
        postUrl = '&extras=url_l&format=json&nojsoncallback=1';
        url = `${imgUrl}${key}&tags=${query}${postUrl}`;
        response = await fetch(url);
        data = await response.json();
        const img = createImage(data);
        img.onload = () => {
            document.body.style.background = `url(${img.src}) 0/cover`;
        };
    }

    function createImage(url, flag) {
        const img = new Image();

        if (flag === 'unsplash') {
            img.src = url.urls.full;
        } else {
            img.src = url.photos.photo[Math.floor(Math.random() * 100)].url_l;
        }

        return img;
    }
};
