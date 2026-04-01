define("a7e9f8d6-c5b4-4a3d-9e2f-1b0c8d7e6f5a_0.0.1", ["CustomCssApplicationCustomizerStrings","@microsoft/sp-application-base","@microsoft/sp-core-library","@microsoft/decorators"], function(__WEBPACK_EXTERNAL_MODULE__lrd__, __WEBPACK_EXTERNAL_MODULE_GPet__, __WEBPACK_EXTERNAL_MODULE_UWqr__, __WEBPACK_EXTERNAL_MODULE_wxtz__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "jG7A");
/******/ })
/************************************************************************/
/******/ ({

/***/ "+lrd":
/*!********************************************************!*\
  !*** external "CustomCssApplicationCustomizerStrings" ***!
  \********************************************************/
/*! no static exports found */
/*! exports used: Title */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__lrd__;

/***/ }),

/***/ "GPet":
/*!*************************************************!*\
  !*** external "@microsoft/sp-application-base" ***!
  \*************************************************/
/*! no static exports found */
/*! exports used: BaseApplicationCustomizer */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_GPet__;

/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/*! exports used: Log */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "jG7A":
/*!********************************************************************!*\
  !*** ./lib/extensions/customCss/CustomCssApplicationCustomizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomCssApplicationCustomizer; });
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/decorators */ "wxtz");
/* harmony import */ var _microsoft_decorators__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_decorators__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_application_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-application-base */ "GPet");
/* harmony import */ var _microsoft_sp_application_base__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_application_base__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var CustomCssApplicationCustomizerStrings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! CustomCssApplicationCustomizerStrings */ "+lrd");
/* harmony import */ var CustomCssApplicationCustomizerStrings__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(CustomCssApplicationCustomizerStrings__WEBPACK_IMPORTED_MODULE_3__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const LOG_SOURCE = 'CustomCssApplicationCustomizer';
class CustomCssApplicationCustomizer extends _microsoft_sp_application_base__WEBPACK_IMPORTED_MODULE_2__["BaseApplicationCustomizer"] {
    onInit() {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Log"].info(LOG_SOURCE, `Initialized ${CustomCssApplicationCustomizerStrings__WEBPACK_IMPORTED_MODULE_3__["Title"]}`);
        // Get properties from configuration
        const cssClass = this.properties.cssClass || 'w_k_FZA_-aI_E';
        const marginTop = this.properties.marginTop || '0px';
        // Inject custom CSS
        this.injectCustomCSS(cssClass, marginTop);
        // Get username from SPFx context
        const username = this.context.pageContext.user.displayName;
        // Update topic header with username
        const updateHeader = () => {
            const headerSpan = document.querySelector('span[data-automation-id="topicHeaderText"]');
            if (headerSpan) {
                headerSpan.textContent = `Welcome ${username} to the Spotlight`;
                headerSpan.setAttribute('title', `Welcome ${username} to the Spotlight`);
            }
            else {
                setTimeout(updateHeader, 1000);
            }
        };
        updateHeader();
        // Allow topicHeaderText to wrap to two lines on mobile via JS
        const handleMobileResize = () => {
            const el = document.querySelector('.t_HFlKV_Wr9CO.f_WIRdV_Wr9CO');
            if (el) {
                if (window.innerWidth <= 640) {
                    el.style.setProperty('white-space', 'normal', 'important');
                    el.style.setProperty('overflow-wrap', 'break-word', 'important');
                    el.style.removeProperty('max-width');
                }
                else {
                    el.style.setProperty('min-width', '431px', 'important');
                    el.style.setProperty('white-space', 'nowrap', 'important');
                    el.style.removeProperty('overflow-wrap');
                    el.style.removeProperty('max-width');
                }
            }
            else {
                setTimeout(handleMobileResize, 1000);
            }
        };
        handleMobileResize();
        window.addEventListener('resize', handleMobileResize);
        // Force hide all webPartHeader divs via JS
        const hideWebPartHeaders = () => {
            const headers = document.querySelectorAll('div.w_ciTNc_-aI_E[data-automation-id="webPartHeader"]');
            headers.forEach((header) => {
                header.style.setProperty('display', 'none', 'important');
                header.style.setProperty('min-height', '0px', 'important');
                header.style.setProperty('max-height', '0px', 'important');
            });
            if (headers.length === 0) {
                setTimeout(hideWebPartHeaders, 1000);
            }
        };
        hideWebPartHeaders();
        return Promise.resolve();
    }
    injectCustomCSS(cssClass, marginTop) {
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

      @media screen and (min-width: 640px) {
        .fng48xv {
          height: 400px !important;
        }
      }
          
      #ca89cf71-9ce3-4c01-8f23-ccb08babf9fb.r_DTWsp_y298L:not(.f_Ho0u7_y298L):not(.f_TW2uh_y298L) {
        margin: 1px !important;
        padding: 8px !important;
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
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Log"].info(LOG_SOURCE, `Custom CSS injected for class: ${cssClass} with margin-top: ${marginTop}`);
    }
}
__decorate([
    _microsoft_decorators__WEBPACK_IMPORTED_MODULE_0__["override"]
], CustomCssApplicationCustomizer.prototype, "onInit", null);


/***/ }),

/***/ "wxtz":
/*!****************************************!*\
  !*** external "@microsoft/decorators" ***!
  \****************************************/
/*! no static exports found */
/*! exports used: override */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_wxtz__;

/***/ })

/******/ })});;
//# sourceMappingURL=custom-css-application-customizer.js.map