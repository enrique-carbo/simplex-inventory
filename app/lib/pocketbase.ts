import PocketBase from 'pocketbase';
import { TypedPocketBase } from './definitions-pb';

const pb = new PocketBase('https://simplex-inventario.pockethost.io') as TypedPocketBase;

export default pb;