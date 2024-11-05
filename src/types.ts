
import { ParsedUrlQuery } from 'querystring';

export interface Product {
  title: string;
  id: string;
  description: string;
  price: number;
  image: {
    url: string;
    width: number;
    height: number;
  }
}

export interface IParams extends ParsedUrlQuery {
  product_id: string;
}


export interface CartItem {
  product_id: string;
  quantity: number;
}

export interface CartState {
  total: number;
  cart: Array<CartItem>;
}


export interface TotalAction {
  payload: number;
}

export interface CartAction {
  payload: string;
}