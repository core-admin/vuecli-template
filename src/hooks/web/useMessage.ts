import { MessagePlugin as Message, DialogPlugin as Dialog, DialogAlertMethod } from 'tj-design-vue';
import { merge } from 'lodash-es';

export type DialogHookOptions = Exclude<FunctionParamsFirst<DialogAlertMethod>, undefined>;

export const defalutDialogAlertOptions: DialogHookOptions = {
  closeBtn: false,
  closeOnEscKeydown: false,
  closeOnOverlayClick: false,
  confirmOnEnter: true,
  width: '350px',
  confirmBtn: {
    content: '确认',
    theme: 'primary',
    variant: 'base',
  },
};

export function createInfoAlertModal(options: DialogHookOptions = {}) {
  return Dialog.alert(merge({}, defalutDialogAlertOptions, { theme: 'info' }, options));
}

export function createSuccessAlertModal(options: DialogHookOptions = {}) {
  return Dialog.alert(merge({}, defalutDialogAlertOptions, { theme: 'success' }, options));
}

export function createWarningAlertModal(options: DialogHookOptions = {}) {
  return Dialog.alert(merge({}, defalutDialogAlertOptions, { theme: 'warning' }, options));
}

export function createErrorAlertModal(options: DialogHookOptions = {}) {
  return Dialog.alert(merge({}, defalutDialogAlertOptions, { theme: 'danger' }, options));
}

export { Message, Dialog };
