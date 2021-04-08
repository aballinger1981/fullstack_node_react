import devKeys from './dev';
import prodKeys from './prod';

const selectedKeys = process.env.NODE_ENV === 'production' ? prodKeys : devKeys;

export default selectedKeys;