'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class HOCManager {
  // Gets the display name of a JSX component for dev tools
  static getComponentDisplayName(Component) {
    return Component.displayName || Component.name || 'Unknown';
  }

  static create(getComponent) {
    return function (...configs) {
      if ('function' === typeof configs[0]) {
        const ComposedComponent = configs[0];
        return getComponent(ComposedComponent, {});
      }

      configs.forEach((config, index) => {
        if ('object' !== typeof config) {
          configs[index] = { default: config };
        }
      });

      const opts = Object.assign({}, ...configs);

      return ComposedComponent => getComponent(ComposedComponent, opts, configs);
    };
  }
}

exports.default = HOCManager;