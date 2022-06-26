const { User } = require("./user.model");
const bcrypt = require('bcrypt')

const UserResourceOptions = {
    resource: User,
    options: {
        properties: {
          encryptedPassword: {
            isVisible: true,
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if(request.payload.password) {
                request.payload = {
                  ...request.payload,
                  encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                  password: undefined,
                }
              }
              return request
            },
          }
        }
    }
}

module.exports = {
    UserResourceOptions
}