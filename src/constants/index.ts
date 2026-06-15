import { Category } from '@/types/resto';

interface FooterLink {
  name: string;
  href: string;
}

export const RestoCategories: Category[] = [
  { name: 'All Restaurant', imageSrc: '/icons/All-Food.png' },
  { name: 'Nearby', imageSrc: '/icons/Location.png' },
  { name: 'Discount', imageSrc: '/icons/Discount.png' },
  { name: 'Best Seller', imageSrc: '/icons/Best-Seller.png' },
  { name: 'Delivery', imageSrc: '/icons/Delivery.png' },
  { name: 'Lunch', imageSrc: '/icons/Lunch.png' },
];

export const FooterExplore: FooterLink[] = [
  { name: 'All Food', href: 'All Restaurant' },
  { name: 'Nearby', href: 'Nearby' },
  { name: 'Discount', href: 'Discount' },
  { name: 'Best Seller', href: 'Best Seller' },
  { name: 'Delivery', href: 'Delivery' },
  { name: 'Lunch', href: 'Lunch' },
];


export const FooterHelp: FooterLink[] = [
  { name: 'How to Order', href: 'orders' },
  { name: 'Payment Methods', href: '#' },
  { name: 'Track My Order', href: '#' },
  { name: 'FAQ', href: '#' },
  { name: 'Contact Us', href: '#' },
];