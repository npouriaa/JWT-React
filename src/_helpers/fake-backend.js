export { fakeBackend };

const fakeBackend = () => {
  let users = [
    {
      id: 1,
      username: "test",
      password: "test",
      firstName: "Test",
      lastName: "User",
    },
  ];
  let realFetch = window.fetch;
  window.fetch = (url, opts) => {
    return new Promise((resolve, reject) => {
      // wrap in timeout to simulate server api call
      setTimeout(handleRoute, 500);

      const handleRoute = () => {
        switch (true) {
          case url.endsWith("/users/authenticate") && opts.method === "POST":
            return authenticate();
          case url.endsWith("/users") && opts.method === "GET":
            return getUsers();
          default:
            // pass through any requests not handled above
            return realFetch(url, opts)
              .then((response) => resolve(response))
              .catch((error) => reject(error));
        }
      };

      // route functions

      const authenticate = () => {
        const { username, password } = body();
        const user = users.find(
          (x) => x.username === username && x.password === password
        );

        if (!user) return error("Username or password is incorrect");

        return ok({
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          token: "fake-jwt-token",
        });
      };

      const getUsers = () => {
        if (!isAuthenticated()) return unauthorized();
        return ok(users);
      };

      // helper functions

      const ok = (body) => {
        resolve({
          ok: true,
          text: () => Promise.resolve(JSON.stringify(body)),
        });
      };

      const unauthorized = () => {
        resolve({
          status: 401,
          text: () =>
            Promise.resolve(JSON.stringify({ message: "Unauthorized" })),
        });
      };

      const error = (message) => {
        resolve({
          status: 400,
          text: () => Promise.resolve(JSON.stringify({ message })),
        });
      };

      const isAuthenticated = () => {
        return opts.headers["Authorization"] === "Bearer fake-jwt-token";
      };

      const body = () => {
        return opts.body && JSON.parse(opts.body);
      };
    });
  };
};
