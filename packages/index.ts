import { VueConstructor } from 'vue/types/umd';
import Exposure from './Exposure';
import Badge from './Badge';
import H5Video from './H5Video';
import H5Audio from './H5Audio';
import Toast from './Toast';
import List from './List';
import Overlay from './Overlay';
import Popup from './Popup';
import Dialog from './Dialog';
import Loading from './Loading';
import Radio from './Radio';
import RadioGroup from './RadioGroup';
import Checkbox from './Checkbox';
import CheckboxGroup from './CheckboxGroup';
import Switch from './Switch';
import PullRefresh from './PullRefresh';
import ToolTip from './ToolTip';
import PageStatus from './PageStatus';
import Marqueen from './Marqueen';
import Search from './Search';
import SearchPage from './SearchPage';
import Stepper from './Stepper';
import PickerWheel from './PickerWheel';
import Results from './Results';
import registerThemeMode from './theme';
import directives from './directives/index';
import filters from './filters/index';
import Footer from './Footer/index';
import Button from './Button';
import Collapse from './Collapse';
import Input from './Input';
import Grid from './Grid';
import Tabs from './Tabs';
import TabPanel from './TabPanel';
import DropdownMenu from './DropdownMenu';
import DropdownItem from './DropdownItem';
import DropdownItemPart from './DropdownItemPart';
import DatePicker from './DatePicker';
import PickerList from './PickerList';
import Cards from './Cards';
import CardsItem from './CardsItem';
import Counter from './Counter';
import SnackBar from './SnackBar';
import Calendar from './Calendar';
import Agreement from './Agreement';
import Icon from './Icon';
import DemoBlock from './DemoBlock';
import Cell from './Cell';
import CellGroup from './CellGroup';
import Sticky from './Sticky';
import BottomSheet from './BottomSheet';
import TabsSegment from './TabsSegment';
import TabsSegementPanel from './TabsSegmentPanel';
import NoticeBar from './NoticeBar';
import CalendarTab from './CalendarTab';
import Clamp from './Clamp';

import { underscore2Camel } from './utils/base';

const { isDev } = require('../env.ts');

const pkg = require('../package.json');

interface CompType {
  install: (Vue: VueConstructor) => void;
  [propsName: string]: any;
}

type ThemeType = 'dark' | 'white' | 'black' | 'white' | 'auto';

interface OptionsType {
  themeMode?: ThemeType;
  exclude?: string[];
  componentsConfig?: object;
  projectName?: string;
}

const components: CompType[] = [
  Exposure,
  Badge,
  H5Video,
  H5Audio,
  Toast,
  List,
  Overlay,
  Popup,
  Dialog,
  Loading,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Switch,
  PullRefresh,
  ToolTip,
  PageStatus,
  Marqueen,
  Search,
  SearchPage,
  Stepper,
  PickerWheel,
  Results,
  Footer,
  Button,
  Input,
  Grid,
  Tabs,
  TabPanel,
  Collapse,
  DropdownMenu,
  DropdownItem,
  DropdownItemPart,
  DatePicker,
  PickerList,
  Cards,
  CardsItem,
  Counter,
  SnackBar,
  Calendar,
  Agreement,
  Icon,
  DemoBlock,
  Cell,
  CellGroup,
  Sticky,
  BottomSheet,
  TabsSegment,
  TabsSegementPanel,
  NoticeBar,
  CalendarTab,
  Clamp,
];

const logFn = (window as any)._thsclog;
let sendStat = function (projectName?: string, componentName?: string) {};
if (logFn) {
  logFn.prototype.onceStat = [];
  sendStat = function (projectName?: string, componentName?: string) {
    const statInfo = {
      name: 'thsc-m-hxmui',
      ver: projectName,
    };
    if (componentName) {
      if (logFn.prototype.onceStat.indexOf(componentName) > -1) {
        return;
      }
      logFn.prototype.onceStat.push(componentName);
      statInfo.name = `thsc-m-hxmui_${componentName}`;
    }
    logFn(statInfo);
  };
} else {
  console.error('未检测到埋点库，请引入stat.js');
}

let Vue: VueConstructor;
const install = (_Vue: VueConstructor, options: OptionsType = {}): void => {
  let projectName = options.projectName ? underscore2Camel(options.projectName) : '';
  const themeMode = options.themeMode || '';
  if (Vue) {
    return;
  }
  Vue = _Vue;
  if (themeMode) {
    registerThemeMode(Vue, themeMode);
  }
  if (!projectName) {
    projectName = 'unKnown';
    if (isDev) {
      console.error(
        '[Hxmui] 请在Vue.use中传入projectName参数! 详细信息见: http://infra.myhexin.com/infra/docs/hxmui-doc/guide/install.html#cdn',
      );
    }
  }
  // 默认会发送一个总的埋点
  sendStat(projectName);
  const { componentsConfig = {} } = options;
  components.forEach((component: any) => {
    const componentName = (component.options && component.options.name) || component.name;
    // vue2组件常规写法,组件的mounted类型为[object Function]
    if (typeof component === 'object') {
      if (component.mounted) {
        component.mounted = [component.mounted, () => sendStat(projectName, componentName)];
      } else {
        component.mounted = [() => sendStat(projectName, componentName)];
      }
    } else {
      // vue2组件中构造函数的写法,组件的mounted类型为[object Array]
      const cmpoptions: any = component.prototype.constructor.options;
      if (cmpoptions.mounted) {
        cmpoptions.mounted = [...cmpoptions.mounted, () => sendStat(projectName, componentName)];
      } else {
        cmpoptions.mounted = [() => sendStat(projectName, componentName)];
      }
    }
    if (!options.exclude || options.exclude.includes(componentName)) {
      Vue.use(component, componentsConfig[componentName]);
    }
  });
};

export default {
  install,
  directives,
  filters,
  components,
  version: pkg.version,
};
