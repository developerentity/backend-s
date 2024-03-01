export type ProductViewModel = {
  /**
   * Product ID
   */
  id: number;
  /**
   * Product title
   */
  title: string;
};

export type ProductsListViewModel = {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  items: ProductViewModel[];
};
