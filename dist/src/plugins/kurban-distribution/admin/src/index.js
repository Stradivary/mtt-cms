"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pluginId_1 = require("./pluginId");
const Initializer_1 = require("./components/Initializer");
const PluginIcon_1 = require("./components/PluginIcon");
require("./custom.css");
exports.default = {
    register(app) {
        app.addMenuLink({
            to: `plugins/${pluginId_1.PLUGIN_ID}`,
            icon: PluginIcon_1.PluginIcon,
            intlLabel: {
                id: `${pluginId_1.PLUGIN_ID}.plugin.name`,
                defaultMessage: pluginId_1.PLUGIN_ID,
            },
            Component: async () => {
                const { App } = await import('./pages/App.js');
                return App;
            },
        });
        app.registerPlugin({
            id: pluginId_1.PLUGIN_ID,
            initializer: Initializer_1.Initializer,
            isReady: false,
            name: pluginId_1.PLUGIN_ID,
        });
    },
    async registerTrads({ locales }) {
        return Promise.all(locales.map(async (locale) => {
            try {
                const { default: data } = await import(`./translations/${locale}.json`);
                return { data, locale };
            }
            catch {
                return { data: {}, locale };
            }
        }));
    },
};
