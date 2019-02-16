import Home from "../component/home";
import Form from "../component/form";
import Todolist from "../component/todolist";
import Routerlist from "../component/routerlist";
import Axios from "../component/request";
import Lifecycle from "../component/lifecycle";
import Drouter from "../component/drouter";
import Rightpage from "../component/rightpage";
import Antdpage from "../component/antdpage"
import Trans from "../component/transition"
import Rd from "../component/reduxpage"
import RdT from "../component/reduxpage_thunk"
import RdS from "../component/reduxpage_saga"
let routers = [
  { path: "/", component: Home, exact: true },
  { path: "/form", component: Form },
  { path: "/todolist", component: Todolist },
  { path: "/axios", component: Axios },
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
  { path: "/rd", component: Rd },
  { path: "/rdt", component: RdT },
  { path: "/rds", component: RdS }
];

export default routers;
