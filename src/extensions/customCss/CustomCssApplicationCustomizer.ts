import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
    BaseApplicationCustomizer
} from '@microsoft/sp-application-base';

import * as strings from 'CustomCssApplicationCustomizerStrings';

const LOG_SOURCE = 'CustomCssApplicationCustomizer';
declare const PACKAGE_VERSION: string;

export interface ICustomCssApplicationCustomizerProperties {
    cssClass: string;
    marginTop: string;
}

export default class CustomCssApplicationCustomizer
    extends BaseApplicationCustomizer<ICustomCssApplicationCustomizerProperties> {

    @override
    public onInit(): Promise<void> {
        Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
        console.log(LOG_SOURCE, '', `Initialized ${strings.Title}`);
        console.log(LOG_SOURCE, `CustomCss Customizer v${PACKAGE_VERSION} loaded`);

        // Get properties from configuration
        const cssClass = this.properties.cssClass || 'w_k_FZA_-aI_E';
        const marginTop = this.properties.marginTop || '0px';

        // Inject custom CSS
        this.injectCustomCSS(cssClass, marginTop);

        // Get username from SPFx context
        const username: string = this.context.pageContext.user.displayName;

        // Update topic header with username
        const updateHeader = (): void => {
            const headerSpan: HTMLSpanElement | null = document.querySelector('span[data-automation-id="topicHeaderText"]');
            if (headerSpan) {
                headerSpan.textContent = `Welcome ${username}`;
                headerSpan.setAttribute('title', `Welcome ${username}`);
            } else {
                setTimeout(updateHeader, 1000);
            }
        };
        updateHeader();

        // Allow topicHeaderText to wrap to two lines on mobile via JS
        const handleMobileResize = (): void => {
            const el: HTMLElement | null = document.querySelector('.t_HFlKV_Wr9CO.f_WIRdV_Wr9CO');
            if (el) {
                if (window.innerWidth <= 640) {
                    el.style.setProperty('white-space', 'normal', 'important');
                    el.style.setProperty('overflow-wrap', 'break-word', 'important');
                    el.style.removeProperty('max-width');
                } else {
                    el.style.setProperty('white-space', 'nowrap', 'important');
                    el.style.removeProperty('overflow-wrap');
                    el.style.removeProperty('max-width');
                }
            } else {
                setTimeout(handleMobileResize, 1000);
            }
        };
        handleMobileResize();
        window.addEventListener('resize', handleMobileResize);

        // Force hide all webPartHeader divs via JS
        const hideWebPartHeaders = (): void => {
            const headers: NodeListOf<HTMLElement> = document.querySelectorAll('div.w_ciTNc_-aI_E[data-automation-id="webPartHeader"]');
            headers.forEach((header: HTMLElement) => {
                header.style.setProperty('display', 'none', 'important');
                header.style.setProperty('min-height', '0px', 'important');
                header.style.setProperty('max-height', '0px', 'important');
            });
            if (headers.length === 0) {
                setTimeout(hideWebPartHeaders, 1000);
            }
        };
        hideWebPartHeaders();

        // Add version to footer on the left side
        const addVersionToFooter = (): void => {
            const footerContainer: HTMLElement | null = document.querySelector('[data-automationid="SimpleFooter"]');
            if (footerContainer) {
                // Check if version element already exists
                if (!footerContainer.querySelector('.footer-version-display')) {
                    // Create version element
                    const versionDiv = document.createElement('div');
                    versionDiv.className = 'footer-version-display';
                    versionDiv.textContent = `v${PACKAGE_VERSION}`;
                    versionDiv.setAttribute('title', `Version ${PACKAGE_VERSION}`);
                    versionDiv.style.cssText = 'display: flex; align-items: center; font-size: 12px; color: #666; margin-right: auto;';
                    
                    // Insert at the beginning of the footer container
                    footerContainer.insertBefore(versionDiv, footerContainer.firstChild);
                }
            } else {
                setTimeout(addVersionToFooter, 1000);
            }
        };
        addVersionToFooter();

        return Promise.resolve();
    }

    private injectCustomCSS(cssClass: string, marginTop: string): void {
        // Create a style element
        const style = document.createElement('style');
        style.type = 'text/css';

        // Define the CSS rule
        const css = `
      .${cssClass} {
      }
      
      #vpc_WebPart\\.ListWebPart\\.internal\\.933a17ef-f812-492e-8cfa-174245b5640c div.w_ciTNc_-aI_E {
        max-height: 0px !important;
        display: none !important;
        overflow: hidden !important;
      }
      
      .w_1r9JN_YBjGt .h_rPihh_YBjGt {
        height: 0px !important;
      }
      
      #\\36 f0594e0-636f-4e47-8c7f-fea0771b8912 div.w_ciTNc_-aI_E {
        min-height: 0px !important;
        max-height: 0px !important;
        overflow: hidden !important;
      }
      
      #wpartwrapper-6f0594e0-636f-4e47-8c7f-fea0771b8912 {
        margin: 0px !important;
        padding: 0px !important;
      }
      
      #employee-acknowledgment .fontSizeMega.rte-fontscale-font-max {
        font-size: 36px !important;
      }
      
      span.topicHeaderText {
        font-size: 18px !important;
      }
      
      div.w_ciTNc_-aI_E[data-automation-id="webPartHeader"] {
        display: none !important;
        min-height: 0px !important;
      }
      
      #\\33 2f126b-9bc3-436b-a8a3-f89e213bc48c div.w_ciTNc_-aI_E {
        display: none !important;
        min-height: 0px !important;
        max-height: 0px !important;
      }

      @media screen and (max-width: 639px) {
        .fng48xv {
          height: 400px !important;
        }

        div#wpartwrapper-nav-buttons-top {
              margin-top: -65px !important;
        }

        .nav-button-container {
            margin-top: -30px !important;
        }
      }

      @media (min-width: 360px) {
          div#wpartwrapper-nav-buttons-top {
              margin-top: -65px !important;
          }
        }

        @media (max-width: 480px) {
          div#wpartwrapper-nav-buttons-top {
              margin-top: -65px !important;
          }
        }
          
      #ca89cf71-9ce3-4c01-8f23-ccb08babf9fb.r_DTWsp_y298L:not(.f_Ho0u7_y298L):not(.f_TW2uh_y298L) {
        margin: 1px !important;
        padding: 30px !important;
      }
      
      .w_Vszg2_Wr9CO .p_x3vTs_Wr9CO,
      .w_Vszg2_Wr9CO .s_AbEpD_Wr9CO {
        color: #383637 !important;
      }
    `;

        // Add the CSS to the style element
        style.appendChild(document.createTextNode(css));

        // Append the style element to the document head
        document.head.appendChild(style);

        Log.info(LOG_SOURCE, `Custom CSS injected for class: ${cssClass} with margin-top: ${marginTop}`);
    }
}
