import React, { createContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export const GifContext = createContext();

export const GifProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [gifmsg, setgifmsg] = useState([{}]);

  //executing getGifs (clicked)
  useEffect(() => {
    getGifs();
  }, []);

  //getting  gif (clicked)
  const getGifs = () => {
    fetch("https://message-box-backend.herokuapp.com/gif")
      .then((res) => res.json())
      .then((res) => {
        setgifmsg(res);
      });
  };

  //posting gif (clicked)
  const handleAdd = (url) => {
    const payload = {
      url,
    };
    const payloadjson = JSON.stringify(payload);
    fetch("https://message-box-backend.herokuapp.com/gif", {
      method: "POST",
      body: payloadjson,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        getGifs();
      });
  };
  //deleting gif from msg box
  function handleDeleteGif(id) {
    fetch(`https://message-box-backend.herokuapp.com/gif/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        getGifs();
      });
  }
  //--------------------------------------
  //get trending gif (API)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const result = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "59JPcIDi8MtvGmafJnVZqULxgyyXRTEA",
            limit: 100,
          },
        });
        setData(result.data.data);
      } catch (error) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  //display gifs
  const displayGifs = () => {
    if (isLoading) {
      return (
        <div>
          <i class="fas fa-spinner fa-4x fa-spin"></i>
        </div>
      );
    }
    return data.map((el) => (
      <div key={el.id} style={{cursor:"pointer"}}>
        <img
          width="200px"
          height="200px"
          src={el.images.fixed_height.url}
          alt=""
          onClick={() => handleAdd(el.images.fixed_height.url)}
        />
      </div>
    ));
  };

  //erron handling
  const errorHandler = () => {
    if (isError)
      return (
        <div>
          unable to load the GIFS , please wait for few more seconds....
        </div>
      );
  };
  //--------------------------------------
  //handle Search GIF
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // handle submit GIF
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);

    try {
      const results = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "59JPcIDi8MtvGmafJnVZqULxgyyXRTEA",
          q: search,
          limit: 100,
        },
      });
      setData(results.data.data);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }
    setIsLoading(false);
  };
  //--------------------------------------
  return (
    <GifContext.Provider
      value={{
        search,
        errorHandler,
        handleSearchChange,
        handleSubmit,
        displayGifs,
        handleAdd,
        getGifs,
        gifmsg,
        handleDeleteGif
      }}
    >
      {children}
    </GifContext.Provider>
  );
};
