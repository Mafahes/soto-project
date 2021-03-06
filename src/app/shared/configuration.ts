export enum ApiTypes {
  TEST = 'https://soto.3dcafe.ru/',
  PROD = 'https://soto.3dcafe.ru/'
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
  public static brigadeStatus = [
    { label: 'Не работает', value: 0 },
    { label: 'В работе', value: 1 },
    { label: 'Не на смене', value: 2 },
    { label: 'Пересменка', value: 3 },
  ];
  public static orderStatus = ['Новая', 'Не подтверждена', 'Принята', 'Прибыл на место', 'Следует в морг', 'Сдал в морг', 'Отклонена'];
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
    { path: 'dispatcher/brigade', title: 'Бригады', icon: 'list_alt', line: false, access: ['Администратор', 'Диспетчер'] },
    { path: 'dispatcher/carts', title: 'Карточки', icon: 'list_alt', line: false, access: ['Администратор', 'Диспетчер', 'Менеджер'] },
    // { path: 'dispatcher/stat', title: 'Статистика', icon: 'list_alt', line: false, access: [] },
    // { path: 'admin/users', title: 'Пользователи', icon: 'list_alt', line: false, access: [] },
    { path: 'admin/vehicle', title: 'Автомобили', icon: 'list_alt', line: false, access: ['Администратор', 'Диспетчер', 'Менеджер'] },

  ];
}
