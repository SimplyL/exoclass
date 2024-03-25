import { SubscriptionPaymentType } from '@/types/group.type';

export interface GroupItemLocation {
  id: number;
  address: string;
  street: string;
  house_number: string;
  lat: string;
  lon: string;
  city: string;
  country: string;
}

export interface GroupItemSchedule {
  day: string;
  duration: number;
  start_time: string;
  end_time: string;
}

export interface GroupListPaymentType {
  id: number;
  name: string;
  type: string;
}

export interface GroupItemActivityImage {
  id: number;
  name: string;
  path: string;
}

export interface GroupItemActivity {
  id: number;
  name: string;
  description: string;
  images: GroupItemActivityImage[];
}

export interface GroupItemDifficultyType {
  id: number;
  provider_id: number;
  name: string;
  description: string | null;
}

export interface GroupItemProvider {
  email: string;
  phone: string;
  currency_code: string;
}

export interface GroupItemPaymentType {
  id: number;
  type: string;
}

export interface GroupItemPaymentIntervals {
  id: number;
  name: SubscriptionPaymentType;
  group_price: number;
  payment_type: GroupItemPaymentType;
}

export interface GroupItem {
  id: number;
  external_key: string;
  name: string;
  image: string;
  age_groups: number[];
  start_date: string;
  end_date: string;
  location: GroupItemLocation;
  group_days_schedule: GroupItemSchedule[];
  activity: GroupItemActivity;
  difficulty_type: GroupItemDifficultyType;
  attendees: number;
  capacity: number;
  is_started: boolean;
  provider: GroupItemProvider;
  payment_intervals: GroupItemPaymentIntervals[];
}

export interface GroupListLinks {
  self: string;
}

export interface GroupListMeta {
  payment_types: GroupListPaymentType[];
}

export interface GroupListResponse {
  data: GroupItem[];
  links: GroupListLinks;
  meta: GroupListMeta;
}

export interface GroupItemResponse {
  data: GroupItem;
}
