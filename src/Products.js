import axios from "axios";
import { Modal } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const Products = () => {
  /* -----------------------creating axios instance----------------------- */
  const axiosInstance = axios.create({
    baseURL: "http://localhost:7000/products",
  });
  /* -----------------Lodash Package ----------------------------------- */
  const _ = require("lodash");
  //var object = require('lodash/fp/object');

  /* --------------------useStates---------------------------------------- */
  const [details, setDetails] = useState([]);
  const [err, setErr] = useState([]);
  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);
  const [newProduct, setNewProduct] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    gender: "",
    type: "",
    img: "",
    inCart: false,
    category: "",
  });


  /* clearing new product state */
  const clearNewProduct=()=>{
    setNewProduct({
      id: 0,
      name: "",
      description: "",
      price: 0,
      gender: "",
      type: "",
      img: "",
      inCart: false,
      category: "",
    });
  };
  /* -----------------functions setting modal state--------------------- */
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /* -----------------useEffect for getting details to diplay --------------------------------*/
  useEffect(() => {
    axiosInstance
      .get("/")
      .then((res) => {
        setDetails(res.data);
        //console.log(details);
      })
      .catch((e) => setErr(e));
    console.log(details);
  }, []);

  useEffect(() => {
    console.log(details);
  }, [details]);

  useEffect(() => {
    console.log(newProduct);
  }, [newProduct]);
  /* -------------------------------crud ops >add,update,del---------------------------------- */

  /* -------------------------------del----------------------------------------------------- */
  const handleDel = (id) => {
    console.log(id);
    axiosInstance.delete(`/${id}`).then((res) => {
      console.log(res.data);
      setDetails(details.filter((detail) => !_.isEqual(detail, res.data)));
      console.log(details);
    });
  };
  /* ------------------------------update------------------------------------------------------- */
  const handleUpdateButtonClick = async (id) => {
    console.log(id);
    setUpdate(true);
    await axiosInstance
      .get(`/${id}`)
      .then((res) => {
        console.log(res.data);
        setNewProduct(res.data);
        //handleUpdate(id);
        handleShow();
      })
      .catch((err) => console.log("error in update,couldnot get data" + err))
      .finally(console.log("fetching action done"));
  };

  const handleUpdate = (id) => {
    //console.log(5);
    console.log(id);
    console.log(newProduct);
    const { name, description, price, gender, type, img, inCart, category } =
      newProduct;
    const priceInt = parseInt(price, 10);
    if (
      id === "" ||
      name === "" ||
      description === "" ||
      isNaN(priceInt) ||
      gender === "" ||
      type === "" ||
      img === "" ||
      category === ""
    ) {
      console.log(2);
      return;
    } else {
      console.log(3);

      axiosInstance
        .put(`/${id}`, newProduct)
        .then((res) => {
          console.log(res.data);

          setDetails(
            details.map((detail) =>
              detail.id == res.data.id ? res.data : detail
            )
          );
          console.log(4444444444);
          handleClose();
          clearNewProduct();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          console.log("adding action done");
          setUpdate(false);

        });
    }
  };
  /*  axiosInstance
      .put(`http://localhost:7000/products/${id}`, newProduct)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(console.log("adding action done"));


    setNewProduct({
      id: "",
      name: "",
      description: "",
      price: "",
      gender: "",
      type: "",
      img: "",
      inCart: "false",
      category: "",
    }); */

  /* ------------------------------------------add---------------------------------------------- */
  const handleAdd = (e) => {
    e.preventDefault();
    console.log(1);

    const {
      id,
      name,
      description,
      price,
      gender,
      type,
      img,
      inCart,
      category,
    } = newProduct;
    const priceInt = parseInt(price, 10);
    const inCartBool = inCart === "true";
    if (
      id === "" ||
      name === "" ||
      description === "" ||
      isNaN(priceInt) ||
      gender === "" ||
      type === "" ||
      img === "" ||
      typeof inCartBool !== "boolean" ||
      category === ""
    ) {
      console.log(2);
      return;
    } else {
      console.log(3);
      axiosInstance
        .post("http://localhost:7000/products", newProduct)
        .then((res) => {
          setDetails([...details, res.data]);
         clearNewProduct();

          handleClose();
        })
        .catch((err) => {
          console.log("cannot add the data");
        });
    }
    console.log(4);
    console.log(details);
  };

  /*--------------------- setting state of new Product---------------------------------  */
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setNewProduct({
      ...newProduct,
      [id]:id=="inCart"?Boolean(value):value,
    });
    console.log(newProduct);
  };

  /*  {
      "id": "18",
      "name": "Black Shirt Men",
      "description": "Black Shirt for Men",
      "price": 9,
      "gender": "men",
      "type": "shirt",
      "img": "http://media.istockphoto.com/photos/smiling-man-in-a-black-t-shirt-picture-id520883622?k=6&m=520883622&s=612x612&w=0&h=XuxfQE0EOo_uWqA8SzNJvZ9Vn-sKR_cT4J9GRIudE4U=",
      "inCart": false,
      "category": "clothes"
    } */

  /* -----------------------------------component------------------------------------ */
  return (
    <div>
      <center>
        <h1>Products</h1>
      </center>

      <div className="container text-center">
        {details.map((detail, index) => (
          <div key={index} className="row">
            <div className="col">{index}</div>
            <div className="col">{detail.id}</div>

            <div className="col">{detail.name}</div>
            <div className="col">{detail.description}</div>
            <div className="col">{detail.price}</div>

            <div className="col">{detail.gender}</div>
            <div className="col">{detail.type}</div>

            <div className="col">
              {detail.inCart ? "available" : "notavailable"}
            </div>
            <div className="col">{detail.category}</div>
            <div className="col">
              {" "}
              <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => handleUpdateButtonClick(parseInt(detail.id))}
              >
                update
              </button>
              {/* <button onClick={() => handleUpdate(detail.id)}> update</button>
               */}
            </div>
            <div className="col">
              {" "}
              <button
                onClick={() => {
                  handleDel(detail.id);
                }}
              >
                {" "}
                delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <center>
        <div>
          {" "}
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Product
          </button>{" "}
        </div>
      </center>

      {/* -----------------------Moadl------------------------------ */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add Product
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="card" style={{ width: "29rem" }}>
                <div class="card-body">
                  <h5 class="card-title">
                    <center>
                      <h3>Product Information</h3>
                    </center>
                  </h5>
                  <p class="card-text">
                    <form>
                      <div class="mb-3">
                        <label for="productId" class="form-label">
                          ID
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="id"
                          value={newProduct.id}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="productName" class="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="name"
                          value={newProduct.name}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="productDescription" class="form-label">
                          Description
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="description"
                          value={newProduct.description}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="productPrice" class="form-label">
                          Price
                        </label>
                        <input
                          type="number"
                          class="form-control"
                          id="price"
                          value={newProduct.price}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="productGender" class="form-label">
                          Gender
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="gender"
                          value={newProduct.gender}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="productType" class="form-label">
                          Type
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="type"
                          value={newProduct.type}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="productImg" class="form-label">
                          Image URL
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="img"
                          value={newProduct.img}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <div class="mb-3">
                        <label for="productInCart" class="form-label">
                          In Cart
                        </label>
                        <select
                          class="form-control"
                          id="inCart"
                          value={newProduct.inCart}
                          onChange={(e) => handleChange(e)}
                        >
                          <option value="true" selected>
                            available
                          </option>
                          <option value="false">not available</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="productCategory" class="form-label">
                          Category
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="category"
                          value={newProduct.category}
                          onChange={(e) => handleChange(e)}
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          update ? handleUpdate(newProduct.id) : handleAdd(e);
                        }}
                      >
                        {update ? "update" : "sumbit"}
                      </button>
                    </form>
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*  "id": 1,
      "name": "Brown Shirt",
      "description": "Brown T-Shirt for Women",
      "price": 16.99,
      "gender": "women",
      "type": "shirt",
      "img": "https://image.ibb.co/kOhL6k/img1.jpg",
      "inCart": false,
      "category": "clothes" */}
    </div>
  );
};

export default Products;
