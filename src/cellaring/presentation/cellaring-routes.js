const cellarList = () => import('./views/cellar-list.vue');
const cellarForm = () => import('./views/cellar-form.vue');
const storageList = () => import('./views/storage-list.vue');
const storageForm = () => import('./views/storage-form.vue');

const cellaringRoutes = [
    {path: '/cellars', name: 'cellars-list', component: cellarList, meta: {title: 'Cellars' }},
    {path: '/cellars/new', name: 'new-cellar', component: cellarForm, meta: {title: 'New cellar'}},
    {path: '/cellars/:id/edit', name: 'edit-cellar', component: cellarForm, meta: {title: 'Edit cellar'}},

    {path: '/storage/items', name: 'storage-list', component: storageList, meta: {title: 'Storages' }},
    {path: '/storage/items/new', name: 'new-storage-item', component: storageForm, meta: {title: 'New Storage Item'}},
    {path: '/storage/items/:id/edit', name: 'edit-storage-item', component: storageForm, meta: {title: 'Edit Storage Item'}},
];

export default cellaringRoutes;