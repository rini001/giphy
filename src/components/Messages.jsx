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
  const [gifmsg] = useContext(GifContext);
  console.log(gifmsg)
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
      <h2>Chat App</h2>
      <div className={styles.box}>
        <div className={styles.textBox}>
          {messages.map((el) => (
            <div
              style={{ display: "flex", columnGap: "4px", alignItems: "end" }}
              className={styles.delIcon}
            >
              <DeleteIcon
                onClick={() => {
                  handleDeleteClick(el.id);
                }}
              />
              <div className={styles.messages}>{el.value}</div>
            </div>
          ))}
      
        </div>
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
      <div style={{ marginTop: "10px" }}>{toggle ? <Giphy /> : ""}</div>
    </>
  );
};
