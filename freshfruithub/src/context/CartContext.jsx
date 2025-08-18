import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../api/axios";

const CartContext = createContext({
  items: [],
  count: 0,
  refresh: async () => {},
  addItem: async () => {},
  updateQty: async () => {},
  removeItem: async () => {},
  clear: async () => {},
});

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const loadFromServer = async () => {
    try {
      const { data } = await api.get("/cart/mine");
      setItems(
        (data?.items || []).map((i) => ({
          product: i.product,
          quantity: i.quantity,
          priceAtAddTime: i.priceAtAddTime,
        }))
      );
      localStorage.setItem(
        "cart_items",
        JSON.stringify(
          (data?.items || []).map((i) => ({
            product: i.product._id,
            quantity: i.quantity,
          }))
        )
      );
    } catch (_) {
      const local = JSON.parse(localStorage.getItem("cart_items") || "[]");
      setItems(
        local.map((i) => ({
          product: { _id: i.product },
          quantity: i.quantity,
        }))
      );
    }
  };

  useEffect(() => {
    loadFromServer();
  }, []);

  const persist = async (nextItems) => {
    setItems(nextItems);
    localStorage.setItem(
      "cart_items",
      JSON.stringify(
        nextItems.map((i) => ({
          product: i.product._id || i.product,
          quantity: i.quantity,
        }))
      )
    );
    try {
      await api.put("/cart/mine", {
        items: nextItems.map((i) => ({
          product: i.product._id || i.product,
          quantity: i.quantity,
        })),
      });
    } catch (_) {
      // ignore
    }
  };

  const addItem = async (product, delta = 1) => {
    const next = [...items];
    const pid = product._id || product.id;
    const idx = next.findIndex((i) => (i.product._id || i.product) === pid);
    if (idx >= 0) {
      next[idx] = { ...next[idx], quantity: next[idx].quantity + delta };
    } else {
      next.push({ product, quantity: delta, priceAtAddTime: product.price });
    }
    await persist(next);
  };

  const updateQty = async (productId, quantity) => {
    const next = items
      .map((i) => ({ ...i }))
      .filter(
        (i) => (i.product._id || i.product) !== productId || quantity > 0
      );
    const idx = next.findIndex(
      (i) => (i.product._id || i.product) === productId
    );
    if (idx >= 0) next[idx].quantity = quantity;
    await persist(next);
  };

  const removeItem = async (productId) => {
    const next = items.filter(
      (i) => (i.product._id || i.product) !== productId
    );
    await persist(next);
  };

  const clear = async () => persist([]);

  const count = useMemo(
    () => items.reduce((sum, i) => sum + (i.quantity || 0), 0),
    [items]
  );

  const value = {
    items,
    count,
    refresh: loadFromServer,
    addItem,
    updateQty,
    removeItem,
    clear,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
