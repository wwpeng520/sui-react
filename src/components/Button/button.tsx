import React from 'react';
import type { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  className?: string;
  /** Button 的禁用 */
  disabled?: boolean;
  /** Button 的尺寸 */
  size?: ButtonSize;
  /** Button 的类型 */
  //? 原始的 button 有默认类型 type="button|submit|reset"，这里用 btnType 替换
  btnType?: ButtonType;
children: React.ReactNode;
  // a 链接 href
  href?: string;
}

//* 原始 button 属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
//* a 链接的属性
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

// 最终的属性
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

export const Button: FC<ButtonProps> = (props) => {
  const { btnType = 'default', className, disabled = false, size, children, href, ...restProps } = props;
  // btn, btn-lg, btn-primary
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    // link 类型的按钮作用于 a 链接，a 链接本身没有 disabled 属性，所以需要定义 disabled 的类名 
    disabled: btnType === 'link' && disabled,
  });
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

export default Button;
