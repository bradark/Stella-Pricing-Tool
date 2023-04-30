import React, {PureComponent, useState, useEffect} from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemList from "./ItemList";
import Statistics from "./Statistics";
import axios from 'axios';
import cheerio from 'cheerio';

const API = "localhost";

function PricingTool(){

    const [item, setItem] = useState("");
    const [soldItemList, setSoldItemList] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading ] = useState("");

    async function handleItemChange(event){
        setItem(event.target.value);
    }

    async function handleSearch(event){
        setLoading("Searching...");
        fetch(`http://${API}:3009/prices/getpricelist/${item}`, {
            method: "GET",
          })
            .then((response) => {
              if (response.status === 200) return response.json();
              throw new Error("Err connecting to API");
            })
            .then((resObject) => {
              console.log(resObject)
              if(resObject[0].length < 1){
                setLoading("ERROR WITH SEARCH TERM");
              }else{
                setSoldItemList(resObject[0]) 
                setChartData(resObject[1]);
                setLoading("");
              }
            })
            .catch((err) => {
              console.log(err);
            });
    }

    return(
        <div className="pricing-tool-par-div">
            <Row>
                <Col>
                    <h4 className="white-text bold-text">Pricing Tool</h4>
                    <p className="white-text">Enter an item to search sold listings for.</p>
                </Col>
            </Row>
            <Row>                
                <Col>
                    <InputGroup className="item-input-group m-auto">
                        <InputGroup.Text className="input-label">Item:</InputGroup.Text>
                        <Form.Control className="item-input" onChange={handleItemChange} aria-label="search-item" />
                    </InputGroup>
                    <button onClick={handleSearch} className="search-btn">Search</button>
                    <p className="white-text m-top-10">{loading}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Statistics data={chartData} />
                    <ItemList data={soldItemList}/>
                </Col>
            </Row>
        </div>
    );
}

export default PricingTool;