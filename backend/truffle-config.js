module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 7545,
        network_id: "*" // Connect to any network
      }
    },
    compilers: {
      solc: {
        version: "0.8.20" // Use Solidity 0.8.20
      }
    }
  };
  