import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { MainPageRoute, RouterProvider } from './browserRouter/RouterProvider';


hydrateRoot(
  document.getElementById('root') as HTMLElement,
    <StrictMode>
      <RouterProvider>
        <MainPageRoute />
      </RouterProvider>
    </StrictMode>,
)
