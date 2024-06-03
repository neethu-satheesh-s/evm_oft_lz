const LZ_ENDPOINTS = require('../constants/layerzeroEndpoints.json');

const verify = async (contractAddress, args, contractName) => {
  console.log('Verifying Contract.......');
  try {
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
      contract: `contracts/${contractName}.sol:${contractName}`,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes('already verified')) {
      console.log('Already Verified');
    } else {
      console.error(e);
    }
  }
};

module.exports = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log(`>>> your address: ${deployer}`);

  console.log(`[${hre.network.name}] `);

  const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name];
  console.log(`[${hre.network.name}] Endpoint Address: ${lzEndpointAddress}`);

  const contract = await deploy('NonblockingLzApp', {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  });

  console.log('contract.address');
  console.log(contract.address);

  console.log('VERIFYING.........');
  await verify(contract.address, [], 'NonblockingLzApp');
};

module.exports.tags = ['NonblockingLzApp'];
