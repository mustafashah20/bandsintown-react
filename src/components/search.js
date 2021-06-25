import React, { useEffect, useState, useRef } from 'react'
import { BsSearch, BsX } from "react-icons/bs";
import { motion, AnimatePresence } from 'framer-motion'
import { useClickOutside } from 'react-click-outside-hook';
import { MoonLoader } from 'react-spinners';

const Search = () => {

    const [inputVal, setInputVal] = useState('')
    // const [name, setName] = useState('')
    // const [eventCount, setEventCount] = useState('') 
    const [isExpanded, setExpanded] = useState(false)
    const [clickRef, isClickedOutside] = useClickOutside()
    const inputRef = useRef()

    const handleInputChange = (e) => {
        setInputVal(e.target.value);
    }

    const handleSubmit = (e) => {
        if(e.keyCode === 13){
            getArtist()
        }
    }

    const expandContainer = () => {
        setExpanded(true)
    }

    const collapseContainer = () => {
        setExpanded(false)
        if(inputRef.current){
            inputRef.current.value = ''
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
        if(isClickedOutside){
            collapseContainer()
        }
    }, [isClickedOutside])


    //`https://rest.bandsintown.com/artists/${ inputVal }?app_id=12345`

    //`http://localhost:3005/artist?name=${inputVal}`

    //`https://www.bandsintown.com/searchSuggestions?searchTerm=${inputVal}`

    //`http://localhost:3005/search?name=${inputVal}`

    const getArtist = () => {
        try {
            fetch(`http://localhost:3005/search?name=${inputVal}`).then(
            (response) => response.json().then(
              (data) => {
                console.log(data)
                // setName(data.name)
                // setEventCount(data.upcoming_event_count)
              }
            )
          )
        } catch (error) {
        console.log(error)
        }
    }

    return (
        <motion.div className="container search-container" 
        animate={isExpanded ? "expanded" : "collapsed"} 
        variants={containerVariat}
        transition={containerTransition}
        ref={clickRef}>
            <div className="container search-input-container">
                <span className="search-icon">
                    <BsSearch/>
                </span>
                <input type="text" 
                className="search-input"
                placeholder="Search for Artists" 
                onChange={handleInputChange}
                onKeyDown={handleSubmit}
                onFocus={expandContainer}
                ref={inputRef}
                />
                <AnimatePresence>
                    { isExpanded && 
                        <motion.span className="close-icon"
                        key="close-icon"
                        initial={{opacity: 0}} 
                        animate={{opacity: 1}} 
                        exit={{opacity: 0}}
                        transition={{duration: 0.2}}
                        onClick={collapseContainer} >
                            <BsX/>
                        </motion.span>
                    }
                </AnimatePresence>
            </div>
            <div className="line-seperator"></div>
            <div className="search-content">
                <div className="loading-wrapper">
                    <MoonLoader loading={true} color="#000" size={30}/>
                </div>
            </div>
        </motion.div>
    );
}
 
export default Search;