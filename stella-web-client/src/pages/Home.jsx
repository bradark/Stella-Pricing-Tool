import React from "react";
import Navbar from "../components/Navbar";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PricingTool from "../components/PricingTool";

function Home(){
    return(
        <div>
            <Navbar />
            <Row className="justify-content-md-center ">
                <Col md="auto">
                    <PricingTool />
                </Col>
            </Row>
        </div>
    );
}

export default Home;