import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Giphy } from "./Giphy";
import styles from "./messages.module.css";
import GifBoxOutlinedIcon from "@mui/icons-material/GifBoxOutlined";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { GifContext } from "../contexts/GifContext";
export const Messages = () => {
  const [value, setValue] = useState("");
  const [toggle, setToggle] = useState(false);
  const { gifmsg, handleDeleteGif } = useContext(GifContext);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const [messages, setMessages] = useState([]);

  const getGif = () => {
    fetch(`https://message-box-backend.herokuapp.com/messages`)
      .then((res) => res.json())
      .then((res) => {
        setMessages(res);
      });
  };
  useEffect(() => {
    getGif();
  }, []);
  const handleAdd = () => {
    const payload = {
      value,
    };
    const payloadjson = JSON.stringify(payload);
    fetch(`https://message-box-backend.herokuapp.com/messages`, {
      method: "POST",
      body: payloadjson,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        getGif();
      });
  };
  function handleDeleteClick(id) {
    fetch(`https://message-box-backend.herokuapp.com/messages/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((json) => {
        getGif();
      });
  }

  return (
    <>
      {/* Heading */}
      {/* <h2 style={{ color: "White" }}>CHAT APP</h2> */}

      {/* Message Box */}
      <div className={styles.box}>
        {/* Display messages and gifs */}
        <div className={styles.textBox}>
          {messages.map((messages, i) => (
            <div
              style={{ display: "flex", columnGap: "4px", alignItems: "end" }}
              className={styles.delIcon}
              key={i}
            >
              <DeleteIcon
                onClick={() => {
                  handleDeleteClick(messages.id);
                }}
              />
              <div className={styles.msgAndGif}>
                <div className={styles.messages}>{messages.value}</div>
              </div>
            </div>
          ))}
          <div className={styles.gifs}>
            {gifmsg.map((gifs, i) => (
              <div
                style={{ display: "flex", columnGap: "4px", alignItems: "end" }}
                className={styles.delIcon}
                key={i}
              >
                <DeleteIcon
                  onClick={() => {
                    handleDeleteGif(gifs.id);
                  }}
                />
                <img
                  src={gifs.url}
                  alt="loading..."
                  width="200px"
                  height="200px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Input Box for typing Messages */}
        <div style={{ display: "flex", columnGap: "6px", alignItems: "end" }}>
          <GifBoxOutlinedIcon className={styles.giphy} onClick={handleToggle} />
          <SendIcon className={styles.giphy} onClick={handleAdd} />
          <input
            type="text"
            placeholder="Start Typing...."
            className={styles.inputBox}
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Giphy Box */}
      <div style={{ marginTop: "10px" }}>{toggle ? <Giphy /> : ""}</div>
    </>
  );
};
