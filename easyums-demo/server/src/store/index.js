const SimpleMemoryStore = require("./SMS");

module.exports = {
    userStore: new SimpleMemoryStore(3600, 100),
    oauthStore: new SimpleMemoryStore(1800, 100),
    userToOauthStore: new SimpleMemoryStore(1800, 100)
};