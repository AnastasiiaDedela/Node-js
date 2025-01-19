import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../users.json');

export const readUsersFromFile = () => {
  const data = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(data);
};

export const writeUsersToFile = (users) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));
};
