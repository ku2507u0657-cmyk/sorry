const base = import.meta.env.BASE_URL;

export const imageUrl = (file: string) => `${base}images/${file}`;
export const audioUrl = (file: string) => `${base}audio/${file}`;
