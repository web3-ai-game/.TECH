/// <reference types="vite/client" />

import { ethers } from 'ethers';

interface Window {
  ethereum?: ethers.Eip1193Provider;
}