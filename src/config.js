import { invertNumArray, lovelace, subscribeRenderTemplate, processTabArray } from './helpers';
import { conditionalConfig } from './conditional-config';
import { styleHeader } from './style-header';
import { kioskMode } from './kiosk-mode';

export const defaultConfig = {
  footer_mode: false,
  kiosk_mode: false,
  disabled_mode: false,
  compact_mode: false,
  mobile_mode: false,
  disable_sidebar: false,
  background: 'var(--primary-color)',
  elements_color: 'var(--text-primary-color)',
  menu_color: '',
  voice_color: '',
  options_color: '',
  all_tabs_color: '',
  tabs_color: [],
  tab_direction: 'ltr',
  button_direction: 'ltr',
  chevrons: true,
  indicator_top: false,
  hide_tabs: [],
  show_tabs: [],
  template_variables: '',
  exceptions: [],
  header_text: 'Home Assistant',
  hidden_tab_redirect: true,
  default_tab: 0,
};

export const buildConfig = refreshTemplates => {
  let config = { ...defaultConfig, ...lovelace.config.custom_header };
  config = { ...config, ...conditionalConfig(config) };
  const variables = config.template_variables;
  delete config.template_variables;

  const processAndContinue = () => {
    if (config.hide_tabs) config.hide_tabs = processTabArray(config.hide_tabs);
    if (config.show_tabs) config.show_tabs = processTabArray(config.show_tabs);
    if (config.show_tabs && config.show_tabs.length) config.hide_tabs = invertNumArray(config.show_tabs);
    if (config.mobile_mode) {
      config.tab_direction = 'rtl';
      config.button_direction = 'rtl';
      config.footer_mode = true;
      config.compact_mode = true;
    }
    if (config.kiosk_mode && !config.disabled_mode) kioskMode(false);
    else styleHeader(config);
  };

  let templatesRendered = false;
  const configString = JSON.stringify(config);
  const hasTemplates = !!variables || configString.includes('{{') || configString.includes('{%');

  if (hasTemplates) {
    subscribeRenderTemplate(
      result => {
        templatesRendered = true;
        if (!refreshTemplates && window.customHeaderLastTemplateResult == result) return;
        window.customHeaderLastTemplateResult = result;
        config = JSON.parse(
          result
            .replace(/"true"/gi, 'true')
            .replace(/"false"/gi, 'false')
            .replace(/""/, ''),
        );
        processAndContinue();
      },
      { template: JSON.stringify(variables).replace(/\\/g, '') + JSON.stringify(config).replace(/\\/g, '') },
    );
  } else {
    processAndContinue();
  }
  // Render templates every minute.
  if (!refreshTemplates && hasTemplates) {
    window.setTimeout(() => {
      buildConfig(false);
    }, (60 - new Date().getSeconds()) * 1000);
  }
  // If no config is returned from subscribeRenderTemplate for 10 secs there is likely a bad template.
  setTimeout(function() {
    if (!templatesRendered && hasTemplates) {
      console.log('Custom-Header: There was an issue with your template/s. Please, check your config.');
    }
  }, 10000);
};
