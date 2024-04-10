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
    <nav className="m-auto h-[11vh] flex border-BLACK border-b-2 w-[90vw] bg-60">
      <div className="flex  w-full mb-2">
        <div className="w-[50%] m-auto   text-2xl">
          <h1 className="font-serif h-[8vh] md:h-[5vh] rounded w-[25vw] mr-3 text-center flex items-center justify-center text-[2rem] md:text-[3rem] text-BACKGROUND ">
            AlieSohn
          </h1>
        </div>
        <ul className="flex space-x-1 h-full w-[80vw] justify-center items-center text-[0.6em]">
          {authenticated && !superAuthenticated ? (
            <li>
              <Link to={`/MyAccount/${userID}`}>
                <button
                  className={
                    page === 5
                    ? "text-WHITE bg-BACKGROUND rounded md:h-[5vh] h-[8vh] md:w-[13vw] w-[15vw] text-base md:text-2xl"
                    : "border-b border-SELECTED text-BLACK bg-WHITE h-[8vh] md:w-[13vw] w-[15vw] md:h-[5vh] text-base md:text-2xl"
                  }
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
                  className={
                    page === 4
                    ? "text-WHITE bg-BACKGROUND rounded md:h-[5vh] h-[8vh] md:w-[13vw] w-[15vw] text-base md:text-2xl"
                    : "border-b border-SELECTED text-BLACK bg-WHITE h-[8vh] md:w-[13vw] w-[15vw] md:h-[5vh] text-base md:text-2xl"
                  }
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
                className={
                  page === 1
                  ? "text-WHITE bg-BACKGROUND rounded md:h-[5vh] h-[8vh] md:w-[13vw] w-[16vw] text-base md:text-2xl"
                  : "border-b border-SELECTED text-BLACK bg-WHITE h-[8vh] md:w-[13vw] w-[16vw] md:h-[5vh] text-base md:text-2xl"
                }
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
                className={
                  page === 2
                  ? "text-WHITE bg-BACKGROUND rounded md:h-[5vh] h-[8vh] md:w-[13vw] w-[15vw] text-base md:text-2xl"
                  : "border-b border-SELECTED text-BLACK bg-WHITE h-[8vh] md:w-[13vw] w-[15vw] md:h-[5vh] text-base md:text-2xl"
                }
                onClick={() => {
                  setPage(2);
                }}
              >
                Store Front
              </button>
            </Link>
          </li>
          <li>
            <Link to="/Cart">
              <button
                className={
                  page === 3
                  ? "text-WHITE bg-BACKGROUND rounded md:h-[5vh] h-[8vh] md:w-[13vw] w-[15vw] text-base text-md md:text-2xl"
                  : "border-b border-SELECTED text-BLACK bg-WHITE h-[8vh] md:w-[13vw] w-[15vw] md:h-[5vh] text-base md:text-2xl"
                }
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
