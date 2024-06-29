// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Form, Card, Container, Button, Modal } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const ProductComponent = () => {
//     const navigate = useNavigate();
//     const [products, setProducts] = useState([]);
//     const [formData, setFormData] = useState({
//         imageUrl: "",
//         productName: "",
//         price: "",
//         color:"",
//         type:"",
//         description: "",
//         quantity: ""
//     });
//     const [show, setShow] = useState(false);
//     const [editProduct, setEditProduct] = useState(null);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3002/admin/get');
//                 setProducts(response.data);
//             } catch (err) {
//                 console.log(err);
//             }
//         };
//         fetchProducts();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevFormData => ({
//             ...prevFormData,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (editProduct) {
//             try {
//                 const response = await axios.patch(`http://localhost:3002/admin/productEdit/${editProduct._id}`, formData);
//                 const updatedProducts = products.map((product) =>
//                     product._id === response.data._id ? response.data : product
//                 );
//                 setProducts(updatedProducts);
//             } catch (error) {
//                 console.error("Error:", error);
//             }
//         } else {
//             try {
//                 const response = await axios.post('http://localhost:3002/admin/addProduct', formData);
//                 setProducts([...products, response.data]);
//             } catch (error) {
//                 console.error("Error:", error);
//             }
//         }
//         setFormData({
//             imageUrl: "",
//             productName: "",
//             price: "",
//             color:"",
//             type:"",
//             description: "",
//             quantity: ""
//         });
//         setEditProduct(null);
//         setShow(false);
//     };

//     const handleSingleProduct = (id) => {
//         navigate(`/getProduct/${id}`);
//     };

//     const handleEdit = (product) => {
//         setFormData({
//             imageUrl: product.imageUrl,
//             productName: product.productName,
//             price: product.price,
//             color:product.color,
//             type:product.type,
//             description: product.description,
//             quantity: product.quantity
//         });
//         setEditProduct(product);
//         setShow(true);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:3002/admin/delete/${id}`);
//             setProducts(products.filter((product) => product._id !== id));
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };

//     return (
//         <Container>
//             <h2 className="mt-5">Add New Product</h2>
//             <Button variant="primary" onClick={() => {
//                 setFormData({
//                     imageUrl: "",
//                     productName: "",
//                     price: "",
//                     color:"",
//                     type:"",
//                     description: "",
//                     quantity: ""
//                 });
//                 setEditProduct(null);
//                 setShow(true);
//             }}>Add Product</Button>

//             <h2 className="mt-5">Product List</h2>
//             <div className="row">
//                 {products.map((product) => (
//                     <div className="col-md-4 mb-4" key={product._id}>
//                         <Card>
//                             <Card.Img variant="top" src={product.imageUrl} />
//                             <Card.Body>
//                                 <Card.Title>{product.productName}</Card.Title>
//                                 <Card.Text>
//                                     {product.description}
//                                 </Card.Text>
//                                 <Button variant="link" onClick={() => handleSingleProduct(product._id)}>See More</Button>
//                                 <Button variant="secondary" className="mx-2" onClick={() => handleEdit(product)}>Edit</Button>
//                                 <Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button>
//                             </Card.Body>
//                         </Card>
//                     </div>
//                 ))}
//             </div>

//             <Modal show={show} onHide={() => setShow(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{editProduct ? "Edit Product" : "Add New Product"}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form onSubmit={handleSubmit}>
//                         <Form.Group controlId="formImageUrl">
//                             <Form.Label>Image URL</Form.Label>
//                             <Form.Control type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formProductName">
//                             <Form.Label>Product Name</Form.Label>
//                             <Form.Control type="text" name="productName" value={formData.productName} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formPrice">
//                             <Form.Label>Price</Form.Label>
//                             <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formColor">
//                             <Form.Label>Color</Form.Label>
//                             <Form.Control type="String" name="color" value={formData.color} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formType">
//                             <Form.Label>Type</Form.Label>
//                             <Form.Control type="String" name="type" value={formData.type} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formDescription">
//                             <Form.Label>Description</Form.Label>
//                             <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} required />
//                         </Form.Group>
//                         <Form.Group controlId="formQuantity">
//                             <Form.Label>Quantity</Form.Label>
//                             <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
//                         </Form.Group>
//                         <Button variant="primary" type="submit">{editProduct ? "Save Changes" : "Add Product"}</Button>
//                     </Form>
//                 </Modal.Body>
//             </Modal>
//         </Container>
//     );
// };

