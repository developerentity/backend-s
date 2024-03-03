export type QueryProductModel = {
  pageSize: string;
  pageNumber: string;
  sortField: string;
  sortOrder: string;
  /**
   * This title should be included in Title of found Products
   */
  title: string;
};
