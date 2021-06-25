import React, { useEffect, useState, useRef } from 'react'
import { BsSearch, BsX } from "react-icons/bs";
import { motion, AnimatePresence } from 'framer-motion'
import { useClickOutside } from 'react-click-outside-hook';
import { MoonLoader } from 'react-spinners';
import { useDebounce } from '../../hooks/debounceHook'
import ArtistSearchResult from '../artistSearchResult/ArtistSearchResult';

const Search = () => {

    const [inputVal, setInputVal] = useState('');
    const [artists, setArtist] = useState([]);
    const [isExpanded, setExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [clickRef, isClickedOutside] = useClickOutside();
    const inputRef = useRef();

    const isEmpty = !artists || artists.length() === 0;

    const handleInputChange = (e) => {
        e.preventDefault();
        setInputVal(e.target.value);
    }

    const expandContainer = () => {
        setExpanded(true);
    }

    const collapseContainer = () => {
        setExpanded(false);
        setInputVal('');
        setIsLoading(false);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    const containerVariat = {
        expanded: {
            height: "30em",
        },
        collapsed: {
            height: "3.8em",
        }
    }

    const containerTransition = {
        type: 'spring',
        damping: 22,
        stiffness: 150
    }

    useEffect(() => {
        if (isClickedOutside) {
            collapseContainer();
        }
    }, [isClickedOutside]);

    const prepareSearchValue = (value) => {
        const url = `http://localhost:3005/search?name=${value}`;

        return encodeURI(url);
    }

    //`https://rest.bandsintown.com/artists/${ inputVal }?app_id=12345`

    //`http://localhost:3005/artist?name=${inputVal}`

    //`https://www.bandsintown.com/searchSuggestions?searchTerm=${inputVal}`

    //`http://localhost:3005/search?name=${inputVal}`

    const getArtist = () => {

        if (!inputVal || inputVal.trim() === "") {
            return;
        }

        setIsLoading(true);

        const URL = prepareSearchValue(inputVal);
        try {
            fetch(URL).then(
                (response) => response.json().then(
                    (data) => {
                        setArtist(data);
                    }
                )
            )
        } catch (error) {
            console.log(error);
        }
    }

    // href: "https://www.bandsintown.com/a/76765-john?came_from=257"
    // imageSrc: "https://photos.bandsintown.com/thumb/7349968.jpeg"
    // name: "John"
    // trackerText: "6,147 Trackers"
    // verifiedSrc: "https://assets.prod.bandsintown.com/images/verifiedCheck.svg"

    useDebounce(inputVal, 500, getArtist);

    return (
        <motion.div className="container search-container"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={containerVariat}
            transition={containerTransition}
            ref={clickRef}>
            <div className="container search-input-container">
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
            <div className="line-seperator"></div>
            <div className="search-content">
                {
                    isLoading &&
                    <div className="loading-wrapper">
                        <MoonLoader loading={true} color="#000" size={30} />
                    </div>
                }
                {
                    isLoading && isEmpty &&
                    <> 
                        {
                            artists.map((artist) => {
                                <ArtistSearchResult thumbnailSrc={artist.imageSrc} artistName={artist.name}/>
                            })
                        }
                    </>
                    
                }
            </div>
        </motion.div>
    );
}

export default Search;