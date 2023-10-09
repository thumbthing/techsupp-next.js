import { productStore } from '@/store/productStore';
import { Provider } from 'react-redux';

export default function ProductProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={productStore}>{children}</Provider>;
}
