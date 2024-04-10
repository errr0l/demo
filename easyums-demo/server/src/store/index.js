const SimpleMemoryStore = require("./SMS");

module.exports = {
    userStore: new SimpleMemoryStore(3600, 100),
    oauthStore: new SimpleMemoryStore(600, 100)
};