export interface CartItem {
  productId: number;
  title: string;
  price: number;
  unitName?: string;
  image?: string;
  subCategoryId?: number;
  quantity: number;
}

export interface CartStoreState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalCount: () => number;
  getSubtotal: () => number;
}

