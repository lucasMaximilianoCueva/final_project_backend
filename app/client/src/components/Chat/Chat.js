import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import moment from "moment";
import "./Chat.css";
import pino from "pino";
import { Link } from "react-router-dom";

const logger = pino({
  prettyPrint: { colorize: true },
});

const socket = io();

function Chat() {
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [displayName, setDisplayName] = useState(null);
  const [display, setDisplay] = useState("none");
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    fetch("/user")
      .then((res) => res.json())
      .then((res) => setDataUser(res))
      .catch((err) => {
        logger.info(`error: ${err}`);
      });
  }, []);

  useEffect(() => {
    socket.on("messages", (message) => {
      setReceivedMessages(message);
    });
  }, []);

  const sendMessage = () => {
    const msg = {
      author: displayName,
      text: message,
      time: moment().format("DD/MM/YYYY h:mm:ss a"),
    };
    socket.emit("new-message", msg);
    setMessage("");
  };

  const onUpdateMessage = (event) => {
    setMessage(event.target.value);
  };

  const updateDisplayName = () => {
    setDisplayName(dataUser.email);
  };

  const openForm = () => {
    setDisplay("block");
  };

  const closeForm = () => {
    setDisplay("none");
  };

  return (
    <div className="container">
      <button className="open-button" onClick={openForm} style={{borderRadius:20}}>
        Chat
      </button>

      <div className="chat-popup" style={{ display: display }} id="myForm">
        <div className="form-container">
          <ul>
            {receivedMessages.map((item, index) => (
              <li key={index}>
                {item.author}: {item.text} [{item.time}]
              </li>
            ))}
          </ul>
        </div>
        <div>
          {displayName ? (
            <div>
              <input
                type="text"
                id="form1"
                onChange={onUpdateMessage}
                className="form-control"
                placeholder="Type your message"
                value={message}
                aria-label="Search"
              />
            </div>
          ) : (
            <div style={{backgroundColor: "#303030"}}>
              {!dataUser.name &&<Link to='/login'>Please Login</Link>}
            
            </div>
          )}
        </div>
        <div className="buttons">
          {displayName && (
            <button onClick={sendMessage} type="submit" className="btn">
              Send
            </button>
          )}
          {!displayName && (
            <button onClick={updateDisplayName}  className="btn">
              Chat
            </button>
          )}
          <button type="button" className="btn cancel" onClick={closeForm}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
