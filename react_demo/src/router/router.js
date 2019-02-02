import Home from "../component/home";
import Form from "../component/form";
import Todolist from "../component/todolist";
import Routerlist from "../component/routerlist";
import Axios from "../component/request";
import Request2 from "../component/request2";
import Lifecycle from "../component/lifecycle";
import Drouter from "../component/drouter";
import Rightpage from "../component/rightpage";
import Antdpage from "../component/antdpage"
import Trans from "../component/transition"
import Rd from "../component/reduxpage"
let routers = [
  { path: "/", component: Home, exact: true },
  { path: "/form", component: Form },
  { path: "/todolist", component: Todolist },
  { path: "/axios", component: Axios },
  { path: "/fetchjson", component: Request2 },
  { path: "/life", component: Lifecycle },
  { path: "/router", component: Routerlist },
  {
    path: "/drouter",
    component: Drouter,
    routes: [
      /*嵌套路由*/
      { path: "/drouter/", component: Rightpage, exact:true },
      { path: "/drouter/bb", component: Rightpage }
    ]
  },
  { path: "/antdpage", component: Antdpage },
  { path: "/trans", component: Trans },
  { path: "/rd", component: Rd }
];

export default routers;