// export default ProductComponent;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Card, Container, Button, Modal, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../ProductComponent.css'; // Import the custom CSS file

const ProductComponent = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [formData, setFormData] = useState({
        imageUrl: "",
        productName: "",
        price: "",
        color: "",
        type: "",
        description: "",
        quantity: ""
    });
    const [colorFilter, setColorFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [show, setShow] = useState(false);
    const [editProduct, setEditProduct] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3002/admin/get');
                setProducts(response.data);
                setFilteredProducts(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = products;

        if (colorFilter) {
            filtered = filtered.filter(product => product.color === colorFilter);
        }

        if (typeFilter) {
            filtered = filtered.filter(product => product.type === typeFilter);
        }

        setFilteredProducts(filtered);
    }, [colorFilter, typeFilter, products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editProduct) {
            try {
                const response = await axios.patch(`http://localhost:3002/admin/productEdit/${editProduct._id}`, formData);
                const updatedProducts = products.map((product) =>
                    product._id === response.data._id ? response.data : product
                );
                setProducts(updatedProducts);
                setFilteredProducts(updatedProducts);
            } catch (error) {
                console.error("Error:", error);
            }
        } else {
            try {
                const response = await axios.post('http://localhost:3002/admin/addProduct', formData);
                setProducts([...products, response.data]);
                setFilteredProducts([...products, response.data]);
            } catch (error) {
                console.error("Error:", error);
            }
        }
        setFormData({
            imageUrl: "",
            productName: "",
            price: "",
            color: "",
            type: "",
            description: "",
            quantity: ""
        });
        setEditProduct(null);
        setShow(false);
    };

    const handleSingleProduct = (id) => {
        navigate(`/product/${id}`);
    };

    const handleEdit = (product) => {
        setFormData({
            imageUrl: product.imageUrl,
            productName: product.productName,
            price: product.price,
            color: product.color,
            type: product.type,
            description: product.description,
            quantity: product.quantity
        });
        setEditProduct(product);
        setShow(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/admin/delete/${id}`);
            const updatedProducts = products.filter((product) => product._id !== id);
            setProducts(updatedProducts);
            setFilteredProducts(updatedProducts);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Container className="product-container">
            <h2 className="mt-5 text-center">Add New Product</h2>
            <div className="text-center mb-4">
                <Button variant="primary" onClick={() => {
                    setFormData({
                        imageUrl: "",
                        productName: "",
                        price: "",
                        color: "",
                        type: "",
                        description: "",
                        quantity: ""
                    });
                    setEditProduct(null);
                    setShow(true);
                }}>Add Product</Button>
            </div>

            <h2 className="mt-5 text-center">Filter Products</h2>
            <div className="d-flex justify-content-center mb-4">
                <Form.Control as="select" value={colorFilter} onChange={(e) => setColorFilter(e.target.value)} className="mr-2">
                    <option value="">All Colors</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    {/* Add more colors as needed */}
                </Form.Control>
                <Form.Control as="select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                    <option value="">All Types</option>
                    <option value="dress">Dress</option>
                    <option value="shirt">Shirt</option>
                    <option value="saree">Saree</option>
                    {/* Add more types as needed */}
                </Form.Control>
            </div>

            <h2 className="mt-5 text-center">Product List</h2>
            <Row>
                {filteredProducts.map((product) => (
                    <Col md={4} key={product._id} className="mb-4">
                        <Card className="product-card">
                            <Card.Img variant="top" src={product.imageUrl} />
                            <Card.Body>
                                <Card.Title>{product.productName}</Card.Title>
                                <Card.Text>
                                    {product.description}
                                </Card.Text>
                                <div className="d-flex justify-content-between">
                                    <Button variant="link" onClick={() => handleSingleProduct(product._id)}>See More</Button>
                                    <Button variant="secondary" onClick={() => handleEdit(product)}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDelete(product._id)}>Delete</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editProduct ? "Edit Product" : "Add New Product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formImageUrl">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formProductName">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control type="text" name="productName" value={formData.productName} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" name="price" value={formData.price} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formColor">
                            <Form.Label>Color</Form.Label>
                            <Form.Control type="String" name="color" value={formData.color} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formType">
                            <Form.Label>Type</Form.Label>
                            <Form.Control type="String" name="type" value={formData.type} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="formQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">{editProduct ? "Save Changes" : "Add Product"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};



export default ProductComponent;
