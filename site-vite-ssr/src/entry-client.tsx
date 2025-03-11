import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { MainPageRoute, RouterProvider } from './browserRouter/RouterProvider';
import { buildEntryRoutes } from './routes/entryRoutes';

const initialRouteData = (window as any).COMET_ROUTE_DATA;
const entryRoutes = buildEntryRoutes(initialRouteData.predefinedPages);

hydrateRoot(
  document.getElementById('root') as HTMLElement,
    <StrictMode>
      <RouterProvider initialRouteData={initialRouteData}>
        <MainPageRoute entryRoutes={entryRoutes} />
      </RouterProvider>
    </StrictMode>,
)
