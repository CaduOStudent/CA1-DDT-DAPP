const abi = [
  "function createRecord(string cid, bytes32 contentHash) returns (uint256)",
  "function requestAccess(uint256 id)",
  "function grantAccess(uint256 id, address grantee)",
  "function revokeAccess(uint256 id, address grantee)",
  "function canAccess(uint256 id, address user) view returns (bool)"
];

let provider, signer, contract;

function log(t){ document.getElementById('log').innerText += t + '\n'; }

document.getElementById('connect').onclick = async () => {
  if (!window.ethereum) return alert('Install MetaMask');
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  const addr = document.getElementById('contractAddr').value.trim();
  if (addr) contract = new ethers.Contract(addr, abi, signer);
  log('Connected: ' + await signer.getAddress());
};

document.getElementById('create').onclick = async () => {
  if (!contract) return alert('Set contract address and connect');
  const cid = document.getElementById('cid').value || 'QmDemoCid';
  const content = document.getElementById('content').value || 'demo';
  const hash = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(content));
  const tx = await contract.createRecord(cid, hash);
  await tx.wait();
  log('createRecord tx: ' + tx.hash);
};

document.getElementById('request').onclick = async () => {
  const id = Number(document.getElementById('recordId').value || 0);
  const tx = await contract.requestAccess(id);
  await tx.wait();
  log('requestAccess tx: ' + tx.hash);
};

document.getElementById('canAccess').onclick = async () => {
  const id = Number(document.getElementById('recordId').value || 0);
  const addr = document.getElementById('addr').value || await signer.getAddress();
  const ok = await contract.canAccess(id, addr);
  log(`canAccess(${id}, ${addr}) = ${ok}`);
};