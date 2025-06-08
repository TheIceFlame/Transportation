export interface Paginated {
}
export interface PaginatedOrders {
  Orders: DeliveryItem[];
  page: number;
  pages: number;
  size: number;
  nb_Orders: number;
}
interface DeliveryItem {
  id: number;
  name: string;
  description: string;
  dimensions: string;
  weight: number;
  reference: string;
  merchantId: number;
  paymentMethod: any; // Extend if more methods exist
  requiresRefrigeration: boolean;
  startingDestination: number; // Assuming it's a latitude or coordinate
  endingDestination: number;
  status: any; // Extend as needed
}
