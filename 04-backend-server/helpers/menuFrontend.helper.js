const getMenuFrontend = (role = 'USER_ROLE') => {
  const menu = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      subMenu: [
        {
          title: 'Main',
          url: '',
        },
        {
          title: 'Progress Bar',
          url: 'progress',
        },
        {
          title: 'Graphs',
          url: 'graph1',
        },
        {
          title: 'Promises',
          url: 'promises',
        },
        {
          title: 'rxjs',
          url: 'rxjs',
        },
      ],
    },
    {
      title: 'Maintenance',
      icon: 'mdi mdi-folder-lock-open',
      subMenu: [
        {
          title: 'Hospitals',
          url: 'hospitals',
        },
        {
          title: 'Doctors',
          url: 'doctors',
        },
      ],
    },
  ];

  // Add users menu if the current user is admin
  if (role == 'ADMIN_ROLE') {
    menu[1].subMenu.unshift({
      title: 'Users',
      url: 'users',
    });
  }

  return menu;
};

module.exports = {
  getMenuFrontend
}
