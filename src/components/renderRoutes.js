import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const RouteWithProps = ({
  path,
  exact,
  strict,
  render,
  location,
  sensitive,
  ...rest
}) => (
  <Route
    path={path}
    exact={exact}
    strict={strict}
    location={location}
    sensitive={sensitive}
    render={(props) => render({...props, ...rest })}
  />
)

export default function renderRoutes(routes = [], extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.key || i}
              from={route.path}
              to={route.redirect}
              exact={route.exact}
              strict={route.strict}
            />
          )
        }
        return (
          <RouteWithProps
            key={route.key || i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            sensitive={route.sensitive}
            render={
              (props) => {
                const childRoutes = renderRoutes(route.routes, extraProps, {
                  location: props.location,
                });
                if (route.component) {
                  const newProps = { route, ...props, ...extraProps, }
                  let { component: Component } = route;
                  return (
                    <Component {...newProps} route={route}>
                      {childRoutes}
                    </Component>
                  );
                } else {
                  return childRoutes;
                }
              }
            }
          />
        )
      })}
      <Route component={require('@/pages/404').default} />
    </Switch>
  ) : null;
}
