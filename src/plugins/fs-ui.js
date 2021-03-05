import Vue from 'vue'

import {
  Button,
  Icon,
  Popup,
  PopupSelect,
  Grid,
  GridItem,
  Row,
  Col,
  Input,
  Checkbox,
  CheckboxGroup,
  Switch,
  Cell,
  CellGroup,
  Search,
  NumberKeyboard,
  PasswordInput,
  Slider,
  Rate,
  Stepper,
  Loading,
  PullRefresh,
  SwipeCell,
  Collapse,
  CollapseGroup,
  Tag,
  Card,
  List,
  ListItem,
  NavBar,
  Pagination,
  Badge,
  Tab,
  Tabs,
  Tabbar,
  TabbarItem,
  Linkage,
  SelectGroup,
  Select,
  Option,
  Picker,
  PickerColumn,
  Calendar,
  Dialog,
  Notice,
  Toast,
  LazyLoad
} from 'fs-ui'

Vue.component('FsButton', Button)
Vue.component('FsIcon', Icon)
Vue.component('FsPopup', Popup)
Vue.component('FsPopupSelect', PopupSelect)
Vue.component('FsGrid', Grid)
Vue.component('FsGridItem', GridItem)
Vue.component('FsRow', Row)
Vue.component('FsCol', Col)
Vue.component('FsInput', Input)
Vue.component('FsCheckbox', Checkbox)
Vue.component('FsCheckboxGroup', CheckboxGroup)
Vue.component('FsSwitch', Switch)
Vue.component('FsCell', Cell)
Vue.component('FsCellGroup', CellGroup)
Vue.component('FsSearch', Search)
Vue.component('FsNumberKeyboard', NumberKeyboard)
Vue.component('FsPasswordInput', PasswordInput)
Vue.component('FsSlider', Slider)
Vue.component('FsRate', Rate)
Vue.component('FsStepper', Stepper)
Vue.component('FsLoading', Loading)
Vue.component('FsPullRefresh', PullRefresh)
Vue.component('FsSwipeCell', SwipeCell)
Vue.component('FsCollapse', Collapse)
Vue.component('FsLoading', Loading)
Vue.component('FsCollapseGroup', CollapseGroup)
Vue.component('FsTag', Tag)
Vue.component('FsCard', Card)
Vue.component('FsList', List)
Vue.component('FsListItem', ListItem)
Vue.component('FsNavBar', NavBar)
Vue.component('FsPagination', Pagination)
Vue.component('FsBadge', Badge)
Vue.component('FsTab', Tab)
Vue.component('FsTabs', Tabs)
Vue.component('FsTabbar', Tabbar)
Vue.component('FsTabbarItem', TabbarItem)
Vue.component('FsLinkage', Linkage)
Vue.component('FsSelectGroup', SelectGroup)
Vue.component('FsSelect', Select)
Vue.component('FsOption', Option)
Vue.component('FsPicker', Picker)
Vue.component('FsPickerColumn', PickerColumn)
Vue.component('FsCalendar', Calendar)

Vue.prototype.$notice = Notice
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog

Vue.use(LazyLoad)
