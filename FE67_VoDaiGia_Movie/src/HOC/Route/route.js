import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = (props) => {
  const { path, component: RouteComp, exact,redirectPath } = props;
  return (
    <div>
      <Route
        path={path}
        exact={exact}
        render={(routeProps) => {
          if (!localStorage.getItem("accountToken")) {
            return <Redirect to={redirectPath} />;
          }
          return <RouteComp {...routeProps} />;
        }}
      ></Route>
    </div>
  );
};

export const AuthRoute = (props) => {
  const { path, component: RouteComp, exact,redirectPath } = props;
  return (
    <div>
      <Route
        path={path}
        exact={exact}
        render={(routeProps) => {
          if (localStorage.getItem("accountToken")) {
            return <Redirect to={redirectPath}/>;
          }
          return <RouteComp {...routeProps} />;
        }}
      ></Route>
    </div>
  );
};

// export const createRoute = (condition) => {
//   return (props) => {
//     const { path, component: RouteComp, exact, redirectPath } = props;
//     return (
//       <div>
//         <Route
//           path={path}
//           exact={exact}
//           render={(routeProps) => {
//             if (condition) {
//               return <RouteComp {...routeProps} />;
//             }
//             return <Redirect to={redirectPath} />;
//           }}
//         ></Route>
//       </div>
//     );
//   };
// };

// // guard round sigin and signup
// export const AuthRoute = createRoute(() => !localStorage.getItem("accountToken"));

// // guard round home and profile
// export const PrivateRoute=createRoute(()=> localStorage.getItem("accountToken"));