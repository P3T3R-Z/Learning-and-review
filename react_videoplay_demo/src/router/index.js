import Home from "../pages/home";
import Center from "../pages/center";
import Relationship from "../pages/relationship";
import Chat from "../pages/chat";
let routers = [
    {
        path:'/',
        component: Home,
        exact: true
    },
    {
        path:'/center',
        component: Center,
        exact: false
    },
    {
        path:'/relationship',
        component: Relationship,
        exact: false
    },
    {
        path:'/chat',
        component: Chat,
        exact: false
    }
]
export default routers;