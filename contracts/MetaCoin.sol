// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25;

import "./ConvertLib.sol";

// MetaCoinコントラクト
contract MetaCoin {
	// mapping変数(アドレスと残高を紐づける)
	mapping (address => uint) balances;
	// イベントの定義
	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	
	// コンストラクター 
	constructor() public {
		// コントラクト作成時に10000コインを入手する。
		balances[tx.origin] = 10000;
	}

	// コイン送金
	function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
		// 送金額が残高以上でないことを確認する。
		if (balances[msg.sender] < amount) return false;
		// 送金者の残高を減らす
		balances[msg.sender] -= amount;
		// 受け取り手の残高を増やす
		balances[receiver] += amount;
		// イベントを発行する。
		emit Transfer(msg.sender, receiver, amount);
		return true;
	}

	// 残高を取得する関数
	function getBalanceInEth(address addr) public view returns(uint){
		return ConvertLib.convert(getBalance(addr),2);
	}

	// 残高を取得する関数
	function getBalance(address addr) public view returns(uint) {
		return balances[addr];
	}
}
