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

  private static readonly STYLE_ELEMENT_ID = 'custom-css-application-customizer-styles';
  private static readonly MAX_RETRIES = 15;
  // How many extra cycles to keep re-asserting after first finding the header
  // (guards against SharePoint re-rendering and overwriting our text)
  private static readonly ASSERT_CYCLES = 6;

  private _cssClass = 'w_k_FZA_-aI_E';
  private _marginTop = '0px';
  private _username = '';
  private _headerObserver: MutationObserver | null = null;

  private readonly _onNavigated = (): void => { this._applyAll(); };
  private readonly _onResize = (): void => { this._applyMobileResize(); };
  private readonly _onPopState = (): void => { this._applyAll(); };

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    console.log(LOG_SOURCE, `CustomCss Customizer v${PACKAGE_VERSION} loaded`);

    this._cssClass = this.properties.cssClass || 'w_k_FZA_-aI_E';
    this._marginTop = this.properties.marginTop || '0px';
    this._username = this.context.pageContext.user.displayName;

    // Re-run all DOM work after every navigation path:
    //   navigatedEvent  → SPFx SPA navigation (internal links)
    //   popstate        → browser Back / Forward buttons
    this.context.application.navigatedEvent.add(this, this._onNavigated);
    window.addEventListener('popstate', this._onPopState);
    window.addEventListener('resize', this._onResize);

    this._applyAll();

    return Promise.resolve();
  }

  @override
  protected onDispose(): void {
    this.context.application.navigatedEvent.remove(this, this._onNavigated);
    window.removeEventListener('popstate', this._onPopState);
    window.removeEventListener('resize', this._onResize);
    if (this._headerObserver) {
      this._headerObserver.disconnect();
      this._headerObserver = null;
    }
  }

  private _applyAll(): void {
    this._injectCSS();
    this._updateHeader();
    this._applyMobileResize();
    this._hideWebPartHeaders();
    this._addVersionToFooter();
    this._truncateEmails();
  }

  private _updateHeader(attempt = 0): void {
    const headerSpan = document.querySelector<HTMLSpanElement>('span[data-automation-id="topicHeaderText"]');
    const expected = `Welcome ${this._username}`;

    if (headerSpan) {
      headerSpan.textContent = expected;
      headerSpan.setAttribute('title', expected);

      // Keep asserting for ASSERT_CYCLES more rounds — SharePoint's own async render
      // often runs after this and overwrites our text, so we fight back.
      if (attempt < CustomCssApplicationCustomizer.ASSERT_CYCLES) {
        setTimeout(() => this._updateHeader(attempt + 1), 400);
      } else {
        // After stabilising, watch the span with a MutationObserver so any
        // future SharePoint re-render gets corrected immediately.
        this._watchHeader(headerSpan, expected);
      }
      return;
    }

    if (attempt < CustomCssApplicationCustomizer.MAX_RETRIES) {
      setTimeout(() => this._updateHeader(attempt + 1), 500);
    }
  }

  private _watchHeader(span: HTMLSpanElement, expected: string): void {
    if (this._headerObserver) this._headerObserver.disconnect();
    this._headerObserver = new MutationObserver(() => {
      if (span.isConnected && span.textContent !== expected) {
        span.textContent = expected;
        span.setAttribute('title', expected);
      } else if (!span.isConnected) {
        // Span was removed from DOM (full re-render); restart the update loop.
        if (this._headerObserver) { this._headerObserver.disconnect(); this._headerObserver = null; }
        setTimeout(() => this._updateHeader(0), 300);
      }
    });
    this._headerObserver.observe(span, { childList: true, characterData: true, subtree: true });
  }

  private _applyMobileResize(attempt = 0): void {
    const el = document.querySelector<HTMLElement>('.t_HFlKV_Wr9CO.f_WIRdV_Wr9CO');
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
      return;
    }
    if (attempt < CustomCssApplicationCustomizer.MAX_RETRIES) {
      setTimeout(() => this._applyMobileResize(attempt + 1), 500);
    }
  }

  private _hideWebPartHeaders(attempt = 0): void {
    const headers = document.querySelectorAll<HTMLElement>('div.w_ciTNc_-aI_E[data-automation-id="webPartHeader"]');
    headers.forEach((header) => {
      header.style.setProperty('display', 'none', 'important');
      header.style.setProperty('min-height', '0px', 'important');
      header.style.setProperty('max-height', '0px', 'important');
    });
    if (headers.length === 0 && attempt < CustomCssApplicationCustomizer.MAX_RETRIES) {
      setTimeout(() => this._hideWebPartHeaders(attempt + 1), 500);
    }
  }

  private _addVersionToFooter(attempt = 0): void {
    const footerContainer = document.querySelector<HTMLElement>('[data-automationid="SimpleFooter"]');
    if (footerContainer) {
      if (!footerContainer.querySelector('.footer-version-display')) {
        const versionDiv = document.createElement('div');
        versionDiv.className = 'footer-version-display';
        versionDiv.textContent = `v${PACKAGE_VERSION}`;
        versionDiv.setAttribute('title', `Version ${PACKAGE_VERSION}`);
        versionDiv.style.cssText = 'display: flex; align-items: center; font-size: 12px; color: #666; margin-right: auto;';
        footerContainer.insertBefore(versionDiv, footerContainer.firstChild);
      }
      return;
    }
    if (attempt < CustomCssApplicationCustomizer.MAX_RETRIES) {
      setTimeout(() => this._addVersionToFooter(attempt + 1), 500);
    }
  }

  private _truncateEmails(attempt = 0): void {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailNodes = Array.from(document.querySelectorAll<HTMLElement>('div, span'))
      .filter((element) => {
        const text = element.textContent?.trim();
        return !!text
          && element.children.length === 0
          && emailPattern.test(text);
      });

    emailNodes.forEach((element) => {
      const originalText = (element.dataset.originalEmail || element.textContent || '').trim();
      if (!originalText) {
        return;
      }

      if (!element.dataset.originalEmail) {
        element.dataset.originalEmail = originalText;
      }

      this._applyEmailWidthStyles(element);
      element.setAttribute('title', originalText);

      if (element.childNodes.length === 1 && element.firstChild?.nodeType === Node.TEXT_NODE) {
        element.firstChild.nodeValue = originalText.slice(0, 23);
      }
    });

    if (emailNodes.length === 0 && attempt < CustomCssApplicationCustomizer.MAX_RETRIES) {
      setTimeout(() => this._truncateEmails(attempt + 1), 500);
    }
  }

  private _applyEmailWidthStyles(element: HTMLElement): void {
    element.style.setProperty('display', 'inline-block', 'important');
    element.style.setProperty('width', '23ch', 'important');
    element.style.setProperty('min-width', '23ch', 'important');
    element.style.setProperty('max-width', '23ch', 'important');
    element.style.setProperty('overflow', 'hidden', 'important');
    element.style.setProperty('text-overflow', 'clip', 'important');
    element.style.setProperty('white-space', 'pre', 'important');
  }

  private _injectCSS(): void {
    let style = document.getElementById(CustomCssApplicationCustomizer.STYLE_ELEMENT_ID) as HTMLStyleElement | null;
    if (!style) {
      style = document.createElement('style');
      style.id = CustomCssApplicationCustomizer.STYLE_ELEMENT_ID;
      style.type = 'text/css';
      document.head.appendChild(style);
    }

    const cssClass = this._cssClass;
    const marginTop = this._marginTop;

    const css = `
      .${cssClass} {
      }
      
      #vpc_WebPart\\.ListWebPart\\.internal\\.933a17ef-f812-492e-8cfa-174245b5640c div.w_ciTNc_-aI_E {
        max-height: 0px !important;
        display: none !important;
        overflow: hidden !important;
      }
      .c_0RSS5_Wr9CO {
  background-image: url("https://i.ibb.co/RkWVVQkF/bg.png"); /* your image path */
  background-size: cover;       /* makes it responsive */
  background-position: center;  /* keeps it centered */
  background-repeat: no-repeat;
  min-height: 250px;            /* important: gives it height */
  display: flex;
  justify-content: center; /* horizontal center */
  align-items: center;     /* vertical center */
  text-align: center;
  color: white;
}
      .w_1r9JN_YBjGt .h_rPihh_YBjGt {
        height: 0px !important;
      }
       .gallery_31dc9717 {
    text-align: center !important;
  }     

  .lineHeight1_4
  {
  color:white !important;
      font-size: 40px !important;

  
  }
 .gallery_31dc9717 {
    text-align: center !important;
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

      .headerViewsContainer_8c6c0d3e.h_03tOC_YBjGt {
        display: none !important;
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

    style.textContent = css;

    Log.info(LOG_SOURCE, `Custom CSS injected for class: ${cssClass} with margin-top: ${marginTop}`);
  }
}
