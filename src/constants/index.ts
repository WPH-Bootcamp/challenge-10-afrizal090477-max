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
  { name: 'All Food', href: '/' },
  { name: 'Nearby', href: '?category=Nearby' },
  { name: 'Discount', href: '?category=Discount' },
  { name: 'Best Seller', href: '?category=Best Seller' },
  { name: 'Delivery', href: '?category=Delivery' },
  { name: 'Lunch', href: '?category=Lunch' },
];


export const FooterHelp: FooterLink[] = [
  { name: 'How to Order', href: 'orders' },
  { name: 'Payment Methods', href: '#' },
  { name: 'Track My Order', href: 'orders' },
  { name: 'FAQ', href: '#' },
  { name: 'Contact Us', href: '#' },
];