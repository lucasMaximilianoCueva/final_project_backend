import React, { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import "./ItemListContainer.scss";
import { NavLink } from "react-router-dom";

function ItemListContainer() {
  const [loading, setLoading] = useState(null);
  const url = "/api/products";
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getWithFetch();
  }, []);

  const getWithFetch = async () => {
    const response = await fetch(url);
    const jsonData = await response.json();
    setItemData(jsonData);
    setLoading(false);
  };

  const getPeugeotWithFetch = async () => {
    const response = await fetch("/api/products?title=peugeot");
    const jsonData = await response.json();
    setItemData(jsonData);
    setLoading(false);
  };
  const getFordWithFetch = async () => {
    const response = await fetch("/api/products?title=ford");
    const jsonData = await response.json();
    setItemData(jsonData);
    setLoading(false);
  };
  const getChevroletWithFetch = async () => {
    const response = await fetch("/api/products?title=chevrolet");
    const jsonData = await response.json();
    setItemData(jsonData);
    setLoading(false);
  };
  const getToyotaWithFetch = async () => {
    const response = await fetch("/api/products?title=toyota");
    const jsonData = await response.json();
    setItemData(jsonData);
    setLoading(false);
  };
  const getRenaultWithFetch = async () => {
    const response = await fetch("/api/products?title=renault");
    const jsonData = await response.json();
    setItemData(jsonData);
    setLoading(false);
  };
  const getVolkswagenWithFetch = async () => {
    const response = await fetch("/api/products?title=volkswagen");
    const jsonData = await response.json();
    setItemData(jsonData);
    setLoading(false);
  };

  const updateUrl = () => {
    getWithFetch();
  };

  const updateUrlPeugeot = () => {
    getPeugeotWithFetch();
  };
  const updateUrlFord = () => {
    getFordWithFetch();
  };
  const updateUrlChevrolet = () => {
    getChevroletWithFetch();
  };
  const updateUrlToyota = () => {
    getToyotaWithFetch();
  };
  const updateUrlRenault = () => {
    getRenaultWithFetch();
  };
  const updateUrlVolkswagen = () => {
    getVolkswagenWithFetch();
  };

  return (
    <>
      <div className="item-list-title">
        <div className="dropdown">
          <button className="dropbtn">Filtrar por marca</button>
          <div className="dropdown-content">
            <NavLink to="/" exact>
              <h1 onClick={updateUrl}>All</h1>
            </NavLink>
            <NavLink to="/category/peugeot" exact>
              <h1 onClick={updateUrlPeugeot}>Peugeot</h1>
            </NavLink>
            <NavLink to={"/category/ford"}>
              <h1 onClick={updateUrlFord}>Ford</h1>
            </NavLink>
            <NavLink to={"/category/chevrolet"}>
              <h1 onClick={updateUrlChevrolet}>Chevrolet</h1>
            </NavLink>
            <NavLink to={"/category/toyota"}>
              <h1 onClick={updateUrlToyota}>Toyota</h1>
            </NavLink>
            <NavLink to={"/category/renault"}>
              <h1 onClick={updateUrlRenault}>Renault</h1>
            </NavLink>
            <NavLink to={"/category/volkswagen"}>
              <h1 onClick={updateUrlVolkswagen}>Volkswagen</h1>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="items-container">
        {loading && <div id="loading"></div>}
        {!loading && <ItemList items={itemData} />}
      </div>
    </>
  );
}

export default ItemListContainer;
