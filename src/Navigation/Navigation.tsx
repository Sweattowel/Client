import { Button } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMyContext } from "../Context/ContextProvider";

function Navigation() {
  const [
    ,
    ,
    cart,
    setCart,
    userID,
    setUserID,
    authenticated,
    setAuthenticated,
    superAuthenticated,
    setSuperAuthenticated,
  ] = useMyContext();

  const [page, setPage] = useState(1);
  return (
    <nav className="m-auto h-[11vh] flex border-BLACK border-b-2 w-[80%]">
      <div className="flex  w-full mb-2">
        {authenticated && !superAuthenticated ? (
          <img
            className="h-[63px] mr-2"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaTYzo8bURp5Bgcmi6qUgZA09Bc9daAa_E4jvlb60J9g&s"
          />
        ) : null}
        {authenticated && superAuthenticated ? (
          <img
            className="h-[63px] mr-2"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYpARmcDnD6YGkauJskZc4CtgEZvMfjRPkddCFk_9tMQ&s"
          />
        ) : null}
        <div className="w-[50%] m-3 ml-[5%]  text-2xl">
        <h1 className="font-serif h-full rounded w-[350px] flex items-center justify-center text-4xl text-WHITE bg-BACKGROUND">
          AlieSohn Pottery
        </h1>

        </div>
        <ul className="flex space-x-1 h-full items-center ">
          {authenticated  && superAuthenticated ? (
            <li>
              <Link to={`/MyAccount/${userID}`}>
                <button
                  className={page === 5 ? "text-WHITE bg-BACKGROUND w-[150px] h-[50px] rounded" : " border-b border-SELECTED text-BLACK bg-WHITE w-[150px] h-[50px] rounded"}
                  onClick={() => {
                    setPage(5);
                  }}
                >
                  MyAccount
                </button>
              </Link>
            </li>
          ) : null}
          {superAuthenticated ? (
            <li>
              <Link to="/ADMIN">
                <button
                  className={page === 4 ? "text-WHITE bg-BACKGROUND w-[150px] h-[50px] rounded" : " border-b border-SELECTED text-BLACK bg-WHITE w-[150px] h-[50px] rounded"}
                  onClick={() => {
                    setPage(4);
                  }}
                >
                  Admin
                </button>
              </Link>
            </li>
          ) : null}
          <li>
            <Link to="/">
                <button
                  className={page === 1 ? "text-WHITE bg-BACKGROUND w-[150px] h-[50px] rounded" : " border-b border-SELECTED text-BLACK bg-WHITE w-[150px] h-[50px] rounded"}
                  onClick={() => {
                    setPage(1);
                  }}
                >
                  Brochure
                </button>
            </Link>
          </li>
          <li>
            <Link to="/StoreFront">
            <button
                  className={page === 2 ? "text-WHITE bg-BACKGROUND w-[150px] h-[50px] rounded" : " border-b border-SELECTED text-BLACK bg-WHITE w-[150px] h-[50px] rounded"}
                  onClick={() => {
                    setPage(2);
                  }}
                >
                  StoreFront
                </button>
            </Link>
          </li>
          <li>
            <Link to="/Cart">
            <button
                  className={page === 3 ? "text-WHITE bg-BACKGROUND w-[150px] h-[50px] rounded" : " border-b border-SELECTED text-BLACK bg-WHITE w-[150px] h-[50px] rounded"}
                  onClick={() => {
                    setPage(3);
                  }}
                >
                  CART
                </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
