import {Coords} from './ordersList';

export interface OrderDetails {
  id: number;
  order_number: number;
  cashless_payment: number;
  count_shipping: number;
  count_shipping_done: number;
  count_offers: number;
  company_id: number;
  company_inn: string;
  consignee_inn: string;
  shipper_inn: string;
  order_state_id: number;
  principal: string;
  cargo_type: string;
  cargo_type_object: CargoTypeObject;
  loading_address: string;
  loading_city: string;
  unloading_address: string;
  unloading_city: string;
  load_dt: string;
  distance_m: number;
  tonnage_kg: number;
  tariff_c: number;
  tariff_nds_c: number;
  tariff: Tariff;
  coords_from: string;
  coords_to: string;
  loading_desc: string;
  downtime_desc: string;
  downtime_cost: number;
  accept_offers: number;
  accept_alt_offers: number;
  deviation_percent: number;
  deviation_type: string;
  scales_length_cm: number;
  scales_capacity_kg: number;
  separate_weighing: number;
  overload: number;
  create_dt: string;
  daily_shipping_rate_kg: number;
  transport_type: string;
  consignee: string;
  consignee_contact: string;
  consignee_contact_phone: string;
  shipper: string;
  shipper_contact: string;
  shipper_contact_phone: string;
  tonnage_balance_kg: number;
  cargo_cost_c: number;
  visible: string;
  cargo_name: string;
  cargo_condition: string;
  packing_way: string;
  type_of_container: string;
  number_of_places: number;
  shipper_company_shortname: string;
  kontur_status: number;
  managers: any[];
  offersList: any[];
  coords_intermediate: Coords;
  additional_info: string;
  ending_dt: string;
  verification: number;
  views_count: number;
  total_count_offers: number;
  lat_lng_from: Coords;
  lat_lng_to: Coords;
  _links: Links;
  status_1c: string;
}

export interface CargoTypeObject {
  id: number;
  title: string;
  order_type_id: number;
  nomenclature_code: string;
}

export interface Tariff {
  cost_c: number;
  description: string;
}

export interface Links {
  self: Link;
  company: Link;
  offer: Link;
}

export interface Link {
  href: string;
}
