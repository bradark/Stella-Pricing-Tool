import React, {useState, useEffect} from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemList from "./ItemList";
import axios from 'axios';
import cheerio from 'cheerio';

const API = "localhost";

function PricingTool(){

    const [item, setItem] = useState("");
    const [soldItemList, setSoldItemList] = useState([])

    async function handleItemChange(event){
        setItem(event.target.value);
    }

    async function handleSearch(event){
        fetch(`http://${API}:3009/prices/getpricelist/${item}`, {
            method: "GET",
          })
            .then((response) => {
              if (response.status === 200) return response.json();
              throw new Error("authentication has been failed!");
            })
            .then((resObject) => {
                console.log(resObject)
              setSoldItemList(resObject) 
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
                </Col>
            </Row>
            <Row>
                <Col>
                    <ItemList data={soldItemList}/>
                </Col>
            </Row>
        </div>
    );
}

export default PricingTool;