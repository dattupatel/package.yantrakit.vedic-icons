export interface iIcon {
  name: string;
  category: string;
  aliases: string[];
  styles: string[];
}

export const icons: iIcon[] = [
  {
    name: 'diya',
    category: 'festivals',
    aliases: ['lamp', 'oil-lamp', 'oil lamp', 'deepak', 'deepam', 'light', 'festival', 'diwali', 'puja'],
    styles: ['solid', 'outlined'],
  },
];

export const categories = [...new Set(icons.map((icon) => icon.category))];
