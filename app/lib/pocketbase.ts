import PocketBase from 'pocketbase';
import { TypedPocketBase } from './definitions-pb';

const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;

export default pb;