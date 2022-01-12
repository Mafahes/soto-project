export enum ApiTypes {
  TEST = 'https://electronicqueue.3dcafe.ru/',
  PROD = 'https://electronicqueue.3dcafe.ru/'
}
export class Api {
  public static API_LINK = ApiTypes.TEST;
}
export class MainRoutes {
  public static routes = [
    { label: '', path: 'list', adminPage: false },
    { label: '', path: 'login', adminPage: true },
    { label: '', path: 'list', adminPage: false },
    { label: '', path: 'list', adminPage: false }
  ];
}
export class Status {
  public static statuses = [
    { label: 'В работе', value: 'on_work' },
    { label: 'Обработан', value: 'processed' },
    { label: 'Ожидает обработку', value: 'deprecated' },
    { label: 'Отмененный', value: 'canceled' },
    { label: 'На редактировании', value: 'on_edit'},
    { label: 'Завершен', value: 'published'}
  ];
  public static transportStatuses = [
    { label: 'Ожидает обработку', value: 'on_processing' },
    { label: 'В работе', value: 'on_work' },
    { label: 'На согласовании', value: 'on_approve' },
    { label: 'Согласовано', value: 'approved' },
    { label: 'Завершенный', value: 'finished' },
    { label: 'Отмененный', value: 'canceled' },
    { label: 'В работе', value: 'on_work_porters_ready' },
    { label: 'В работе у грузчиков', value: 'on_work_porters' },
  ];
}
export class Roles {
  public static roleList = [
    { label: 'Диспетчер склада', value: 'dispatcher' },
    { label: 'Поставщик товаров', value: 'provider' },
    { label: 'Поставщик услуг грузчиков', value: 'porterprovider' },
    { label: 'Агент', value: 'agent' },
    { label: 'Администратор', value: 'admin' },
    { label: 'Пользователь', value: 'user'},
    { label: 'Диспетчер транспорта', value: 'transport'},
    { label: 'Менеджер', value: 'manager'}
  ];
}
export class Routes {
  public static routeList = [
    { path: 'admin/postpone', title: 'Причины отложения', icon: 'list_alt', line: false, access: [] },
    { path: 'admin/over', title: 'Причины завершения', icon: 'list_alt', line: false, access: [] },
    // { path: 'admin/redirect', title: 'Причины перенаправления', icon: 'list_alt', line: false, access: [] },
    { path: 'admin/rooms', title: 'Залы', icon: 'list_alt', line: false, access: [] },
    { path: 'admin/users', title: 'Пользователи', icon: 'list_alt', line: false, access: [] },
    { path: 'admin/sounds', title: 'Озвучка', icon: 'list_alt', line: false, access: [] },
    { path: 'admin/stats', title: 'Статистика', icon: 'list_alt', line: false, access: [] }
  ];
}
