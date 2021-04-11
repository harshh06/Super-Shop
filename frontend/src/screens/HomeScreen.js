import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // axios request ,,
    const fetchProducts = async () => {
      const res = await axios.get("/api/products");

      setProducts(res.data);
    };

    fetchProducts();
  }, []);
  return (
    <div>
      <h1> Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} ld={4} xl={3}>
            <Product product={product} key={product.key} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeScreen;
