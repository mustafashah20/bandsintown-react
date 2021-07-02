import React from 'react';
import reactDom from 'react-dom';
import Search from './Search';


test("search renders without crashing", () => {
    const div = document.createElement("div");
    reactDom.render(<Search />, div);
})
