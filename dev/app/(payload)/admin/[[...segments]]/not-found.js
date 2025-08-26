import config from '@payload-config';
import { generatePageMetadata, NotFoundPage } from '@payloadcms/next/views';
import { importMap } from '../importMap.js';
export const generateMetadata = ({ params, searchParams }) => generatePageMetadata({ config, params, searchParams });
const NotFound = ({ params, searchParams }) => NotFoundPage({ config, importMap, params, searchParams });
export default NotFound;
