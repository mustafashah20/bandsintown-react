import React, { useState } from 'react'
import { BsSearch } from "react-icons/bs";

const Search = () => {
    return (  
        <div class="input-group shadow-sm mt-5">
            <input type="text" class="form-control my-input" placeholder="Search Artist" aria-label="artist" aria-describedby="basic-addon1"/>
            <span class="input-group-text my-input-icon" id="basic-addon1">
                <BsSearch class="my-icon"/>
            </span>
        </div>
    );
}
 
export default Search;