#!/bin/bash
if command -v ganache-cli >/dev/null 2>&1; then
  ganache-cli -p 8545 -a 10 --deterministic
else
  echo "ganache-cli not found, using hardhat node"
  npx hardhat node
fi