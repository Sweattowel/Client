import React, { useState, useEffect } from "react";
import { useMyContext } from "../../Context/ContextProvider";
import { Pagination } from "@mui/material";
import axios from "axios";
import url from "url";
import InfoIcon from '@mui/icons-material/Info';
import './Dependencies/StoreFront.css'
import { AnimatePresence, motion } from 'framer-motion'

interface storeItem
{
  itemID: number;
  itemName: string;
  itemPrice: number;
  imagePath: string;
  itemDescription: string;
  itemState: number
}

function StoreFront()
{
  const [
    allItems,
    setAllItems,
    cart,
    setCart,
    userID,
    ,
    ,
    ,
    ,
    ,
  ] = useMyContext();
  const [displayItems, setDisplayitems] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemCount, setItemCount] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) =>
  {
    setCurrentPage(newPage);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = displayItems.slice(indexOfFirstItem, indexOfLastItem);
  const [count, setCount] = useState<number>(0); //count of all items for use in left hand information
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const serverAddress = `${process.env.REACT_APP_SERVER_ADDRESS}`;
  const [clickedItemIndex, setClickedItemIndex] = useState<number | null>(null);
  const [selectedStoreItem, setSelectedStoreItem] = useState<storeItem>({
    itemID: -1,
    itemName: "",
    itemPrice: 0,
    imagePath: "",
    itemDescription: "",
    itemState: 0
  });
  const [confirmationMessages, setConfirmationMessages] = useState<{ index: number; id: number }[]>([]);
  const [IDS, setIDS] = useState<number[]>([])
  const [ searchQuery, setSearchQuery ] = useState<string>("")

  class StoreItemHandle 
  {
    // COLLECT STORE ITEMS
    static collectStoreItems = async () => 
    {
      try {
        const response = await axios.get<storeItem[]>(
          `${serverAddress}/api/storeItems`
        );

        if (response.status === 200) {
          setAllItems(response.data);
          setDisplayitems(response.data)
        } else if (response.status === 404) {
          console.log("No items available to purchase");
        } else {
          console.log("Internal Server Error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    // COLLECT BOUGHT IDS
    static collectIDS = async () => 
    {
      try {
        const newIDS: number[] = JSON.parse(localStorage.getItem(`BOUGHTIDS${userID}`) || '[]')
        setIDS(newIDS)
      } catch (error) {
        console.log(error)
      }
    }
  }


  function addToCart(
    itemID: number,
    itemName: string,
    itemPrice: number,
    imagePath: string,
    itemDescription: string
  )
  {
    const existingItem = cart.find((item) => item.itemID === itemID);
    if (existingItem) {
      return
    } else {
      setCart((prevItems) => [
        ...prevItems,
        {
          itemID,
          itemName,
          itemPrice,
          imagePath,
          itemDescription,
        },
      ]);
    }
  }

  ///////////////////////////////////////////
  useEffect(() => 
  {
    if (allItems.length === 0) {
      StoreItemHandle.collectStoreItems();
    }
    StoreItemHandle.collectIDS();
  }, []);
  useEffect(() => 
  {
    setItemCount(allItems.length);
  }, [allItems]);

  useEffect(() => 
  {
    let totalCount = 0;
    let totalPrice = 0;

    cart.forEach((item) =>
    {
      totalCount += 1;
      totalPrice += item.itemPrice;
    });

    setCount(totalCount);
    setTotalPrice(totalPrice);
    if (cart.length === 0) {
      StoreItemHandle.collectStoreItems();
    }
  }, [cart]);

  useEffect(() => 
  {
    const handleScroll = () =>
    {
      setSelectedStoreItem({
        itemID: -1,
        itemName: "",
        itemPrice: 0,
        imagePath: "",
        itemDescription: "",
        itemState: 0
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
    {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  ///////////////////////////////////////////

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemded = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  useEffect(() => {
    if (searchQuery == "") {
      setDisplayitems(allItems)
      return
    }
    setDisplayitems(
      allItems.filter((item) => {
        return item.itemName.includes(searchQuery);
      })      
    )

  },[searchQuery])
  return (
    <section className="w-full h-full text-BLACK flex flex-wrap justify-center mt-[5vh] md:mt-[0vh] bg-gradient-to-b from-GREY to-WHITE">
        <h1 className=" w-[90%] text-center text-[2rem] rounded mt-[10vh]">
          Our items
        </h1>
      <div className="text-BLACK bg-WHITE rounded-lg shadow-lg w-[80%] flex flex-col md:flex-row justify-evenly items-center md:h-[3rem] h-[8rem] mt-2">
        Items Per Page:
        <div className="w-[50%] h-[3vh] flex justify-evenly text-BLACK">
          <button onClick={() => setItemsPerPage(5)} className={`${itemsPerPage == 5 ? "opacity-60" : ""} border-DARK border shadow-lg w-[20%] rounded`}>
            5
          </button>
          <button onClick={() => setItemsPerPage(10)} className={`${itemsPerPage == 10 ? "opacity-60" : ""} border-DARK border shadow-lg w-[20%] rounded`}>
            10
          </button>
          <button onClick={() => setItemsPerPage(15)} className={`${itemsPerPage == 15 ? "opacity-60" : ""} border-DARK border shadow-lg w-[20%] rounded`}>
            15
          </button>
        </div>
        <div>
          Search:
        </div>
        <input onChange={(e) => setSearchQuery(e.target.value)} placeholder="Enter search" className="border" type="search" />
      </div>
      <motion.ul
        className="container w-full h-[120vh] flex flex-wrap justify-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {currentItems.length > 0 ? (
          currentItems.map((item: storeItem, index: number) => (
            <motion.div key={index} layoutId={`${item.itemID}`} className="bg-WHITE item text-DARK w-[19vw] h-[40vh] md:h-[60vh] min-w-40 m-2 shadow-lg text-DARK rounded hover:shadow-2xl z-10" variants={itemded} whileHover={{ scale: 1.1, zIndex: 20 }} >
              <div className="flex items-center font-serif text-[1em] rounded h-[13%] md:h-[5%]">
                <span className="relative left-2 hover:opacity-90">
                  <InfoIcon
                    onClick={() => setSelectedStoreItem(item)}
                  />
                </span>
                <div className="flex-grow text-center justify-center items-center flex">
                  {item.itemName}
                </div>
              </div>

              <img
                className={`${item.itemState !== 0 ? 'opacity-70' : ''}m-auto w-full border-DARK border-b border-t h-[60%] md:h-[80%] bg-WHITE`}
                src={url.resolve(serverAddress, item.imagePath)}
                alt={item.itemName}
                onError={() =>
                  console.error(`Image not found: ${item.imagePath}`)
                }
              />
              <div className="mb-2 text-center text-DARK border-b w-[80%] m-auto">Price: ${item.itemPrice}</div>
              <div className="relative">
                {IDS.includes(item.itemID) || cart.includes(item) || item.itemState !== 0 ?
                  <div className={`bg-WHITE text-GREY h-full w-[80%] rounded shadow-lg border border-DARK m-auto flex justify-center opacity-80 z-0`}>
                    ITEM PENDING
                  </div> :
                  <button
                    className={`hover:opacity-90 bg-WHITE text-BLACK h-full w-[80%] rounded shadow-lg border border-DARK m-auto flex justify-center z-1`}
                    onClick={() =>
                    {
                      addToCart(
                        item.itemID,
                        item.itemName,
                        item.itemPrice,
                        item.imagePath,
                        item.itemDescription
                      );
                      setClickedItemIndex(index);
                      setConfirmationMessages(prev => [...prev, { index, id: Date.now() }]);
                      setTimeout(() =>
                      {
                        setConfirmationMessages(prev =>
                        {
                          const filteGREYMessages = prev.filter(msg => msg.id !== prev[0]?.id);
                          return filteGREYMessages;
                        });
                      }, 2000);
                    }}
                  >
                    ADD TO CART
                  </button>
                }
                {confirmationMessages.map((msg, i) =>
                {
                  return msg.index === index && (
                    <div key={msg.id} className="absolute top-0 right-0 text-DARK p-1 rounded animate-floatAway">
                      +{item.itemName}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))
        ) : (
          <h1 className="mt-5 mb-5 bg-WHITE rounded w-[100vw] h-[10vh] flex justify-center items-center text-center text-BLACK text-[1.5rem]">
            Store offline // experiencing difficulties please try again later  
          </h1>
        )}

        
      </motion.ul>
      <section className="flex  m-auto mt-10 w-[60vw] h-[10vh]  text-center rounded  text-BLACK text-[0.8em] justify-center items-center">
        <div className="bg-GREY rounded w-[20vw]">
          Current Items in cart:
          <br />
          {count} item/s
          <br />${totalPrice.toFixed(2)}
        </div>
        <Pagination
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          count={Math.ceil(itemCount / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          variant="outlined"
        />
      </section>

      <AnimatePresence>
        {selectedStoreItem.itemID !== -1 && (
          <motion.div
            className="bg-GREY p-4 rounded shadow-lg text-BLACK fixed top-[10vh] md:top-[10vh] m-auto max-w-[80%] z-40"
            style={{
              opacity: '100'
            }}
          >
            <img alt={`${selectedStoreItem.imagePath}`} className="m-auto border-DARK border  max-h-[70vh] bg-WHITE" src={url.resolve(serverAddress, selectedStoreItem.imagePath)} />
            <motion.h2 className="justify-center w-[80%] m-auto flex items-center text-2xl border-b border-DARK">
              {selectedStoreItem.itemName}
            </motion.h2>
            <motion.h5 className="justify-center w-[80%] m-auto flex items-center text-center">
              {selectedStoreItem.itemDescription}
            </motion.h5>

            <motion.button
              className="flex rounded bg-WHITE text-BLACK border border-DARK shadow-lg justify-center m-auto w-[60%] md:w-[20%] hover:opacity-90"
              onClick={() => setSelectedStoreItem({
                itemID: -1,
                itemName: "",
                itemPrice: 0,
                imagePath: "",
                itemDescription: "",
                itemState: 0
              })}
            >
              Close
            </motion.button>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default StoreFront;
