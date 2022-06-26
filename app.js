// require libraries
const express = require('express');
const mongoose = require('mongoose');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const bcrypt = require('bcrypt')

const { UserResourceOptions } = require("./resources/user.options");

AdminJS.registerAdapter(AdminJSMongoose);

// app config
const config = require("./config");

// init adminJS
const adminJS = new AdminJS({
    databases: [],
    rootPath: '/',
    loginPath: '/login',
    resources: [UserResourceOptions],
});

const adminJSRouter = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
    authenticate: async (email, password) => {
        const user = await UserResourceOptions.resource.findOne({ email });
        if (user) {
            console.log(user)
            const matched = await bcrypt.compare(password, user.encryptedPassword)
            if (matched) {
              return user;
            }
        }
        return false;
    },
    cookiePassword: config.COOKIE_PASSWORD
});

// mount adminJS route and run express app
const app = express();
app.use(adminJS.options.rootPath, adminJSRouter);

mongoose.connect(`${config.CONNECTION_STRING}/${config.DBNAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.listen(8080, () => console.log('AdminJS is under localhost:8080/admin'));