import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
    BaseApplicationCustomizer
} from '@microsoft/sp-application-base';

import * as strings from 'CustomCssApplicationCustomizerStrings';

const LOG_SOURCE: string = 'CustomCssApplicationCustomizer';

export interface ICustomCssApplicationCustomizerProperties {
    cssClass: string;
    marginTop: string;
}

export default class CustomCssApplicationCustomizer
    extends BaseApplicationCustomizer<ICustomCssApplicationCustomizerProperties> {

    @override
    public onInit(): Promise<void> {
        Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);

        // Get properties from configuration
        const cssClass = this.properties.cssClass || 'w_k_FZA_-aI_E';
        const marginTop = this.properties.marginTop || '-50px';

        // Inject custom CSS
        this.injectCustomCSS(cssClass, marginTop);

        return Promise.resolve();
    }

    private injectCustomCSS(cssClass: string, marginTop: string): void {
        // Create a style element
        const style = document.createElement('style');
        style.type = 'text/css';

        // Define the CSS rule
        const css = `
      .${cssClass} {
        margin-top: ${marginTop} !important;
      }
    `;

        // Add the CSS to the style element
        style.appendChild(document.createTextNode(css));

        // Append the style element to the document head
        document.head.appendChild(style);

        Log.info(LOG_SOURCE, `Custom CSS injected for class: ${cssClass} with margin-top: ${marginTop}`);
    }
}
