import path from 'path';

// Local paths
export const logsDirLocal = path.join(process.cwd(), 'logs');

export const baseDirLocal = path.join(__dirname, '..', '..');
export const viewsDirLocal = path.join(baseDirLocal, 'views');
export const publicDirLocal = path.join(baseDirLocal, 'public');
export const uploadsDirLocal = path.join(publicDirLocal, 'uploads');

// Views
export const pagesViewDir = 'pages';
export const indexViewDir = path.join(pagesViewDir, 'index.ejs');
export const errorViewDir = path.join(pagesViewDir, 'error.ejs');
export const cartViewDir = path.join(pagesViewDir, 'cart.ejs');
export const chatViewDir = path.join(pagesViewDir, 'chat.ejs');
export const loginViewDir = path.join(pagesViewDir, 'login.ejs');
export const logoutViewDir = path.join(pagesViewDir, 'logout.ejs');
export const signupViewDir = path.join(pagesViewDir, 'signup.ejs');
export const productsViewDir = path.join(pagesViewDir, 'products.ejs');
