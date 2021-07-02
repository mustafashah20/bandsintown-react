import React from 'react';
import reactDom from 'react-dom';
import ArtistBanner from './ArtistBanner';


test("artist banner renders without crashing", () => {
    const div = document.createElement("div");
    reactDom.render(<ArtistBanner />, div);
})

test("artist banner renders with props", () => {
    const div = document.createElement("div");
    reactDom.render(
        <ArtistBanner
            thumbnailURL="https://photos.bandsintown.com/thumb/7349968.jpeg"
            artistName="John"
            facebookUrl="http://www.facebook.com/1666357743639455"
            deleteButton={true}
        />, div);
})