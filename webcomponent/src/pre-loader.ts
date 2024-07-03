if (process.env.NODE_ENV === "production") {
    const scripts = document.getElementsByTagName("script");
    [].every.call(scripts, (script: HTMLScriptElement) => {
        const m = script.src.match(/^(.*)?\/comet-webcomponent/);
        if (m) {
            // @ts-ignore
            __webpack_public_path__ = m[1] + __webpack_public_path__;
            return false;
        }
        return true;
    });
}
