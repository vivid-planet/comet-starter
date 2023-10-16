import {
    ContentScopeConfigProps,
    useContentScope as useContentScopeLibrary,
    UseContentScopeApi,
    useContentScopeConfig as useContentScopeConfigLibrary,
} from "@comet/cms-admin";
import { ContentScope } from "@src/common/ContentScopeProvider";

// convenince wrapper for app (Bind Generic)
export function useContentScope(): UseContentScopeApi<ContentScope> {
    return useContentScopeLibrary<ContentScope>();
}

export function useContentScopeConfig(p: ContentScopeConfigProps): void {
    return useContentScopeConfigLibrary(p);
}
