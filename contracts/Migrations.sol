// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25;

contract Migrations {
  // 変数を用意
  address public owner;
  uint public last_completed_migration;

  // コントラクト所有者かどうかを確認する修飾子
  modifier restricted() {
    if (msg.sender == owner) _;
  }

  // コンストラクター
  constructor() public {
    owner = msg.sender;
  }

  // 完了にする関数
  function setCompleted(uint completed) public restricted {
    last_completed_migration = completed;
  }
}
