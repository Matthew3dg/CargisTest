export interface OrdersListResponse {
  orders: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_number: number;
  company_id: number;
  order_state_id: number;
  views_count: number;
  create_dt: string;
  load_dt: string;
  ending_dt: string;
  loading_address: string;
  unloading_address: string;
  distance_m: number;
  cargo_type: string;
  tonnage_balance_kg: number;
  tonnage_kg: number;
  tariff_c: number;
  tariff_nds_c: number;
  cargo_condition: string;
  packing_way: string;
  number_of_places: string;
  type_of_container: string;
  coords_from: Coords;
  coords_to: Coords;
  quantity_partners: number;
  quantity_trips: number;
  offers_count: number;
  status_1c: string;
  company: Company;
}

export interface Coords {
  latitude: number;
  longitude: number;
}

export interface Company {
  short_name: string;
  logo: Logo;
  company_phone: string;
}

export interface Logo {
  id: number;
  file: string;
  preview: string;
  mime: string;
}
