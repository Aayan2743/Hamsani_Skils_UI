import { getMenuData } from '../lib/menuService';
import HeaderNewClient from './HeaderNewClient';

// Server Component - fetches menu data once
export default async function HeaderNewServer() {
  // Fetch menu data on the server with caching
  const menuData = await getMenuData();

  // Pass the pre-fetched data to the client component
  return <HeaderNewClient initialMenuData={menuData} />;
}
