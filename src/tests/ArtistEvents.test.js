import React from 'react';
import reactDom from 'react-dom';
import ArtistEvents from '../components/ArtistEvents/ArtistEvents';

jest.mock('react-router', () => ({
  useLocation: jest.fn().mockReturnValue({
    pathname: '/'
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

test("artist events renders without crashing", () => {
  const div = document.createElement("div");
  reactDom.render(<ArtistEvents />, div);
})