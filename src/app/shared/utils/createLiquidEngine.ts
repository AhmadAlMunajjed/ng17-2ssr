import { Liquid } from 'liquidjs';
const fileExtention = '.liquid'; // get from settings

function createLiquidEngine(options: { useLocalTheme?: boolean, themeBaseUrl: string, themeName: string }): Liquid {
    if (!options.useLocalTheme && !options.themeBaseUrl) {
        throw new Error('themeBaseUrl is required when useLocalTheme is false');
    }

    if (options.useLocalTheme) {
        return new Liquid({
            root: options.themeBaseUrl,
            extname: fileExtention
        });
    } else {
        const customResolver = {
            resolve(dir: string, file: string, ext: string) {
                return `${file}${ext}`;
            },
            existsSync(filePath: string): boolean {
                throw new Error('Not implemented. Call async exists instead. This is a sync method called only when engine.renderSync is called, you need to call engine.renderSync instead of engine.render');
            },
            readFileSync(filePath: string): string {
                throw new Error('Not implemented. Call async readFile instead. This is a sync method called only when engine.renderSync is called, you need to call engine.renderSync instead of engine.render');
            },
            async readFile(filePath: string) {
                // Construct the full URL to the file
                const url = `${options.themeBaseUrl}/${options.themeName}/${filePath}`;
                // Fetch the file content from the remote URL
                const response = await fetch(url);
                return response.text();
            },
            async exists(filePath: string) {
                const url = `${options.themeBaseUrl}/${options.themeName}/${filePath}`;
                const response = await fetch(url);
                return response.status === 200;
            }
        };

        // Use type assertion to bypass the type check
        return new Liquid({
            extname: fileExtention,
            partials: '/', // Dont remove it, it's required to make the customResolver works
            fs: customResolver,
            cache: true, // enable cache for production. Disable it for development
            relativeReference: false
        });
    }
}

export default createLiquidEngine;
