
export interface CartItem {
  id: string;
  productLineName: string;
  productSizeValue: string;
  productColorValue: string;
  price: number;
  quantity: number;
}

export const loadCart = (): CartItem[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (item: CartItem): void => {
  const cart = loadCart();
  const existingItem = cart.find(cartItem => cartItem.id === item.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  
  saveCart(cart);
};

export const isInCart = (itemId: string): boolean => {
  const cart = loadCart();
  return cart.some(cartItem => cartItem.id === itemId);
};

export const resetCart = (): void => {
  localStorage.setItem("cart", JSON.stringify([]));
};