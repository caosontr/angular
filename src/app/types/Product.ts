
export type Product = {
  id: number; 
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type ProductAdmin = {
  _id: string;
  id: number; 
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
};

