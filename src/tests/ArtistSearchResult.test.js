import React from 'react';
import reactDom from 'react-dom';
import ArtistSearchResult from '../components/ArtistSearchResult/ArtistSearchResult';


test("artist search results renders without crashing", () => {
    const div = document.createElement("div");
    reactDom.render(<ArtistSearchResult />, div);
})

test("artist search results renders with props", () => {
    const div = document.createElement("div");
    reactDom.render(
        <ArtistSearchResult
            thumbnailSrc="https://photos.bandsintown.com/thumb/7349968.jpeg"
            artistName="John"
        />, div);
})