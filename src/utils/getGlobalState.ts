import deviceConstants from '@/constants/device';
import { Device } from '@/interfaces/device.interface';

export const getGlobalState = () => {
  const device = (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent) ? deviceConstants.MOBILE : deviceConstants.DESKTOP) as Device;
  const collapsed = device !== deviceConstants.DESKTOP;
  return {
    device,
    collapsed,
  } as const;
};