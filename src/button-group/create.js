import React, { Component, PropTypes, Children, cloneElement, isValidElement } from 'react';
import cx from 'classnames';

import {
  COMPONENT_SIZES,
  COMPONENT_COLORS,
  SCREEN_SIZE_SMALL,
  SCREEN_SIZE_MEDIUM,
} from '../util/constants';

const STACK_SCREEN_SIZES = [SCREEN_SIZE_SMALL, SCREEN_SIZE_MEDIUM];

export default function create(styles) {
  class ButtonGroup extends Component {
    static propTypes = {
      children: PropTypes.node,
      className: PropTypes.string,
      color: PropTypes.oneOf(COMPONENT_COLORS),
      expanded: PropTypes.bool,
      size: PropTypes.oneOf(COMPONENT_SIZES),
      stack: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(STACK_SCREEN_SIZES)]),
    };

    render() {
      const { children, className, color, expanded, size, stack } = this.props;
      const classNames = cx(
        className,
        styles['button-group'],
        {
          [styles[color]]: COMPONENT_COLORS.includes(color),
          [styles.expanded]: expanded,
          [styles[size]]: COMPONENT_SIZES.includes(size),
          [styles.stacked]: stack && !STACK_SCREEN_SIZES.includes(stack),
          [styles[`stacked-for-${stack}`]]: STACK_SCREEN_SIZES.includes(stack),
        }
      );
      const newChildren = Children.map(
        children,
        (child) => {
          if (isValidElement(child)) {
            return cloneElement(
              child,
              {
                className: cx(child.props.className, styles.button),
              }
            );
          }

          return child;
        }
      );

      return (
        <div {...this.props} className={classNames}>
          {newChildren}
        </div>
      );
    }
  }

  return { ButtonGroup };
}