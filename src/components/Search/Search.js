import React, { useEffect, useState, useRef } from 'react'
import { BsSearch, BsX } from "react-icons/bs";
import { motion, AnimatePresence } from 'framer-motion'
import { useClickOutside } from 'react-click-outside-hook';
import { MoonLoader } from 'react-spinners';
import { useDebounce } from '../../hooks/debounceHook'
import ArtistSearchResult from '../ArtistSearchResult/ArtistSearchResult';
import * as api from '../../api/artistApi';
import ArtistBanner from '../ArtistBanner/ArtistBanner';

const Search = () => {

    const [inputVal, setInputVal] = useState('');
    const [artists, setArtist] = useState([]);
    const [noArtistFound, setNoArtistFound] = useState(false);
    const [isExpanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [clickRef, isClickedOutside] = useClickOutside();
    const [cachedArtist, setCachedArtist] = useState(null);
    const inputRef = useRef();

    const isEmpty = !artists || artists.length === 0;

    //Use Effect hook to store the last searched artist in local storage.
    useEffect(() => {
        const data = localStorage.getItem('artist')
        if (data) {
            setCachedArtist(JSON.parse(data));
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    //Input handler for getting user's input value.
    const handleInputChange = (e) => {
        e.preventDefault();
        if (e.target.value.trim() === "") {
            setNoArtistFound(false);
        }
        setInputVal(e.target.value);
    }

    //Method for setting the container expand state.
    const expandContainer = () => {
        setExpanded(true);
    }

    //Method for setting the container expand state.
    const collapseContainer = () => {
        setExpanded(false);
        setInputVal('');
        setIsLoading(false);
        setNoArtistFound(false);
        setArtist([]);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    //Container variant used for framer motion div.
    const containerVariat = {
        expanded: {
            height: "30em",
        },
        collapsed: {
            height: "3.8em",
        }
    }

    //Container tranisition used for framer motion div.
    const containerTransition = {
        type: 'spring',
        damping: 22,
        stiffness: 150
    }

    //Use Effect hook to detect click outside the framer motion div.
    useEffect(() => {
        if (isClickedOutside) {
            collapseContainer();
        }
    }, [isClickedOutside]);

    //Method for getting the artist search result.
    const getArtist = () => {

        if (!inputVal || inputVal.trim() === "") {
            return;
        }

        setIsLoading(true);
        setNoArtistFound(false);

        api.getArtistSearchResults(inputVal).then(
            (data) => {
                if (data.artists && data.artists.length === 0) {
                    setNoArtistFound(true);
                }
                setArtist(data.artists);
                setIsLoading(false);
            }
        )
    }

    //Custom hook to debounce query
    //Improves performance by limiting the rate at which function is invoked.
    useDebounce(inputVal, 500, getArtist);

    //method for removing the artist & artist-events JSON from local storage.
    const deleteLocalStorage = () => {
        localStorage.removeItem('artist');
        localStorage.removeItem('artist-events');
        setCachedArtist(null);
    }

    return (
        <div className="container">
            <motion.div className="container search-container"
                animate={isExpanded ? "expanded" : "collapsed"}
                variants={containerVariat}
                transition={containerTransition}
                ref={clickRef}>
                <div className="search-input-container">
                    <span className="search-icon">
                        <BsSearch />
                    </span>
                    <input type="text"
                        className="search-input"
                        placeholder="Search for Artists"
                        onChange={handleInputChange}
                        onFocus={expandContainer}
                        ref={inputRef}
                        value={inputVal}
                    />
                    <AnimatePresence>
                        {isExpanded &&
                            <motion.span className="close-icon"
                                key="close-icon"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={collapseContainer} >
                                <BsX />
                            </motion.span>
                        }
                    </AnimatePresence>
                </div>
                {isExpanded && <div className="line-seperator" />}
                {
                    isExpanded &&
                    <div className="search-content">
                        {
                            isLoading &&
                            <div className="loading-wrapper">
                                <MoonLoader loading={true} color="#000" size={30} />
                            </div>
                        }
                        {
                            !isLoading && isEmpty && !noArtistFound &&
                            <div className="loading-wrapper">
                                <span className="search-warning">Start typing to search.</span>
                            </div>

                        }
                        {
                            !isLoading && noArtistFound &&
                            <div className="loading-wrapper">
                                <span className="search-warning">No Artist found!</span>
                            </div>

                        }
                        {
                            !isLoading && !isEmpty &&
                            <div>
                                {
                                    artists.map((artist) => (
                                        <ArtistSearchResult thumbnailSrc={artist.imageSrc}
                                            artistName={artist.name}
                                            key={artist.name} />
                                    ))

                                }
                            </div>
                        }
                    </div>
                }

            </motion.div>
            {
                cachedArtist &&
                <p className="text-white h5 ps-2 mt-3">
                    Last Search Result
                </p>
            }
            {
                cachedArtist &&
                <ArtistBanner
                    thumbnailURL={cachedArtist.thumb_url}
                    artistName={cachedArtist.name}
                    facebookUrl={cachedArtist.facebook_page_url}
                    deleteButton={true}
                    parentCallback={() => deleteLocalStorage()}
                />
            }
        </div>
    );
}

export default Search;
