
import React, { useContext} from "react";
import styled from "./giphy.module.css";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { GifContext } from "../contexts/GifContext";
export const Giphy = () => {
  const {search,errorHandler,handleSearchChange,handleSubmit,displayGifs}=useContext(GifContext)
  return (
    <div className={styled.gifBox}>
      <form action="">
      <input
        value={search}
        onChange={handleSearchChange}
        className={styled.inputBox1}
        placeholder="Search"
        type="text"
      />
      <ManageSearchIcon className={styled.searchGif} onClick={handleSubmit}/>
      </form>
      <div className={styled.gifs}>
        <div>{errorHandler()}</div>
        {displayGifs()}
      </div>
    </div>
  );
};
