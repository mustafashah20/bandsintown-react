import React from 'react';
import reactDom from 'react-dom';
import EventDetailCard from '../components/EventDetailCard/EventDetailCard';


test("event detail card renders without crashing", () => {
    const div = document.createElement("div");
    reactDom.render(<EventDetailCard />, div);
})