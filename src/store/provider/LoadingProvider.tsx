import { Provider } from 'react-redux';
import { loadingStore } from '../loadingStore';

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={loadingStore}>{children}</Provider>;
}
