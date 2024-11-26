import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const url = "https://nextgenshopapp.onrender.com/api";

  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/all`, {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        });

        setProducts(api.data.products);
        setFilteredData(api.data.products);
        userProfile();
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProduct();
    userCart();
  }, [token]);

  useEffect(() => {
    const lstoken = localStorage.getItem("token");
    if (lstoken) {
      setToken(lstoken);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    userCart(); // Fetch cart whenever reload changes
  }, [reload]);

  // Register user
  const register = async (name, email, password) => {
    try {
      const api = await axios.post(
        `${url}/user/register`,
        { name, email, password },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      return api.data;
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Registration failed.", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const api = await axios.post(
        `${url}/user/login`,
        { email, password },
        {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });

      setToken(api.data.token);
      setIsAuthenticated(true);
      localStorage.setItem("token", api.data.token);
      return api.data;
    } catch (error) {
      console.error("Error logging in user:", error);
      toast.error("Login failed.", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  // Logout user
  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");
    toast.success("Logout successfully", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      transition: Bounce,
    });
  };

  // Fetch user profile
  const userProfile = async () => {
    try {
      const api = await axios.get(`${url}/user/profile`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      setUser(api.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Add to cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    try {
      const api = await axios.post(
        `${url}/cart/add`,
        { productId, title, price, qty, imgSrc },
        {
          headers: {
            "Content-Type": "Application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });

      setReload(!reload); // Trigger the reload useEffect
      await userCart(); // Ensure cart updates immediately
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  // Fetch user cart
  const userCart = async () => {
    try {
      const api = await axios.get(`${url}/cart/user`, {
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });

      setCart(api.data.cart);
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  //decrease qty
  const decreaseQty = async (productId,qty) => {
    try {
      const api = await axios.post(`${url}/cart/--qty`, {productId,qty},{
        headers: {
          "Content-Type": "Application/json",
          Auth: token,
        },
        withCredentials: true,
      });

      // setCart(api.data.cart);
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        url,
        token,
        setIsAuthenticated,
        isAuthenticated,
        filteredData,
        setFilteredData,
        logout,
        user,
        addToCart,
        cart,
      }}
    >
      {props.children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export default AppState;
