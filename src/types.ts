/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'ca' | 'es';

export type ServiceCategory = 'perruqueria' | 'estetica';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  duration: number; // in minutes
  price: number; // in EUR
  description: string;
  isPopular?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  date: string;
  rating: number; // from 1 to 5
  comment: string;
  avatar?: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface BookingData {
  id?: string;
  serviceId: string;
  stylistId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
  createdAt?: string;
}
