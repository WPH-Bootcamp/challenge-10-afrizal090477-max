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
  { name: 'All Food', href: '#' },
  { name: 'Nearby', href: '#' },
  { name: 'Discount', href: '#' },
  { name: 'Best Seller', href: '#' },
  { name: 'Delivery', href: '#' },
  { name: 'Lunch', href: '#' },
];


export const FooterHelp: FooterLink[] = [
  { name: 'How to Order', href: '#' },
  { name: 'Payment Methods', href: '#' },
  { name: 'Track My Order', href: '#' },
  { name: 'FAQ', href: '#' },
  { name: 'Contact Us', href: '#' },
];