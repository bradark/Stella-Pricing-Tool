import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ItemList(props){
    return(
        <div>
                <Row>
                    <Col>
                        <div className="overflow-auto main-fight-div">
                        {
                            
                            props.data.map((data,key) => {
                                return(
                                    <div className="item-list-item">
                                        <Row>
                                            <Col>
                                                <img className="list-item-img-size" src={data.img}></img>
                                            </Col>
                                            <Col>
                                                <p className="m-25 white-txt smallText" key={key}>
                                                    {
                                                        data.title
                                                    }
                                                </p>
                                            </Col>
                                            <Col>
                                                
                                                    {
                                                        <p>
                                                         <span>{data.date}</span>
                                                         <span className="text-grn">{data.price}</span>
                                                         </p>
                                                    }
                                                
                                            </Col>
                                        </Row>
                                    </div>
                                );
                            })
                            
                        }
                        </div>
                    </Col>
                </Row>
        </div>   
    );  
}

export default ItemList;