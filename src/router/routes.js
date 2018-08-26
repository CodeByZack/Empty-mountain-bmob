import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import article from '../components/nav1/article.vue'
import articlePicture from '../components/nav1/articlePicture.vue'
import voice from '../components/nav2/voice.vue'
import VueRouter from 'vue-router'

let routes = [
	{
		path: '/',
	    name: 'login',
	    component: Login,
	    hidden: true
	},
	{
		path: '/home',
	    component: Home,
	    name: '文章管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/article', component: article, name: '文章列表' },
            { path: '/articlePicture', component: articlePicture, name: '文章新增/编辑' }
        ]
	},
    {
        path: '/home',
        component: Home,
        name: '音乐管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/voice', component: voice, name: '声音' }
        ]
    }
];

export default new VueRouter({
    routes
});